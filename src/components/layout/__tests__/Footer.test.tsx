import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';
import { useResponsive } from '../../../hooks/useResponsive';
import { useTouchDevice } from '../../../hooks/useTouchDevice';
import React from 'react';

// Mock hooks
vi.mock('../../../hooks/useResponsive', () => ({
  useResponsive: vi.fn(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    screenWidth: 1024,
    screenHeight: 768,
  })),
}));

vi.mock('../../../hooks/useTouchDevice', () => ({
  useTouchDevice: vi.fn(() => ({
    isTouchDevice: false,
    hasHover: true,
    supportsTouch: false,
    maxTouchPoints: 0,
  })),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer', () => {
  const currentYear = new Date().getFullYear();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders footer with correct structure', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('id', 'footer');
  });

  it('renders logo and company name link', () => {
    renderWithRouter(<Footer />);
    const logoLink = screen.getByLabelText('ACM Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByAltText('ACM Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders company description', () => {
    renderWithRouter(<Footer />);
    const description = screen.getByText(
      /shape the future of low-bandwidth esports infrastructure/i
    );
    expect(description).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderWithRouter(<Footer />);
    const email = screen.getByText('info@acmhackathon.com');
    expect(email).toBeInTheDocument();
    expect(email.closest('a')).toHaveAttribute(
      'href',
      'mailto:info@acmhackathon.com'
    );

    const phone = screen.getByText('+234 9167667376');
    expect(phone).toBeInTheDocument();
    expect(phone.closest('a')).toHaveAttribute('href', 'tel:+234 9167667376');

    const address = screen.getByText(/Mulungushi International Conference Center/i);
    expect(address).toBeInTheDocument();
  });

  it('renders navigation section links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();

    const expectedMainLinks = [
      { text: 'About', href: '/about' },
      { text: 'Challenges', href: '/challenges' },
      { text: 'Registration', href: '/registration' },
      { text: 'Schedule', href: '/schedule' },
      { text: 'Contact', href: '/contact' },
    ];

    expectedMainLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', href);
    });
  });

  it('renders support and legal section links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Support & Legal')).toBeInTheDocument();

    const expectedSupportLinks = [
      { text: 'Partnership', href: '/partner-registration' },
      { text: 'Terms and Conditions', href: '/terms-and-conditions' },
      { text: 'Terms of Use', href: '/terms-of-use' },
      { text: 'Privacy Policy', href: '/privacy-policy' },
    ];

    expectedSupportLinks.forEach(({ text, href }) => {
      const links = screen.getAllByText(text);
      expect(links.length).toBeGreaterThan(0);
      const anchor = links[0]!.closest('a');
      expect(anchor).not.toBeNull();
      expect(anchor!).toHaveAttribute('href', href);
    });
  });

  it('renders newsletter signup section', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();

    const textElements = screen.getAllByText(/subscribe to receive updates/i);
    expect(textElements.length).toBeGreaterThan(0);

    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute(
      'placeholder',
      'Enter your email address'
    );
    expect(emailInput).toHaveAttribute('required');

    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    expect(subscribeButton).toBeInTheDocument();
    expect(subscribeButton).toHaveAttribute('type', 'submit');
  });

  it('renders social media links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Follow Us')).toBeInTheDocument();

    const socialLinksData = [
      { label: 'Facebook', href: 'https://www.facebook.com/share/1AaY2WVCUc/' },
      { label: 'Follow us on LinkedIn', href: 'https://www.linkedin.com/company/africacmglobal/' },
      { label: 'Follow us on Instagram', href: 'https://www.instagram.com/africacreativemarketglobal?igsh=MTd6c29oOHJyYjRrcQ==' },
      { label: 'Follow us on Twitter', href: 'https://x.com/africacmglobal?t=vTOk0X1V7BXUchthxRbZpw&s=09' },
      { label: 'Contact us on WhatsApp', href: '#' },
    ];

    socialLinksData.forEach(({ label, href }) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renders copyright information with current year', () => {
    renderWithRouter(<Footer />);
    const copyright = screen.getByText(
      new RegExp(`copyright © ${currentYear}`, 'i')
    );
    expect(copyright).toBeInTheDocument();
  });

  it('handles mobile responsive layout', () => {
    const mockUseResponsive = vi.mocked(useResponsive);
    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      screenWidth: 375,
      screenHeight: 667,
    });

    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('handles tablet responsive layout', () => {
    const mockUseResponsive = vi.mocked(useResponsive);
    mockUseResponsive.mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
      isLargeDesktop: false,
      screenWidth: 768,
      screenHeight: 1024,
    });

    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('handles touch device interactions', () => {
    const mockUseTouchDevice = vi.mocked(useTouchDevice);
    mockUseTouchDevice.mockReturnValue({
      isTouchDevice: true,
      hasHover: false,
      supportsTouch: true,
      maxTouchPoints: 5,
    });

    renderWithRouter(<Footer />);
    const logoLink = screen.getByLabelText('ACM Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
  });

  it('renders with correct ARIA attributes for accessibility', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const mainNav = screen.getByLabelText('Main navigation');
    expect(mainNav).toBeInTheDocument();

    const supportNav = screen.getByLabelText('Support and legal links');
    expect(supportNav).toBeInTheDocument();

    const newsletterForm = screen.getByLabelText('Newsletter subscription');
    expect(newsletterForm).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(emailInput).toHaveAttribute(
      'aria-describedby',
      'newsletter-description'
    );
  });

  it('applies custom className when provided', () => {
    renderWithRouter(<Footer className="custom-footer-class" />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('custom-footer-class');
  });
});
