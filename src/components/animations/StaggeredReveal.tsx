import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Children, useMemo } from 'react';

export interface StaggeredRevealProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'slideDown'
    | 'scaleIn';
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  containerClassName?: string;
  rootMargin?: string;
  reverse?: boolean;
  spring?: boolean;
}

const staggerAnimationVariants: Record<string, Variants> = {
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
      y: 40,
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
      y: -40,
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
      x: 40,
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
      x: -40,
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
};

const StaggeredReveal = ({
  children,
  animation = 'slideUp',
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  containerClassName = '',
  rootMargin = '0px',
  reverse = false,
  spring = false,
}: StaggeredRevealProps) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const variants = useMemo(() => {
    return (
      staggerAnimationVariants[animation] || staggerAnimationVariants.slideUp
    );
  }, [animation]);

  const childrenArray = useMemo(() => {
    const array = Children.toArray(children);
    return reverse ? array.reverse() : array;
  }, [children, reverse]);

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0,
        },
      },
    }),
    [staggerDelay]
  );

  const itemTransition = useMemo(() => {
    const baseTransition = {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    };

    if (spring) {
      return {
        ...baseTransition,
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      };
    }

    return baseTransition;
  }, [duration, spring]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={containerClassName}
      style={{
        willChange: 'transform',
      }}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={itemTransition}
          className={className}
          style={{
            willChange: 'transform, opacity',
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredReveal;
