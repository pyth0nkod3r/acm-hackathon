/**
 * Component prop interfaces
 */

import type { ReactNode } from 'react';
import type {
  NavigationItem,
  SocialLink,
  ContactInfo,
  BreadcrumbItem,
} from './navigation';
import type { FormError } from './forms';

// Layout Components
export interface HeaderProps {
  isScrolled: boolean;
  currentPath: string;
  navigationItems: NavigationItem[];
}

export interface FooterProps {
  socialLinks: SocialLink[];
  contactInfo: ContactInfo;
}

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

// Animation Components
export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export interface ScrollAnimationProps {
  children: ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  threshold?: number;
}

// Form Components
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface SelectFieldProps extends Omit<FormFieldProps, 'type'> {
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}

export interface TextareaFieldProps extends Omit<FormFieldProps, 'type'> {
  rows?: number;
  maxLength?: number;
}

export interface FileUploadProps {
  name: string;
  accept?: string;
  maxSize?: number; // in bytes
  onFileSelect: (file: File | null) => void;
  error?: string;
  className?: string;
}

// Notification Components
export interface NotificationProps {
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  duration?: number;
  onClose: () => void;
}

export interface NotificationError {
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  duration?: number;
}

// Navigation Components
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

// Loading Components
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

// Error Components
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorDisplayProps {
  error: FormError;
  className?: string;
}
