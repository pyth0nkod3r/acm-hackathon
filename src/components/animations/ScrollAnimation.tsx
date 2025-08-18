import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef } from 'react';

export interface ScrollAnimationProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scaleIn'
    | 'rotateIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  stagger?: number;
}

// Animation variants for scroll-based animations
const scrollVariants: Record<string, Variants> = {
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
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
};

const ScrollAnimation = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  stagger = 0,
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  const variants = scrollVariants[animation] || scrollVariants.fadeIn;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
