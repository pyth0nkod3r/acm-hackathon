import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'slide' | 'fade' | 'scale';
  showLoadingState?: boolean;
  loadingDuration?: number;
}

// Enhanced page transition variants - define inline without Variants type
const pageVariants = {
  default: {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  },
  slide: {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -100,
    },
  },
  fade: {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  },
  scale: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.1,
    },
  },
};

// ... existing code ...

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4,
};

const loadingTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.2,
};

// Loading spinner component
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={loadingTransition}
    className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent"
    />
  </motion.div>
);

const PageTransition = ({
  children,
  className = '',
  variant = 'default',
  showLoadingState = false,
  loadingDuration = 300,
}: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(pageVariants[variant]);

  // Handle loading state
  useEffect(() => {
    if (showLoadingState) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration);

      return () => clearTimeout(timer);
    }
    // Return undefined for the case when showLoadingState is false
    return undefined;
  }, [location.pathname, showLoadingState, loadingDuration]);

  // Update variant when prop changes
  useEffect(() => {
    setCurrentVariant(pageVariants[variant] || pageVariants.default);
  }, [variant]);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingSpinner />}</AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={currentVariant}
          transition={pageTransition}
          className={className}
          style={{ willChange: 'transform, opacity' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
