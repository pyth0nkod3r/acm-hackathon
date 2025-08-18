import { useState, useRef } from 'react';

export interface SwipeGestureOptions {
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
  deltaThreshold?: number;
}

export interface SwipeGestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: (event: TouchEvent) => void;
  onSwipeEnd?: (event: TouchEvent) => void;
}

export interface SwipeGestureState {
  isSwiping: boolean;
  swipeDirection: 'left' | 'right' | 'up' | 'down' | null;
  swipeDistance: number;
}

export const useSwipeGesture = (
  handlers: SwipeGestureHandlers,
  options: SwipeGestureOptions = {}
) => {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    deltaThreshold = 10,
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeGestureState>({
    isSwiping: false,
    swipeDirection: null,
    swipeDistance: 0,
  });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = null;

    setSwipeState(prev => ({ ...prev, isSwiping: true }));
    handlers.onSwipeStart?.(event);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      event.preventDefault();
    }

    if (!touchStartRef.current) return;

    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Determine swipe direction
    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    setSwipeState(prev => ({
      ...prev,
      swipeDirection: direction,
      swipeDistance: distance,
    }));
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe meets threshold requirements
    if (Math.max(absDeltaX, absDeltaY) > threshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > deltaThreshold) {
          handlers.onSwipeRight?.();
        } else if (deltaX < -deltaThreshold) {
          handlers.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > deltaThreshold) {
          handlers.onSwipeDown?.();
        } else if (deltaY < -deltaThreshold) {
          handlers.onSwipeUp?.();
        }
      }
    }

    setSwipeState({
      isSwiping: false,
      swipeDirection: null,
      swipeDistance: 0,
    });

    handlers.onSwipeEnd?.(event);
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  const attachSwipeListeners = (element: HTMLElement | null) => {
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    element.addEventListener('touchmove', handleTouchMove, {
      passive: !preventDefaultTouchmoveEvent,
    });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  };

  return {
    swipeState,
    attachSwipeListeners,
  };
};
