/**
 * Skip links component for keyboard navigation accessibility
 */

import React from 'react';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
];

export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultLinks,
  className = '',
}) => {
  return (
    <div className={`skip-links ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={e => {
            e.preventDefault();
            const target = document.querySelector(link.href);
            if (target instanceof HTMLElement) {
              // Make target focusable if it's not already
              const originalTabIndex = target.getAttribute('tabindex');
              target.setAttribute('tabindex', '-1');
              target.focus();

              // Restore original tabindex
              setTimeout(() => {
                if (originalTabIndex === null) {
                  target.removeAttribute('tabindex');
                } else {
                  target.setAttribute('tabindex', originalTabIndex);
                }
              }, 100);
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;
