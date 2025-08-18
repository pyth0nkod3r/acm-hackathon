import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMemo } from 'react';

export interface ScrollTriggerProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'slideDown'
    | 'scaleIn'
    | 'rotateIn'
    | 'custom';
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  threshold?: number | number[];
  triggerOnce?: boolean;
  className?: string;
  rootMargin?: string;
  spring?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

// Comprehensive animation variants
const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  slideUp: {
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  },
  slideDown: {
    hidden: {
      opacity: 0,
      y: -50,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  },
  slideLeft: {
    hidden: {
      opacity: 0,
      x: 50,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: -50,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
  },
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -10,
      scale: 0.9,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  },
};

const ScrollTrigger = ({
  children,
  animation = 'fadeIn',
  customVariants,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  rootMargin = '0px 0px -10% 0px',
  spring = false,
  stiffness = 100,
  damping = 15,
  mass = 1,
  onAnimationStart,
  onAnimationComplete,
}: ScrollTriggerProps) => {
  const [ref, isIntersecting, entry] = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin,
  });

  // Memoize variants to prevent unnecessary re-renders
  const variants = useMemo(() => {
    if (customVariants) return customVariants;
    return animationVariants[animation] || animationVariants.fadeIn;
  }, [animation, customVariants]);

  // Memoize transition configuration
  const transition = useMemo((): Transition => {
    const baseTransition: Transition = {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    };

    if (spring) {
      return {
        ...baseTransition,
        type: 'spring',
        stiffness,
        damping,
        mass,
      };
    }

    return baseTransition;
  }, [duration, delay, spring, stiffness, damping, mass]);

  // Calculate intersection ratio for advanced animations
  const intersectionRatio = entry?.intersectionRatio ?? 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
      style={{
        willChange: 'transform, opacity, filter',
      }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      // Add data attributes for debugging
      data-scroll-trigger={animation}
      data-intersection-ratio={intersectionRatio.toFixed(2)}
      data-is-intersecting={isIntersecting}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTrigger;
