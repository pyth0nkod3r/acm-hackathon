import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useAdvancedScrollAnimation } from '@/hooks/useAdvancedScrollAnimation';
import { useMemo } from 'react';

export interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'slideDown'
    | 'scaleIn'
    | 'rotateIn'
    | 'bounceIn';
  delay?: number;
  duration?: number;
  threshold?: number | number[];
  triggerOnce?: boolean;
  className?: string;
  rootMargin?: string;
  distance?: number;
  spring?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onProgress?: (progress: number) => void;
  debug?: boolean;
}

// Comprehensive animation variants
const wrapperVariants: Record<string, Variants> = {
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
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },
  slideDown: {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },
  slideLeft: {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -10,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
  },
  bounceIn: {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  },
};

const ScrollAnimationWrapper = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  rootMargin = '0px',
  distance = 50,
  spring = false,
  onEnter,
  onLeave,
  onProgress,
  debug = false,
}: ScrollAnimationWrapperProps) => {
  const { ref, shouldAnimate, progress, isEntering, isLeaving } =
    useAdvancedScrollAnimation({
      threshold,
      triggerOnce,
      delay,
      rootMargin,
      ...(onEnter && { onEnter }),
      ...(onLeave && { onLeave }),
      ...(onProgress && { onProgress }),
    });

  // Customize variants based on distance prop
  const variants = useMemo(() => {
    const baseVariants = wrapperVariants[animation] || wrapperVariants.fadeIn;

    if (
      animation.includes('slide') &&
      baseVariants &&
      baseVariants.hidden &&
      baseVariants.visible
    ) {
      const customVariants = { ...baseVariants };

      if (animation === 'slideUp' || animation === 'slideDown') {
        const direction = animation === 'slideUp' ? distance : -distance;
        customVariants.hidden = { ...customVariants.hidden, y: direction };
      } else if (animation === 'slideLeft' || animation === 'slideRight') {
        const direction = animation === 'slideLeft' ? distance : -distance;
        customVariants.hidden = { ...customVariants.hidden, x: direction };
      }

      return customVariants;
    }

    return baseVariants;
  }, [animation, distance]);

  const transition = useMemo(() => {
    const baseTransition = {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    };

    if (spring) {
      return {
        ...baseTransition,
        type: 'spring' as const,
        stiffness: animation === 'bounceIn' ? 200 : 100,
        damping: animation === 'bounceIn' ? 10 : 15,
      };
    }

    return baseTransition;
  }, [duration, spring, animation]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={className}
      style={{
        willChange: 'transform, opacity',
      }}
      // Debug attributes
      {...(debug && {
        'data-animation': animation,
        'data-progress': progress.toFixed(2),
        'data-should-animate': shouldAnimate,
        'data-is-entering': isEntering,
        'data-is-leaving': isLeaving,
      })}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
