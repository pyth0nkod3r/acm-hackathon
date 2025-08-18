import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';

interface MobileOptimizedAnimationProps extends MotionProps {
  children: React.ReactNode;
  disableOnMobile?: boolean;
  mobileAnimation?: MotionProps;
  desktopAnimation?: MotionProps;
}

export const MobileOptimizedAnimation: React.FC<
  MobileOptimizedAnimationProps
> = ({
  children,
  disableOnMobile = false,
  mobileAnimation,
  desktopAnimation,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  // If animations should be disabled on mobile
  if (disableOnMobile && (isMobile || isTouchDevice)) {
    return <>{children}</>;
  }

  // Use mobile-specific animations if provided
  const animationProps =
    isMobile && mobileAnimation ? mobileAnimation : desktopAnimation || props;

  // Reduce motion for touch devices to improve performance
  const optimizedProps = isTouchDevice
    ? {
        ...animationProps,
        transition: {
          ...animationProps.transition,
          duration: (animationProps.transition?.duration || 0.3) * 0.7, // Faster animations
          ease: [0.4, 0, 0.2, 1], // Simpler easing
        },
      }
    : animationProps;

  return <motion.div {...optimizedProps}>{children}</motion.div>;
};
