import type { Variants } from 'framer-motion';

// Common easing functions
export const easings = {
  easeInOut: [0.25, 0.46, 0.45, 0.94],
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.55, 0.06, 0.68, 0.19],
  bounce: [0.68, -0.55, 0.265, 1.55],
  anticipate: [0.25, 0.46, 0.45, 0.94],
} as const;

// Common transition configurations
export const transitions = {
  default: {
    type: 'tween' as const,
    duration: 0.4,
    ease: easings.easeInOut,
  },
  fast: {
    type: 'tween' as const,
    duration: 0.2,
    ease: easings.easeOut,
  },
  slow: {
    type: 'tween' as const,
    duration: 0.8,
    ease: easings.easeInOut,
  },
  bounce: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
  },
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
} as const;

// Scroll animation variants
export const scrollAnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleOut: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
} as const;

// Page transition variants
export const pageTransitionVariants = {
  slideRight: {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -100 },
  },
  slideDown: {
    initial: { opacity: 0, y: -100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 100 },
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 },
  },
} as const;

// Stagger animation helpers
export const createStaggerVariants = (
  baseVariants: Variants,
  staggerDelay: number = 0.1
): Variants => ({
  hidden: baseVariants.hidden,
  visible: {
    ...baseVariants.visible,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

// Animation factory functions
export const createScrollAnimation = (
  type: keyof typeof scrollAnimationVariants,
  options: {
    delay?: number;
    duration?: number;
    ease?: number[] | string;
  } = {}
) => {
  const { delay = 0, duration = 0.6, ease = easings.easeInOut } = options;

  return {
    variants: scrollAnimationVariants[type],
    transition: {
      duration,
      delay,
      ease,
    },
  };
};

export const createPageTransition = (
  type: keyof typeof pageTransitionVariants,
  options: {
    duration?: number;
    ease?: number[] | string;
  } = {}
) => {
  const { duration = 0.4, ease = easings.easeInOut } = options;

  return {
    variants: pageTransitionVariants[type],
    transition: {
      type: 'tween' as const,
      duration,
      ease,
    },
  };
};

// Utility function to create custom variants
export const createCustomVariants = (
  hidden: Record<string, any>,
  visible: Record<string, any>
): Variants => ({
  hidden,
  visible,
});

// Performance optimization helpers
export const optimizeForAnimation = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
};

// Reduced motion support
export const respectsReducedMotion = (
  normalVariants: Variants,
  reducedVariants?: Variants
): Variants => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return prefersReducedMotion
    ? reducedVariants || { hidden: {}, visible: {} }
    : normalVariants;
};
