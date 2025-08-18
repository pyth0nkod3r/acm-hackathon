/**
 * ARIA live region component for screen reader announcements
 */

import React, { useEffect, useRef } from 'react';

interface AriaLiveRegionProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearDelay?: number;
  className?: string;
}

export const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({
  message,
  priority = 'polite',
  clearDelay = 1000,
  className = '',
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout to clear message after delay
    if (message && clearDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        // Message will be cleared by parent component
      }, clearDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearDelay]);

  if (!message) return null;

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className={`sr-only ${className}`}
      role="status"
    >
      {message}
    </div>
  );
};

/**
 * Global announcement service component
 */
interface GlobalAnnouncerProps {
  announcements: Array<{
    id: string;
    message: string;
    priority: 'polite' | 'assertive';
  }>;
}

export const GlobalAnnouncer: React.FC<GlobalAnnouncerProps> = ({
  announcements,
}) => {
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="false">
      {announcements.map(announcement => (
        <div
          key={announcement.id}
          aria-live={announcement.priority}
          aria-atomic="true"
          role="status"
        >
          {announcement.message}
        </div>
      ))}
    </div>
  );
};

export default AriaLiveRegion;
