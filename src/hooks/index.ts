export { useDocumentTitle } from './useDocumentTitle';
export { useScrollDetection } from './useScrollDetection';
export { usePageTransition } from './usePageTransition';
export { useIntersectionObserver } from './useIntersectionObserver';
export {
  useScrollAnimation,
  useScrollProgress,
  useElementScrollProgress,
} from './useScrollAnimation';
export {
  useAdvancedScrollAnimation,
  useScrollElementTracking,
  useMultiThresholdScroll,
} from './useAdvancedScrollAnimation';
export { useFormValidation } from './useFormValidation';
export { useNotification } from './useNotification';
export { useResponsive } from './useResponsive';
export { useSwipeGesture } from './useSwipeGesture';
export { useTouchDevice } from './useTouchDevice';
export {
  useFocusTrap,
  useFocusRestore,
  useKeyboardNavigation,
  useAriaLiveRegion,
  useSkipLinks,
  useReducedMotion,
  useHighContrast,
  useColorScheme,
} from './useAccessibility';

export type {
  UsePageTransitionOptions,
  PageTransitionState,
} from './usePageTransition';
export type {
  UseIntersectionObserverOptions,
  IntersectionObserverEntry,
} from './useIntersectionObserver';
export type {
  ScrollAnimationConfig,
  ScrollAnimationState,
} from './useScrollAnimation';
export type {
  AdvancedScrollAnimationConfig,
  AdvancedScrollAnimationState,
} from './useAdvancedScrollAnimation';
export type {
  UseFormValidationOptions,
  FormValidationState,
} from './useFormValidation';
export type { ResponsiveBreakpoints } from './useResponsive';
export type {
  SwipeGestureOptions,
  SwipeGestureHandlers,
  SwipeGestureState,
} from './useSwipeGesture';
export type { TouchCapabilities } from './useTouchDevice';
