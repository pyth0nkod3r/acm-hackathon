import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ScrollProgressProps {
  className?: string;
  height?: number;
  color?: string;
  position?: 'top' | 'bottom';
  smooth?: boolean;
}

const ScrollProgress = ({
  className = '',
  height = 4,
  color = 'hsl(var(--primary))',
  position = 'top',
  smooth = true,
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Show progress bar only when scrolling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', latest => {
      setIsVisible(latest > 0.01);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed left-0 right-0 z-50 origin-left ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{
        height: `${height}px`,
        backgroundColor: color,
        scaleX: smooth ? scaleX : scrollYProgress,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default ScrollProgress;
