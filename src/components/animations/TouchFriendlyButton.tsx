import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

interface TouchFriendlyButtonProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const TouchFriendlyButton: React.FC<TouchFriendlyButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...motionProps
}) => {
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'touch-manipulation', // Optimize for touch
    disabled && 'opacity-50 cursor-not-allowed',
    isTouchDevice && 'min-h-[44px] min-w-[44px]' // Minimum touch target size
  );

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: cn(isMobile ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-sm'),
    md: cn(isMobile ? 'px-6 py-3 text-base' : 'px-4 py-2 text-base'),
    lg: cn(isMobile ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-lg'),
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Optimize animations for touch devices
  const animationProps = isTouchDevice
    ? {
        whileTap: { scale: 0.95 },
        transition: { duration: 0.1 },
        ...motionProps,
      }
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 },
        ...motionProps,
      };

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...animationProps}
    >
      {children}
    </motion.button>
  );
};
