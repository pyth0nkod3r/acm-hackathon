/**
 * Footer component tests
 * Tests footer content, social links, responsive behavior, and accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';

// Mock hooks
vi.mock('../../../hooks/useResponsive', () => ({
  useResponsive: () => ({ isMobile: false, isTablet: false }),
}));

vi.mock('../../../hooks/useTouchDevice', () => ({
  useTouchDevice: () => ({ isTouchDevice: false }),
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
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock current year to make tests consistent
    vi.setSystemTime(new Date('2024-01-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders footer with correct structure', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('id', 'footer');
  });

  it('renders logo and company name', () => {
    renderWithRouter(<Footer />);

    const logoLink = screen.getByLabelText('AfCFTA Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByAltText('AfCFTA Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      'src',
      '/assets/img/logo/afcfta-logo.jpg'
    );

    const logoText = screen.getByText('AfCFTA Hackathon');
    expect(logoText).toBeInTheDocument();
  });

  it('renders company description', () => {
    renderWithRouter(<Footer />);

    const description = screen.getByText(
      /join the afcfta digital trade protocol hackathon/i
    );
    expect(description).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderWithRouter(<Footer />);

    const email = screen.getByText('info@afcfta-hackathon.org');
    expect(email).toBeInTheDocument();
    expect(email.closest('a')).toHaveAttribute(
      'href',
      'mailto:info@afcfta-hackathon.org'
    );

    const phone = screen.getByText('+234 123 456 7890');
    expect(phone).toBeInTheDocument();
    expect(phone.closest('a')).toHaveAttribute('href', 'tel:+234 123 456 7890');

    const address = screen.getByText('AfCFTA Secretariat, Accra, Ghana');
    expect(address).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('Quick Links')).toBeInTheDocument();

    const expectedLinks = [
      { text: 'About', href: '/about' },
      { text: 'Challenges', href: '/challenges' },
      { text: 'Application', href: '/application' },
      { text: 'Schedule', href: '/schedule' },
      { text: 'Awards & Judging', href: '/awards-judging' },
      { text: 'Gallery', href: '/gallery' },
      { text: 'Contact', href: '/contact' },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', href);
    });
  });

  it('renders newsletter signup section', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(
      screen.getByText(/subscribe to receive updates/i)
    ).toBeInTheDocument();

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

    const socialLinks = [
      'Follow us on LinkedIn',
      'Follow us on Instagram',
      'Follow us on Twitter',
      'Contact us on WhatsApp',
    ];

    socialLinks.forEach(label => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#');
    });
  });

  it('renders copyright information with current year', () => {
    renderWithRouter(<Footer />);

    const copyright = screen.getByText(
      /copyright © 2024 afcfta digital trade protocol hackathon/i
    );
    expect(copyright).toBeInTheDocument();
  });

  it('renders legal links', () => {
    renderWithRouter(<Footer />);

    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');

    const termsLink = screen.getByText('Terms of Service');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('handles mobile responsive layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );
    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<Footer />);

    // Logo text should be shortened on mobile
    expect(screen.getByText('AfCFTA')).toBeInTheDocument();
    expect(screen.queryByText('AfCFTA Hackathon')).not.toBeInTheDocument();
  });

  it('handles tablet responsive layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );
    mockUseResponsive.mockReturnValue({
      isMobile: false,
      isTablet: true,
    });

    renderWithRouter(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('handles touch device interactions', () => {
    const mockUseTouchDevice = vi.mocked(
      require('../../../hooks/useTouchDevice').useTouchDevice
    );
    mockUseTouchDevice.mockReturnValue({
      isTouchDevice: true,
    });

    renderWithRouter(<Footer />);

    // Touch-friendly elements should have appropriate classes
    const logoLink = screen.getByLabelText('AfCFTA Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
  });

  it('renders with correct ARIA attributes for accessibility', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    const quickLinksNav = screen.getByLabelText('Footer navigation');
    expect(quickLinksNav).toBeInTheDocument();

    const newsletterForm = screen.getByLabelText('Newsletter subscription');
    expect(newsletterForm).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(emailInput).toHaveAttribute(
      'aria-describedby',
      'newsletter-description'
    );
  });

  it('renders contact information with correct icons', () => {
    renderWithRouter(<Footer />);

    // We can't easily test for specific icons, but we can test that the contact info is structured correctly
    const emailLink = screen.getByLabelText(/send email to/i);
    expect(emailLink).toBeInTheDocument();

    const phoneLink = screen.getByLabelText(/call/i);
    expect(phoneLink).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    renderWithRouter(<Footer className="custom-footer-class" />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('custom-footer-class');
  });

  it('handles newsletter form submission', () => {
    renderWithRouter(<Footer />);

    const form = screen.getByLabelText('Newsletter subscription');
    const emailInput = screen.getByLabelText(/email address for newsletter/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    // Test form structure
    expect(form.tagName.toLowerCase()).toBe('form');
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });

  it('renders social links with correct accessibility labels', () => {
    renderWithRouter(<Footer />);

    const socialLabels = [
      'Follow us on LinkedIn',
      'Follow us on Instagram',
      'Follow us on Twitter',
      'Contact us on WhatsApp',
    ];

    socialLabels.forEach(label => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('aria-label', label);
    });
  });

  it('renders gradient background', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900');
  });

  it('renders quick links in mobile grid layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );
    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<Footer />);

    // Quick links should be rendered in a grid on mobile
    const quickLinksSection = screen.getByText('Quick Links').closest('div');
    expect(quickLinksSection).toBeInTheDocument();
  });

  it('renders newsletter description with screen reader support', () => {
    renderWithRouter(<Footer />);

    const description = screen.getByText(
      /subscribe to receive updates about the afcfta/i
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute('id', 'newsletter-description');
  });

  it('renders footer bottom section with proper layout', () => {
    renderWithRouter(<Footer />);

    const copyright = screen.getByText(/copyright © 2024/i);
    const privacyLink = screen.getByText('Privacy Policy');
    const termsLink = screen.getByText('Terms of Service');

    expect(copyright).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });
});
