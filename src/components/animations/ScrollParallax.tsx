import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Define scroll offset type based on Framer Motion's useScroll documentation
type ScrollOffsetValue =
  | 'start'
  | 'center'
  | 'end'
  | `${number}px`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | number;

type ScrollOffsetPair = [ScrollOffsetValue, ScrollOffsetValue];

type ScrollOffset = ScrollOffsetPair | ScrollOffsetValue;

export interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: ScrollOffset;
  threshold?: number;
  rootMargin?: string;
}

const ScrollParallax = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = ['start end', 'end start'],
  threshold = 0,
  rootMargin = '0px',
}: ScrollParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Use intersection observer to only animate when element is near viewport
  const [observerRef, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  // Use scroll progress for the parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ScrollOffsetPair,
  });

  // Transform values based on direction and speed
  const range = [-100 * speed, 100 * speed];
  const reverseRange = [100 * speed, -100 * speed];

  // Create transforms for each direction
  const yTransform = useTransform(scrollYProgress, [0, 1], range);
  const yTransformReverse = useTransform(scrollYProgress, [0, 1], reverseRange);
  const xTransform = useTransform(scrollYProgress, [0, 1], range);
  const xTransformReverse = useTransform(scrollYProgress, [0, 1], reverseRange);

  // Only activate parallax when element is intersecting for performance
  useEffect(() => {
    setIsActive(isIntersecting);
  }, [isIntersecting]);

  const getTransformStyle = () => {
    if (!isActive) return {};

    switch (direction) {
      case 'up':
        return { y: yTransform };
      case 'down':
        return { y: yTransformReverse };
      case 'left':
        return { x: xTransform };
      case 'right':
        return { x: xTransformReverse };
      default:
        return { y: yTransform };
    }
  };

  return (
    <div
      ref={observerRef}
      className={`${className} ${isActive ? 'will-change-transform' : 'will-change-auto'}`.trim()}
    >
      <motion.div
        ref={ref}
        style={getTransformStyle()}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollParallax;
