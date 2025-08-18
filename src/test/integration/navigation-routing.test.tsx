/**
 * Integration tests for navigation and routing functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { renderWithProviders } from './setup';
import App from '../../App';
import { routes } from '../../config/routes';
import { Header } from '../../components/layout/Header';
import { AppRouter } from '../../components/routing/AppRouter';
import { NotificationProvider } from '../../contexts';

describe('Navigation and Routing Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Route Navigation', () => {
    it('should navigate to all defined routes', async () => {
      // Test each route defined in the routes config
      for (const route of routes) {
        const { unmount } = render(
          <MemoryRouter initialEntries={[route.path]}>
            <NotificationProvider>
              <AppRouter />
            </NotificationProvider>
          </MemoryRouter>
        );

        // Wait for lazy-loaded component to render
        await waitFor(
          () => {
            // Check that the page content is rendered (not just loading)
            expect(
              screen.queryByTestId('loading-fallback')
            ).not.toBeInTheDocument();
          },
          { timeout: 3000 }
        );

        // Verify page title is set correctly
        await waitFor(() => {
          expect(document.title).toContain(route.title.split(' - ')[0]);
        });

        unmount();
      }
    });

    it('should handle invalid routes with 404 page', async () => {
      render(
        <MemoryRouter initialEntries={['/invalid-route']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
        expect(screen.getByText(/404/i)).toBeInTheDocument();
      });
    });

    it('should navigate using browser back and forward buttons', async () => {
      render(
        <BrowserRouter>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </BrowserRouter>
      );

      // Start at home page
      expect(window.location.pathname).toBe('/');

      // Navigate to about page
      window.history.pushState({}, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));

      await waitFor(() => {
        expect(window.location.pathname).toBe('/about');
      });

      // Navigate back
      window.history.back();
      window.dispatchEvent(new PopStateEvent('popstate'));

      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });

    it('should preserve scroll position on navigation', async () => {
      const scrollToSpy = vi.spyOn(window, 'scrollTo');

      render(
        <MemoryRouter initialEntries={['/']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Simulate scroll position
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });

      // Navigate to another page
      render(
        <MemoryRouter initialEntries={['/about']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Should scroll to top on new page
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Header Navigation', () => {
    it('should highlight active navigation items', async () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <NotificationProvider>
            <Header />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const aboutLink = screen.getByRole('link', { name: /about/i });
        expect(aboutLink).toHaveClass('active'); // Assuming active class is applied
      });
    });

    it('should open and close mobile menu', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<Header />);

      // Find mobile menu button
      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();

      // Open mobile menu
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
      });

      // Close mobile menu
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).not.toHaveClass(
          'mobile-menu-open'
        );
      });
    });

    it('should navigate using keyboard', async () => {
      renderWithProviders(<Header />);

      // Focus on first navigation link
      const homeLink = screen.getByRole('link', { name: /home/i });
      homeLink.focus();

      // Navigate using Tab key
      await user.keyboard('{Tab}');

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toHaveFocus();

      // Navigate using Enter key
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(window.location.pathname).toBe('/about');
      });
    });

    it('should show sticky header behavior on scroll', async () => {
      renderWithProviders(<Header />);

      const header = screen.getByRole('banner');

      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));

      await waitFor(() => {
        expect(header).toHaveClass('sticky-header'); // Assuming sticky class is applied
      });
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('should display correct breadcrumbs for nested routes', async () => {
      render(
        <MemoryRouter initialEntries={['/challenges']}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/challenges/i)).toBeInTheDocument();
      });
    });

    it('should navigate using breadcrumb links', async () => {
      render(
        <MemoryRouter initialEntries={['/challenges']}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toHaveAttribute('href', '/');
      });

      // Click breadcrumb link
      const homeLink = screen.getByRole('link', { name: /home/i });
      await user.click(homeLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });
  });

  describe('Page Transitions', () => {
    it('should show loading state during route transitions', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Navigate to a new route
      render(
        <MemoryRouter initialEntries={['/about']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Should show loading fallback briefly
      expect(screen.getByTestId('loading-fallback')).toBeInTheDocument();

      // Wait for component to load
      await waitFor(() => {
        expect(
          screen.queryByTestId('loading-fallback')
        ).not.toBeInTheDocument();
      });
    });

    it('should handle route transition animations', async () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Navigate to new route
      rerender(
        <MemoryRouter initialEntries={['/about']}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Check for animation classes (assuming Framer Motion classes)
      await waitFor(() => {
        const pageContent = screen.getByRole('main');
        expect(pageContent).toHaveClass('page-transition'); // Assuming animation class
      });
    });
  });

  describe('Skip Links and Accessibility', () => {
    it('should provide skip links for keyboard navigation', async () => {
      renderWithProviders(<App />);

      // Focus on skip link (should be first focusable element)
      await user.keyboard('{Tab}');

      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toHaveFocus();

      // Activate skip link
      await user.keyboard('{Enter}');

      await waitFor(() => {
        const mainContent = screen.getByRole('main');
        expect(mainContent).toHaveFocus();
      });
    });

    it('should have proper ARIA landmarks', () => {
      renderWithProviders(<App />);

      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
      expect(screen.getByRole('navigation')).toBeInTheDocument(); // Navigation
    });

    it('should announce route changes to screen readers', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </MemoryRouter>
      );

      // Navigate to new route
      render(
        <MemoryRouter initialEntries={['/about']}>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        // Check for aria-live region announcement
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent(/navigated to about/i);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle routing errors gracefully', async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Simulate routing error
      const ErrorComponent = () => {
        throw new Error('Route error');
      };

      render(
        <MemoryRouter initialEntries={['/']}>
          <NotificationProvider>
            <ErrorComponent />
          </NotificationProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should recover from routing errors', async () => {
      renderWithProviders(<App />);

      // Simulate error recovery by navigating to a working route
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      await waitFor(() => {
        expect(
          screen.queryByText(/something went wrong/i)
        ).not.toBeInTheDocument();
      });
    });
  });
});
