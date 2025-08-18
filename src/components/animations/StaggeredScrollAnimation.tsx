import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef, Children, cloneElement, isValidElement } from 'react';

export interface StaggeredScrollAnimationProps {
  children: ReactNode;
  animation?:
    | 'fadeIn'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scaleIn';
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  containerClassName?: string;
}

const staggerVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StaggeredScrollAnimation = ({
  children,
  animation = 'slideUp',
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  containerClassName = '',
}: StaggeredScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  const variants = staggerVariants[animation] || staggerVariants.slideUp;
  const childrenArray = Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={containerClassName}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={{
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={className}
          style={{ willChange: 'transform, opacity' }}
        >
          {isValidElement(child) ? cloneElement(child) : child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredScrollAnimation;
