/**
 * Header component tests
 * Tests navigation, responsive behavior, scroll detection, and accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';

// Mock hooks
vi.mock('../../../hooks/useScrollDetection', () => ({
  useScrollDetection: vi.fn(() => false),
}));

vi.mock('../../../hooks/useResponsive', () => ({
  useResponsive: () => ({ isMobile: false, isTablet: false }),
}));

vi.mock('../../../hooks/useTouchDevice', () => ({
  useTouchDevice: () => ({ isTouchDevice: false }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock MobileNavigation component
vi.mock('../MobileNavigation', () => ({
  MobileNavigation: ({ navigationItems, isScrolled }: any) => (
    <div data-testid="mobile-navigation">
      Mobile Navigation - Scrolled: {isScrolled.toString()}
    </div>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries = ['/']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header with correct structure', () => {
    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'navigation');
  });

  it('renders logo with correct attributes', () => {
    renderWithRouter(<Header />);

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

  it('renders all navigation items', () => {
    renderWithRouter(<Header />);

    const expectedNavItems = [
      'Home',
      'About',
      'Challenges',
      'Schedule',
      'Awards & Judging',
      'Gallery',
      'Highlights',
      'Mentors & Judges',
      'Application',
      'Contact',
    ];

    expectedNavItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('highlights active route correctly', () => {
    renderWithRouter(<Header />, ['/about']);

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('highlights home route correctly when on root path', () => {
    renderWithRouter(<Header />, ['/']);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('applies scrolled styles when scroll is detected', () => {
    const mockUseScrollDetection = vi.mocked(
      require('../../../hooks/useScrollDetection').useScrollDetection
    );
    mockUseScrollDetection.mockReturnValue(true);

    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
  });

  it('applies transparent styles when not scrolled', () => {
    const mockUseScrollDetection = vi.mocked(
      require('../../../hooks/useScrollDetection').useScrollDetection
    );
    mockUseScrollDetection.mockReturnValue(false);

    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
  });

  it('renders mobile navigation component', () => {
    renderWithRouter(<Header />);

    const mobileNav = screen.getByTestId('mobile-navigation');
    expect(mobileNav).toBeInTheDocument();
  });

  it('passes correct props to mobile navigation', () => {
    const mockUseScrollDetection = vi.mocked(
      require('../../../hooks/useScrollDetection').useScrollDetection
    );
    mockUseScrollDetection.mockReturnValue(true);

    renderWithRouter(<Header />);

    const mobileNav = screen.getByTestId('mobile-navigation');
    expect(mobileNav).toHaveTextContent('Scrolled: true');
  });

  it('handles mobile responsive layout', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );
    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<Header />);

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

    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('handles touch device interactions', () => {
    const mockUseTouchDevice = vi.mocked(
      require('../../../hooks/useTouchDevice').useTouchDevice
    );
    mockUseTouchDevice.mockReturnValue({
      isTouchDevice: true,
    });

    renderWithRouter(<Header />);

    // Touch-friendly elements should have appropriate classes
    const logoLink = screen.getByLabelText('AfCFTA Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
  });

  it('renders navigation with correct ARIA attributes', () => {
    renderWithRouter(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders logo link with correct accessibility attributes', () => {
    renderWithRouter(<Header />);

    const logoLink = screen.getByLabelText('AfCFTA Hackathon - Go to homepage');
    expect(logoLink).toHaveAttribute(
      'aria-label',
      'AfCFTA Hackathon - Go to homepage'
    );
  });

  it('applies custom className when provided', () => {
    renderWithRouter(<Header className="custom-header-class" />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-header-class');
  });

  it('renders navigation links with correct href attributes', () => {
    renderWithRouter(<Header />);

    const expectedLinks = [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Challenges', href: '/challenges' },
      { text: 'Schedule', href: '/schedule' },
      { text: 'Awards & Judging', href: '/awards' },
      { text: 'Gallery', href: '/gallery' },
      { text: 'Highlights', href: '/highlights' },
      { text: 'Mentors & Judges', href: '/judges' },
      { text: 'Application', href: '/application' },
      { text: 'Contact', href: '/contact' },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text).closest('a');
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('hides desktop navigation on mobile', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );
    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    renderWithRouter(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toHaveClass('hidden', 'lg:flex');
  });

  it('shows desktop navigation on larger screens', () => {
    renderWithRouter(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toHaveClass('hidden', 'lg:flex');
  });

  it('handles route matching for nested paths', () => {
    renderWithRouter(<Header />, ['/about/team']);

    const aboutLink = screen.getByText('About').closest('a');
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not highlight non-matching routes', () => {
    renderWithRouter(<Header />, ['/about']);

    const homeLink = screen.getByText('Home').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');

    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
    expect(contactLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('renders with fixed positioning', () => {
    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('applies transition classes for smooth animations', () => {
    renderWithRouter(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('transition-all', 'duration-300');
  });
});
