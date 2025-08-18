import type { ReactNode } from 'react';
import {
  motion,
  AnimatePresence,
  type Variants,
  type Easing,
} from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

export interface TransitionConfig {
  duration: number;
  ease: Easing;
  stagger?: number;
}

export interface PageTransitionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?:
    | 'slide-right'
    | 'slide-left'
    | 'slide-up'
    | 'slide-down'
    | 'fade'
    | 'scale'
    | 'rotate';
  config?: Partial<TransitionConfig>;
  enableLoadingState?: boolean;
  loadingComponent?: ReactNode;
  onTransitionStart?: () => void;
  onTransitionComplete?: () => void;
}

// Define the variant type using proper Framer Motion types
type VariantType = Variants;

// Comprehensive transition variants
const transitionVariants: Record<string, VariantType> = {
  'slide-right': {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  },
  'slide-left': {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -100 },
  },
  'slide-down': {
    initial: { opacity: 0, y: -100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 100 },
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    in: { opacity: 1, rotate: 0, scale: 1 },
    out: { opacity: 0, rotate: 10, scale: 0.9 },
  },
};

const defaultConfig: TransitionConfig = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth feel
};

// Enhanced loading component with better animations
const DefaultLoadingComponent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
  >
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="h-10 w-10 rounded-full border-3 border-primary border-t-transparent"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-muted-foreground"
      >
        Loading...
      </motion.p>
    </div>
  </motion.div>
);

const PageTransitionWrapper = ({
  children,
  className = '',
  variant = 'slide-right',
  config = {},
  enableLoadingState = false,
  loadingComponent,
  onTransitionStart,
  onTransitionComplete,
}: PageTransitionWrapperProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionConfig = { ...defaultConfig, ...config };
  const variants =
    transitionVariants[variant] || transitionVariants['slide-right'];

  // Handle loading state on route change
  useEffect(() => {
    if (enableLoadingState) {
      setIsLoading(true);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200); // Short loading state

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location.pathname, enableLoadingState]);

  const handleAnimationStart = useCallback(() => {
    setIsTransitioning(true);
    onTransitionStart?.();
  }, [onTransitionStart]);

  const handleAnimationComplete = useCallback(() => {
    setIsTransitioning(false);
    onTransitionComplete?.();
  }, [onTransitionComplete]);

  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (loadingComponent || <DefaultLoadingComponent />)}
      </AnimatePresence>

      {/* Page transition */}
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => setIsTransitioning(false)}
      >
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={variants!}
          transition={{
            type: 'tween',
            duration: transitionConfig.duration,
            ease: transitionConfig.ease,
          }}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          className={`${className} ${isTransitioning ? 'pointer-events-none' : ''}`}
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransitionWrapper;
