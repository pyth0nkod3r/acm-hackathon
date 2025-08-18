import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
}

export const MobileCard: React.FC<MobileCardProps> = ({
  children,
  className,
  onClick,
  hoverable = false,
  padding = 'md',
  shadow = 'sm',
  rounded = 'lg',
  border = true,
}) => {
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const paddingClasses = {
    none: '',
    sm: isMobile ? 'p-3' : 'p-4',
    md: isMobile ? 'p-4' : 'p-6',
    lg: isMobile ? 'p-6' : 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const baseClasses = cn(
    'bg-white transition-all duration-200',
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    border && 'border border-gray-200',
    onClick && 'cursor-pointer touch-manipulation',
    onClick && isTouchDevice && 'min-h-[44px]',
    hoverable && !isTouchDevice && 'hover:shadow-md hover:-translate-y-1',
    hoverable && isTouchDevice && 'active:scale-95',
    className
  );

  const animationProps = onClick
    ? {
        whileTap: { scale: 0.98 },
        transition: { duration: 0.1 },
      }
    : {};

  if (onClick) {
    return (
      <motion.div className={baseClasses} onClick={onClick} {...animationProps}>
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};
