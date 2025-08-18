/**
 * Integration tests for responsive behavior and mobile interactions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './setup';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RegistrationForm } from '../../components/forms/RegistrationForm';
import { ContactForm } from '../../components/forms/ContactForm';
import App from '../../App';

// Mock viewport dimensions
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });

  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

// Mock touch events
const mockTouchSupport = (hasTouch: boolean) => {
  Object.defineProperty(window, 'ontouchstart', {
    writable: true,
    configurable: true,
    value: hasTouch ? {} : undefined,
  });

  Object.defineProperty(navigator, 'maxTouchPoints', {
    writable: true,
    configurable: true,
    value: hasTouch ? 1 : 0,
  });
};

describe('Responsive Behavior and Mobile Interactions', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset viewport to desktop by default
    mockViewport(1024, 768);
    mockTouchSupport(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Responsive Layout', () => {
    it('should adapt header layout for mobile screens', async () => {
      // Set mobile viewport
      mockViewport(375, 667);

      renderWithProviders(<Header />);

      await waitFor(() => {
        // Mobile menu button should be visible
        expect(
          screen.getByRole('button', { name: /menu/i })
        ).toBeInTheDocument();

        // Desktop navigation should be hidden
        const navigation = screen.getByRole('navigation');
        expect(navigation).toHaveClass('mobile-hidden'); // Assuming responsive classes
      });
    });

    it('should adapt header layout for tablet screens', async () => {
      // Set tablet viewport
      mockViewport(768, 1024);

      renderWithProviders(<Header />);

      await waitFor(() => {
        // Should show condensed navigation
        const navigation = screen.getByRole('navigation');
        expect(navigation).toHaveClass('tablet-layout'); // Assuming responsive classes
      });
    });

    it('should adapt header layout for desktop screens', async () => {
      // Set desktop viewport
      mockViewport(1200, 800);

      renderWithProviders(<Header />);

      await waitFor(() => {
        // Full navigation should be visible
        const navigation = screen.getByRole('navigation');
        expect(navigation).toHaveClass('desktop-layout'); // Assuming responsive classes

        // Mobile menu button should be hidden
        expect(
          screen.queryByRole('button', { name: /menu/i })
        ).not.toBeInTheDocument();
      });
    });

    it('should adapt footer layout for different screen sizes', async () => {
      // Test mobile footer
      mockViewport(375, 667);
      renderWithProviders(<Footer />);

      await waitFor(() => {
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('mobile-footer'); // Assuming responsive classes
      });

      // Test desktop footer
      mockViewport(1200, 800);
      window.dispatchEvent(new Event('resize'));

      await waitFor(() => {
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('desktop-footer'); // Assuming responsive classes
      });
    });

    it('should handle viewport orientation changes', async () => {
      // Start in portrait
      mockViewport(375, 667);
      renderWithProviders(<App />);

      // Change to landscape
      mockViewport(667, 375);

      // Mock orientation change event
      Object.defineProperty(screen, 'orientation', {
        writable: true,
        configurable: true,
        value: { angle: 90 },
      });
      window.dispatchEvent(new Event('orientationchange'));

      await waitFor(() => {
        const mainContent = screen.getByRole('main');
        expect(mainContent).toHaveClass('landscape-layout'); // Assuming orientation classes
      });
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      mockViewport(375, 667); // Mobile viewport
    });

    it('should open mobile menu on button click', async () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        const navigation = screen.getByRole('navigation');
        expect(navigation).toHaveClass('mobile-menu-open');
        expect(navigation).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should close mobile menu on outside click', async () => {
      renderWithProviders(<Header />);

      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
      });

      // Click outside menu
      fireEvent.click(document.body);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).not.toHaveClass(
          'mobile-menu-open'
        );
      });
    });

    it('should close mobile menu on escape key', async () => {
      renderWithProviders(<Header />);

      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
      });

      // Press escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.getByRole('navigation')).not.toHaveClass(
          'mobile-menu-open'
        );
      });
    });

    it('should close mobile menu when navigation link is clicked', async () => {
      renderWithProviders(<Header />);

      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
      });

      // Click navigation link
      const aboutLink = screen.getByRole('link', { name: /about/i });
      await user.click(aboutLink);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).not.toHaveClass(
          'mobile-menu-open'
        );
      });
    });

    it('should trap focus within mobile menu when open', async () => {
      renderWithProviders(<Header />);

      // Open menu
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
      });

      // Tab through menu items
      await user.keyboard('{Tab}');
      expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();

      await user.keyboard('{Tab}');
      expect(screen.getByRole('link', { name: /about/i })).toHaveFocus();

      // Should cycle back to first item after last
      const links = screen.getAllByRole('link');
      for (let i = 0; i < links.length; i++) {
        await user.keyboard('{Tab}');
      }

      // Should focus back on close button or first link
      expect(menuButton).toHaveFocus();
    });
  });

  describe('Touch Interactions', () => {
    beforeEach(() => {
      mockViewport(375, 667); // Mobile viewport
      mockTouchSupport(true); // Enable touch support
    });

    it('should handle touch gestures for navigation', async () => {
      renderWithProviders(<App />);

      const mainContent = screen.getByRole('main');

      // Simulate swipe gesture
      fireEvent.touchStart(mainContent, {
        touches: [{ clientX: 100, clientY: 100 }],
      });

      fireEvent.touchMove(mainContent, {
        touches: [{ clientX: 200, clientY: 100 }],
      });

      fireEvent.touchEnd(mainContent, {
        changedTouches: [{ clientX: 200, clientY: 100 }],
      });

      // Should trigger swipe navigation (if implemented)
      await waitFor(() => {
        // Verify swipe gesture was handled
        expect(mainContent).toHaveClass('swipe-handled'); // Assuming swipe classes
      });
    });

    it('should provide touch-friendly button sizes', async () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole('button', { name: /menu/i });

      // Button should have minimum touch target size (44px)
      const buttonStyles = window.getComputedStyle(menuButton);
      const minSize = 44;

      expect(parseInt(buttonStyles.minHeight)).toBeGreaterThanOrEqual(minSize);
      expect(parseInt(buttonStyles.minWidth)).toBeGreaterThanOrEqual(minSize);
    });

    it('should handle touch interactions in forms', async () => {
      renderWithProviders(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);

      // Simulate touch focus
      fireEvent.touchStart(nameInput);
      fireEvent.focus(nameInput);

      await waitFor(() => {
        expect(nameInput).toHaveFocus();
        expect(nameInput).toHaveClass('touch-focused'); // Assuming touch focus classes
      });
    });

    it('should prevent zoom on form inputs', async () => {
      renderWithProviders(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);

      // Input should have font-size >= 16px to prevent zoom on iOS
      const inputStyles = window.getComputedStyle(emailInput);
      expect(parseInt(inputStyles.fontSize)).toBeGreaterThanOrEqual(16);
    });

    it('should handle pull-to-refresh gesture', async () => {
      const refreshHandler = vi.fn();

      renderWithProviders(<App />);

      const mainContent = screen.getByRole('main');

      // Simulate pull-to-refresh gesture
      fireEvent.touchStart(mainContent, {
        touches: [{ clientX: 100, clientY: 50 }],
      });

      fireEvent.touchMove(mainContent, {
        touches: [{ clientX: 100, clientY: 150 }],
      });

      fireEvent.touchEnd(mainContent, {
        changedTouches: [{ clientX: 100, clientY: 150 }],
      });

      // Should trigger refresh (if implemented)
      await waitFor(() => {
        expect(mainContent).toHaveClass('pull-refresh-triggered'); // Assuming refresh classes
      });
    });
  });

  describe('Form Responsiveness', () => {
    it('should adapt registration form layout for mobile', async () => {
      mockViewport(375, 667);
      renderWithProviders(<RegistrationForm />);

      await waitFor(() => {
        const form = screen.getByRole('form');
        expect(form).toHaveClass('mobile-form-layout'); // Assuming responsive form classes
      });

      // Form fields should stack vertically on mobile
      const formFields = screen.getAllByRole('textbox');
      formFields.forEach(field => {
        const fieldStyles = window.getComputedStyle(field);
        expect(fieldStyles.width).toBe('100%');
      });
    });

    it('should adapt contact form layout for mobile', async () => {
      mockViewport(375, 667);
      renderWithProviders(<ContactForm />);

      await waitFor(() => {
        const form = screen.getByRole('form');
        expect(form).toHaveClass('mobile-form-layout'); // Assuming responsive form classes
      });

      // Textarea should be appropriately sized for mobile
      const messageTextarea = screen.getByLabelText(/message/i);
      const textareaStyles = window.getComputedStyle(messageTextarea);
      expect(parseInt(textareaStyles.minHeight)).toBeGreaterThanOrEqual(120);
    });

    it('should handle virtual keyboard appearance', async () => {
      mockViewport(375, 667);
      renderWithProviders(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);

      // Simulate virtual keyboard appearance
      fireEvent.focus(nameInput);

      // Mock viewport height change when keyboard appears
      mockViewport(375, 400); // Reduced height

      await waitFor(() => {
        const form = screen.getByRole('form');
        expect(form).toHaveClass('keyboard-visible'); // Assuming keyboard classes
      });
    });

    it('should maintain form usability during orientation changes', async () => {
      // Start in portrait
      mockViewport(375, 667);
      renderWithProviders(<RegistrationForm />);

      // Fill out some form data
      await user.type(screen.getByLabelText(/team name/i), 'Test Team');

      // Change to landscape
      mockViewport(667, 375);
      window.dispatchEvent(new Event('orientationchange'));

      await waitFor(() => {
        // Form data should be preserved
        expect(screen.getByDisplayValue('Test Team')).toBeInTheDocument();

        // Form should adapt to landscape layout
        const form = screen.getByRole('form');
        expect(form).toHaveClass('landscape-form-layout'); // Assuming orientation classes
      });
    });
  });

  describe('Performance on Mobile', () => {
    beforeEach(() => {
      mockViewport(375, 667);
      mockTouchSupport(true);
    });

    it('should lazy load images on mobile', async () => {
      renderWithProviders(<App />);

      // Images should have loading="lazy" attribute
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('should debounce resize events', async () => {
      const resizeHandler = vi.fn();
      window.addEventListener('resize', resizeHandler);

      renderWithProviders(<App />);

      // Trigger multiple resize events quickly
      for (let i = 0; i < 10; i++) {
        mockViewport(375 + i, 667);
      }

      // Should debounce and only call handler once
      await waitFor(() => {
        expect(resizeHandler).toHaveBeenCalledTimes(1);
      });

      window.removeEventListener('resize', resizeHandler);
    });

    it('should optimize animations for mobile', async () => {
      renderWithProviders(<App />);

      // Check for reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      // Animations should be reduced or disabled
      const animatedElements = screen.getAllByTestId('animated-element');
      animatedElements.forEach(element => {
        expect(element).toHaveClass('reduced-motion'); // Assuming reduced motion classes
      });
    });
  });

  describe('Accessibility on Mobile', () => {
    beforeEach(() => {
      mockViewport(375, 667);
      mockTouchSupport(true);
    });

    it('should maintain focus visibility on touch devices', async () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole('button', { name: /menu/i });

      // Simulate touch and focus
      fireEvent.touchStart(menuButton);
      fireEvent.focus(menuButton);

      await waitFor(() => {
        expect(menuButton).toHaveClass('focus-visible'); // Assuming focus classes
      });
    });

    it('should provide appropriate ARIA labels for mobile interactions', async () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole('button', { name: /menu/i });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', expect.any(String));
      expect(menuButton).toHaveAttribute(
        'aria-label',
        expect.stringContaining('menu')
      );
    });

    it('should announce state changes to screen readers', async () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      await user.click(menuButton);

      await waitFor(() => {
        // Menu state change should be announced
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent(/menu opened/i);
      });
    });

    it('should support high contrast mode on mobile', async () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      renderWithProviders(<App />);

      // Should apply high contrast styles
      const mainContent = screen.getByRole('main');
      expect(mainContent).toHaveClass('high-contrast'); // Assuming contrast classes
    });
  });
});
