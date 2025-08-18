import { useState, useEffect } from 'react';

export interface TouchCapabilities {
  isTouchDevice: boolean;
  hasHover: boolean;
  supportsTouch: boolean;
  maxTouchPoints: number;
}

export const useTouchDevice = (): TouchCapabilities => {
  const [touchCapabilities, setTouchCapabilities] = useState<TouchCapabilities>(
    {
      isTouchDevice: false,
      hasHover: true,
      supportsTouch: false,
      maxTouchPoints: 0,
    }
  );

  useEffect(() => {
    const checkTouchCapabilities = () => {
      const supportsTouch =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const maxTouchPoints = navigator.maxTouchPoints || 0;

      // Consider it a touch device if it supports touch and doesn't have hover
      const isTouchDevice = supportsTouch && !hasHover;

      setTouchCapabilities({
        isTouchDevice,
        hasHover,
        supportsTouch,
        maxTouchPoints,
      });
    };

    checkTouchCapabilities();

    // Listen for changes in hover capability (useful for hybrid devices)
    const hoverQuery = window.matchMedia('(hover: hover)');
    const handleHoverChange = () => checkTouchCapabilities();

    hoverQuery.addEventListener('change', handleHoverChange);

    return () => {
      hoverQuery.removeEventListener('change', handleHoverChange);
    };
  }, []);

  return touchCapabilities;
};
