import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useRef } from 'react';

export interface RevealAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  overflow?: boolean;
}

const RevealAnimation = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  overflow = true,
}: RevealAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <div
      ref={ref}
      className={`${overflow ? 'overflow-hidden' : ''} will-change-transform`.trim()}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealAnimation;
