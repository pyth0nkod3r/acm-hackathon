/**
 * Basic routing functionality test
 * This is a simple test to verify routing components work correctly
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home, About, Contact, Application, NotFound } from '../../../pages';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Helper function to render components with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Page Components', () => {
  it('renders Home page correctly', () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByText('AfCFTA Digital Trade Protocol Hackathon 2025')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Join the future of digital trade in Africa')
    ).toBeInTheDocument();
  });

  it('renders About page correctly', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('About the Hackathon')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  it('renders Contact page correctly', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders Application page correctly', () => {
    renderWithRouter(<Application />);
    expect(screen.getByText('Apply for the Hackathon')).toBeInTheDocument();
    expect(screen.getByText('Application Process')).toBeInTheDocument();
  });

  it('renders NotFound page correctly', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});

describe('Route Configuration', () => {
  it('exports route configuration correctly', async () => {
    const { routes, getRouteByPath } = await import('../../../config/routes');

    expect(routes).toHaveLength(4);
    expect(routes[0].path).toBe('/');
    expect(routes[1].path).toBe('/about');
    expect(routes[2].path).toBe('/contact');
    expect(routes[3].path).toBe('/application');

    const homeRoute = getRouteByPath('/');
    expect(homeRoute?.title).toBe(
      'Home - AfCFTA Digital Trade Protocol Hackathon'
    );
  });
});
