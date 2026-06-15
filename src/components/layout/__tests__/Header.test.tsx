import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';
import { useScrollDetection } from '../../../hooks/useScrollDetection';
import { useResponsive } from '../../../hooks/useResponsive';
import { useTouchDevice } from '../../../hooks/useTouchDevice';
import React from 'react';

// Mock hooks
vi.mock('../../../hooks/useScrollDetection', () => ({
  useScrollDetection: vi.fn(() => false),
}));

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

// Mock MobileNavigation component
vi.mock('../MobileNavigation', () => ({
  MobileNavigation: ({ isScrolled }: any) => (
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
    const logoLink = screen.getByLabelText('ACM Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImages = screen.getAllByAltText('ACM Logo');
    expect(logoImages[0]).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    renderWithRouter(<Header />);
    const expectedNavItems = [
      'Home',
      'About',
      'Challenges',
      'Schedule',
      'Awards',
      'Registration',
      'Partnership',
      'FAQ',
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

  it('renders mobile navigation component', () => {
    renderWithRouter(<Header />);
    const mobileNav = screen.getByTestId('mobile-navigation');
    expect(mobileNav).toBeInTheDocument();
  });

  it('passes correct props to mobile navigation', () => {
    const mockUseScrollDetection = vi.mocked(useScrollDetection);
    mockUseScrollDetection.mockReturnValue(true);

    renderWithRouter(<Header />);
    const mobileNav = screen.getByTestId('mobile-navigation');
    expect(mobileNav).toHaveTextContent('Scrolled: true');
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

    renderWithRouter(<Header />);
    const logoImages = screen.getAllByAltText('ACM Logo');
    expect(logoImages[0]).toHaveClass('h-8 w-8');
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

    renderWithRouter(<Header />);
    const logoImages = screen.getAllByAltText('ACM Logo');
    expect(logoImages[0]).toHaveClass('h-16 w-16');
  });

  it('handles touch device interactions', () => {
    const mockUseTouchDevice = vi.mocked(useTouchDevice);
    mockUseTouchDevice.mockReturnValue({
      isTouchDevice: true,
      hasHover: false,
      supportsTouch: true,
      maxTouchPoints: 5,
    });

    renderWithRouter(<Header />);
    const logoLink = screen.getByLabelText('ACM Hackathon - Go to homepage');
    expect(logoLink).toBeInTheDocument();
  });

  it('renders navigation with correct ARIA attributes', () => {
    renderWithRouter(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    renderWithRouter(<Header className="custom-header-class" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-header-class');
  });

  it('renders with sticky positioning', () => {
    renderWithRouter(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'flex', 'bg-black');
  });
});
