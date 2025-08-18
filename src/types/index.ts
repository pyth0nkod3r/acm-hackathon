/**
 * Main type definitions export file
 */

// Form types
export type {
  TeamMember,
  RegistrationFormData,
  ContactFormData,
  FormError,
  FormValidationResult,
} from './forms';

// API types
export type {
  APICredentials,
  APIResponse,
  FormSubmissionResponse,
  APIError,
  NetworkError,
  ValidationError,
  ServerError,
  APIErrorType,
} from './api';

// Navigation types
export type {
  NavigationItem,
  SocialLink,
  ContactInfo,
  BreadcrumbItem,
  RouteConfig,
  NavigationState,
} from './navigation';

// Component types
export type {
  HeaderProps,
  FooterProps,
  LayoutProps,
  PageTransitionProps,
  ScrollAnimationProps,
  FormFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
  FileUploadProps,
  NotificationProps,
  NotificationError,
  BreadcrumbProps,
  MobileMenuProps,
  LoadingSpinnerProps,
  LoadingStateProps,
  ErrorDisplayProps,
} from './components';

// Configuration types
export type { AppConfig, EnvironmentConfig, BuildConfig } from './config';

// Error handling types
export type {
  ErrorInfo,
  ErrorBoundaryState,
  ErrorBoundaryProps,
  PageErrorBoundaryProps,
  ErrorFallbackProps,
  ErrorReportData,
  ErrorLoggerConfig,
  ErrorSeverity,
  CategorizedError,
} from './errors';
