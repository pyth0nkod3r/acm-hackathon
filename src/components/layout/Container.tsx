import React from 'react';
// import { useResponsive } from '../../hooks/useResponsive';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4',
  md: 'px-4 lg:px-6',
  lg: 'px-4 lg:px-8',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  padding = 'md',
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};
