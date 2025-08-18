import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export interface UsePageTransitionOptions {
  enableLoading?: boolean;
  loadingDuration?: number;
  onRouteChange?: (pathname: string) => void;
}

export interface PageTransitionState {
  isLoading: boolean;
  isTransitioning: boolean;
  currentPath: string;
  previousPath: string | null;
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
  const {
    enableLoading = false,
    loadingDuration = 300,
    onRouteChange,
  } = options;

  const location = useLocation();
  const [state, setState] = useState<PageTransitionState>({
    isLoading: false,
    isTransitioning: false,
    currentPath: location.pathname,
    previousPath: null,
  });

  // Handle route changes
  useEffect(() => {
    const previousPath = state.currentPath;

    setState(prev => ({
      ...prev,
      previousPath,
      currentPath: location.pathname,
      isTransitioning: true,
    }));

    if (enableLoading) {
      setState(prev => ({ ...prev, isLoading: true }));

      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isLoading: false }));
      }, loadingDuration);

      return () => clearTimeout(timer);
    }

    onRouteChange?.(location.pathname);
  }, [
    location.pathname,
    enableLoading,
    loadingDuration,
    onRouteChange,
    state.currentPath,
  ]);

  const setTransitioning = useCallback((isTransitioning: boolean) => {
    setState(prev => ({ ...prev, isTransitioning }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  return {
    ...state,
    setTransitioning,
    setLoading,
  };
};
