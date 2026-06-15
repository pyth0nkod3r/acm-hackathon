import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home, About, Contact, Application, NotFound } from '../../../pages';
import React from 'react';
import { NotificationProvider } from '../../../contexts/NotificationContext';

// Mock framer-motion to avoid animation issues in tests using a Proxy that handles all tags
vi.mock('framer-motion', () => {
  const mockMotion = new Proxy(
    {},
    {
      get: (_target, key) => {
        return ({ children, ...props }: any) => {
          const Tag = key as any;
          // Strip framer-motion motion-specific properties to avoid React element warnings
          const {
            whileHover,
            whileTap,
            whileInView,
            initial,
            animate,
            exit,
            transition,
            viewport,
            ...domProps
          } = props;
          return React.createElement(Tag, domProps, children);
        };
      },
    }
  );
  return {
    motion: mockMotion,
    AnimatePresence: ({ children }: any) => children,
  };
});

// Helper function to render components with router and notification provider
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <NotificationProvider>
        {component}
      </NotificationProvider>
    </BrowserRouter>
  );
};

describe('Page Components', () => {
  it('renders Home page correctly', () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByText(/Connected Play/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/esports and connectivity/i)
    ).toBeInTheDocument();
  });

  it('renders About page correctly', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/About The Hackathon/i)).toBeInTheDocument();
    expect(screen.getByText(/Key Goals/i)).toBeInTheDocument();
  });

  it('renders Contact page correctly', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders Application page correctly', () => {
    renderWithRouter(<Application />);
    expect(screen.getByText(/Apply for/i)).toBeInTheDocument();
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

    expect(routes.length).toBeGreaterThanOrEqual(4);
    expect(routes[0]!.path).toBe('/');
    expect(routes[1]!.path).toBe('/about');
    expect(routes[2]!.path).toBe('/contact');

    const homeRoute = getRouteByPath('/');
    expect(homeRoute?.title).toBe(
      'Home - ACM Hackathon 2026'
    );
  });
});
