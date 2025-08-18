/**
 * Animation utilities tests
 * Tests animation helper functions and configurations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  scrollAnimationVariants,
  pageTransitionVariants,
  createStaggerVariants,
  createScrollAnimation,
  createPageTransition,
  createCustomVariants,
  respectsReducedMotion,
  transitions,
  easings,
} from '../animations';

// Mock responsive hook
vi.mock('../../hooks/useResponsive', () => ({
  useResponsive: vi.fn(() => ({ isMobile: false, isTablet: false })),
}));

describe('Animation Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('scrollAnimationVariants', () => {
    it('contains fadeIn animation variants', () => {
      expect(scrollAnimationVariants.fadeIn).toEqual({
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      });
    });

    it('contains slideUp animation variants', () => {
      expect(scrollAnimationVariants.slideUp).toEqual({
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      });
    });

    it('contains slideLeft animation variants', () => {
      expect(scrollAnimationVariants.slideLeft).toEqual({
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      });
    });

    it('contains slideRight animation variants', () => {
      expect(scrollAnimationVariants.slideRight).toEqual({
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      });
    });

    it('contains scaleIn animation variants', () => {
      expect(scrollAnimationVariants.scaleIn).toEqual({
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      });
    });

    it('contains slideDown animation variants', () => {
      expect(scrollAnimationVariants.slideDown).toEqual({
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      });
    });

    it('contains scaleOut animation variants', () => {
      expect(scrollAnimationVariants.scaleOut).toEqual({
        hidden: { opacity: 0, scale: 1.2 },
        visible: { opacity: 1, scale: 1 },
      });
    });

    it('contains rotateIn animation variants', () => {
      expect(scrollAnimationVariants.rotateIn).toEqual({
        hidden: { opacity: 0, rotate: -10, scale: 0.9 },
        visible: { opacity: 1, rotate: 0, scale: 1 },
      });
    });
  });

  describe('createStaggerVariants', () => {
    it('creates staggered animation configuration', () => {
      const baseVariants = scrollAnimationVariants.fadeIn;
      const config = createStaggerVariants(baseVariants, 0.1);

      expect(config).toEqual({
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      });
    });

    it('uses default stagger delay when not specified', () => {
      const baseVariants = scrollAnimationVariants.slideUp;
      const config = createStaggerVariants(baseVariants);

      expect(config).toEqual({
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.1,
          },
        },
      });
    });

    it('handles zero stagger delay', () => {
      const baseVariants = scrollAnimationVariants.scaleIn;
      const config = createStaggerVariants(baseVariants, 0);

      expect(config).toEqual({
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            staggerChildren: 0,
          },
        },
      });
    });
  });

  describe('pageTransitionVariants', () => {
    it('contains slideRight transition variants', () => {
      expect(pageTransitionVariants.slideRight).toEqual({
        initial: { opacity: 0, x: 100 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: -100 },
      });
    });

    it('contains slideLeft transition variants', () => {
      expect(pageTransitionVariants.slideLeft).toEqual({
        initial: { opacity: 0, x: -100 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 100 },
      });
    });

    it('contains fade transition variants', () => {
      expect(pageTransitionVariants.fade).toEqual({
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
      });
    });

    it('contains scale transition variants', () => {
      expect(pageTransitionVariants.scale).toEqual({
        initial: { opacity: 0, scale: 0.8 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 1.2 },
      });
    });
  });

  describe('createScrollAnimation', () => {
    it('creates scroll animation with default settings', () => {
      const animation = createScrollAnimation('fadeIn');

      expect(animation).toEqual({
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        },
        transition: {
          duration: 0.6,
          delay: 0,
          ease: easings.easeInOut,
        },
      });
    });

    it('creates scroll animation with custom options', () => {
      const options = {
        duration: 1.0,
        delay: 0.2,
        ease: easings.easeOut,
      };

      const animation = createScrollAnimation('slideUp', options);

      expect(animation).toEqual({
        variants: {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        },
        transition: {
          duration: 1.0,
          delay: 0.2,
          ease: easings.easeOut,
        },
      });
    });

    it('handles custom easing', () => {
      const options = { ease: easings.bounce };
      const animation = createScrollAnimation('scaleIn', options);

      expect(animation.transition.ease).toBe(easings.bounce);
    });
  });

  describe('transitions', () => {
    it('contains default transition configuration', () => {
      expect(transitions.default).toEqual({
        type: 'tween',
        duration: 0.4,
        ease: easings.easeInOut,
      });
    });

    it('contains fast transition configuration', () => {
      expect(transitions.fast).toEqual({
        type: 'tween',
        duration: 0.2,
        ease: easings.easeOut,
      });
    });

    it('contains slow transition configuration', () => {
      expect(transitions.slow).toEqual({
        type: 'tween',
        duration: 0.8,
        ease: easings.easeInOut,
      });
    });

    it('contains bounce transition configuration', () => {
      expect(transitions.bounce).toEqual({
        type: 'spring',
        stiffness: 400,
        damping: 10,
      });
    });

    it('contains gentle transition configuration', () => {
      expect(transitions.gentle).toEqual({
        type: 'spring',
        stiffness: 100,
        damping: 15,
      });
    });
  });

  describe('createPageTransition', () => {
    it('creates page transition with default settings', () => {
      const transition = createPageTransition('fade');

      expect(transition).toEqual({
        variants: {
          initial: { opacity: 0 },
          in: { opacity: 1 },
          out: { opacity: 0 },
        },
        transition: {
          type: 'tween',
          duration: 0.4,
          ease: easings.easeInOut,
        },
      });
    });

    it('creates page transition with custom direction', () => {
      const transition = createPageTransition('slideLeft');

      expect(transition).toEqual({
        variants: {
          initial: { opacity: 0, x: -100 },
          in: { opacity: 1, x: 0 },
          out: { opacity: 0, x: 100 },
        },
        transition: {
          type: 'tween',
          duration: 0.4,
          ease: easings.easeInOut,
        },
      });
    });

    it('creates page transition with custom duration', () => {
      const transition = createPageTransition('fade', { duration: 0.8 });

      expect(transition).toEqual({
        variants: {
          initial: { opacity: 0 },
          in: { opacity: 1 },
          out: { opacity: 0 },
        },
        transition: {
          type: 'tween',
          duration: 0.8,
          ease: easings.easeInOut,
        },
      });
    });

    it('handles slideRight direction', () => {
      const transition = createPageTransition('slideRight');

      expect(transition).toEqual({
        variants: {
          initial: { opacity: 0, x: 100 },
          in: { opacity: 1, x: 0 },
          out: { opacity: 0, x: -100 },
        },
        transition: {
          type: 'tween',
          duration: 0.4,
          ease: easings.easeInOut,
        },
      });
    });

    it('handles scale transition', () => {
      const transition = createPageTransition('scale');

      expect(transition).toEqual({
        variants: {
          initial: { opacity: 0, scale: 0.8 },
          in: { opacity: 1, scale: 1 },
          out: { opacity: 0, scale: 1.2 },
        },
        transition: {
          type: 'tween',
          duration: 0.4,
          ease: easings.easeInOut,
        },
      });
    });
  });

  describe('createCustomVariants', () => {
    it('creates custom variants correctly', () => {
      const hidden = { opacity: 0, scale: 0.5 };
      const visible = { opacity: 1, scale: 1 };

      const variants = createCustomVariants(hidden, visible);

      expect(variants).toEqual({
        hidden,
        visible,
      });
    });
  });

  describe('respectsReducedMotion', () => {
    beforeEach(() => {
      // Mock window.matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });

    it('returns normal variants when reduced motion is not preferred', () => {
      const normalVariants = scrollAnimationVariants.fadeIn;
      const result = respectsReducedMotion(normalVariants);

      expect(result).toEqual(normalVariants);
    });

    it('returns reduced variants when reduced motion is preferred', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const normalVariants = scrollAnimationVariants.slideUp;
      const reducedVariants = { hidden: {}, visible: {} };
      const result = respectsReducedMotion(normalVariants, reducedVariants);

      expect(result).toEqual(reducedVariants);
    });

    it('returns empty variants when reduced motion is preferred and no reduced variants provided', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const normalVariants = scrollAnimationVariants.scaleIn;
      const result = respectsReducedMotion(normalVariants);

      expect(result).toEqual({ hidden: {}, visible: {} });
    });
  });

  describe('easings', () => {
    it('contains easing configurations', () => {
      expect(easings.easeInOut).toEqual([0.25, 0.46, 0.45, 0.94]);
      expect(easings.easeOut).toEqual([0.25, 0.46, 0.45, 0.94]);
      expect(easings.easeIn).toEqual([0.55, 0.06, 0.68, 0.19]);
      expect(easings.bounce).toEqual([0.68, -0.55, 0.265, 1.55]);
      expect(easings.anticipate).toEqual([0.25, 0.46, 0.45, 0.94]);
    });
  });
});
