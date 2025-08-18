/**
 * Accessibility utility functions
 */

/**
 * Generate a unique ID for accessibility attributes
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ];

  return focusableSelectors.some(selector => element.matches(selector));
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(
    container.querySelectorAll(focusableSelectors)
  ) as HTMLElement[];
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Create screen reader only text
 */
export function createScreenReaderText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'sr-only';
  span.textContent = text;
  return span;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if high contrast mode is enabled
 */
export function isHighContrastMode(): boolean {
  return (
    window.matchMedia('(prefers-contrast: high)').matches ||
    window.matchMedia('(forced-colors: active)').matches
  );
}

/**
 * Get contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return (
      0.2126 * (sRGB[0] || 0) +
      0.7152 * (sRGB[1] || 0) +
      0.0722 * (sRGB[2] || 0)
    );
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);

  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
}

/**
 * Validate form field accessibility
 */
export function validateFieldAccessibility(field: HTMLElement): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for label
  const id = field.getAttribute('id');
  const ariaLabel = field.getAttribute('aria-label');
  const ariaLabelledBy = field.getAttribute('aria-labelledby');

  if (!ariaLabel && !ariaLabelledBy) {
    if (!id || !document.querySelector(`label[for="${id}"]`)) {
      issues.push(
        'Field must have a label, aria-label, or aria-labelledby attribute'
      );
    }
  }

  // Check for required field indication
  const isRequired =
    field.hasAttribute('required') ||
    field.getAttribute('aria-required') === 'true';
  if (isRequired) {
    const hasRequiredIndicator =
      field.getAttribute('aria-label')?.includes('required') ||
      field.getAttribute('aria-describedby');
    if (!hasRequiredIndicator) {
      issues.push(
        'Required fields should be clearly indicated to screen readers'
      );
    }
  }

  // Check for error handling
  const hasError = field.getAttribute('aria-invalid') === 'true';
  if (hasError) {
    const hasErrorDescription = field.getAttribute('aria-describedby');
    if (!hasErrorDescription) {
      issues.push(
        'Fields with errors should have aria-describedby pointing to error message'
      );
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Create accessible button attributes
 */
export function createButtonAttributes(
  label: string,
  options: {
    expanded?: boolean;
    controls?: string;
    describedBy?: string;
    pressed?: boolean;
  } = {}
): Record<string, string> {
  const attributes: Record<string, string> = {
    'aria-label': label,
    type: 'button',
  };

  if (options.expanded !== undefined) {
    attributes['aria-expanded'] = options.expanded.toString();
  }

  if (options.controls) {
    attributes['aria-controls'] = options.controls;
  }

  if (options.describedBy) {
    attributes['aria-describedby'] = options.describedBy;
  }

  if (options.pressed !== undefined) {
    attributes['aria-pressed'] = options.pressed.toString();
  }

  return attributes;
}

/**
 * Create accessible link attributes
 */
export function createLinkAttributes(
  text: string,
  options: {
    external?: boolean;
    download?: boolean;
    describedBy?: string;
  } = {}
): Record<string, string> {
  const attributes: Record<string, string> = {};

  if (options.external) {
    attributes['aria-label'] = `${text} (opens in new window)`;
    attributes['target'] = '_blank';
    attributes['rel'] = 'noopener noreferrer';
  }

  if (options.download) {
    attributes['aria-label'] = `${text} (download)`;
  }

  if (options.describedBy) {
    attributes['aria-describedby'] = options.describedBy;
  }

  return attributes;
}

/**
 * Manage focus for single page applications
 */
export function manageFocusForSPA(pageTitle: string): void {
  // Announce page change to screen readers
  announceToScreenReader(`Navigated to ${pageTitle}`, 'assertive');

  // Focus the main content area or first heading
  const mainContent =
    document.querySelector('main') ||
    document.querySelector('[role="main"]') ||
    document.querySelector('h1');

  if (mainContent instanceof HTMLElement) {
    // Make it focusable temporarily if it's not already
    const originalTabIndex = mainContent.getAttribute('tabindex');
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();

    // Restore original tabindex after focus
    setTimeout(() => {
      if (originalTabIndex === null) {
        mainContent.removeAttribute('tabindex');
      } else {
        mainContent.setAttribute('tabindex', originalTabIndex);
      }
    }, 100);
  }
}
