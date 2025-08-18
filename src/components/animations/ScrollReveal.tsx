import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export interface ScrollRevealProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideLeft'
    | 'slideRight'
    | 'slideDown'
    | 'scaleIn'
    | 'rotateIn';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  rootMargin?: string;
  stagger?: number;
}

// Enhanced animation variants with more control
const scrollRevealVariants: Record<string, Variants> = {
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
      y: 60,
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
      y: -60,
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
      x: 60,
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
      x: -60,
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
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  },
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -15,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      y: 0,
    },
  },
};

const ScrollReveal = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  distance = 60,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  rootMargin = '0px',
  stagger = 0,
}: ScrollRevealProps) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin,
  });

  // Customize distance for slide animations
  const customVariants = { ...scrollRevealVariants[animation] };
  if (
    animation.includes('slide') &&
    customVariants.hidden &&
    customVariants.visible
  ) {
    if (animation === 'slideUp' || animation === 'slideDown') {
      const direction = animation === 'slideUp' ? distance : -distance;
      customVariants.hidden = { ...customVariants.hidden, y: direction };
    } else if (animation === 'slideLeft' || animation === 'slideRight') {
      const direction = animation === 'slideLeft' ? distance : -distance;
      customVariants.hidden = { ...customVariants.hidden, x: direction };
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={customVariants}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animations
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className={className}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
