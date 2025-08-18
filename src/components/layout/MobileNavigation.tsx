import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import type { NavigationItem } from '../../types/navigation';

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
  isScrolled: boolean;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigationItems,
  isScrolled,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const location = useLocation();
  const { isTouchDevice } = useTouchDevice();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Group navigation items for better mobile organization
  const groupedItems = {
    main: navigationItems.filter(item =>
      ['/', '/about', '/challenges', '/application'].includes(item.href)
    ),
    event: navigationItems.filter(item =>
      ['/schedule', '/awards', '/gallery', '/highlights'].includes(item.href)
    ),
    connect: navigationItems.filter(item =>
      ['/partners', '/contact'].includes(item.href)
    ),
  };

  return (
    <div className={className}>
      {/* Mobile Menu Button */}
      <motion.button
        className={cn(
          'lg:hidden p-3 rounded-lg transition-all duration-300',
          'touch-manipulation', // Optimize for touch
          isTouchDevice ? 'min-h-[44px] min-w-[44px]' : '', // Minimum touch target size
          isScrolled
            ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200'
            : 'text-white hover:text-blue-300 hover:bg-white/10 active:bg-white/20'
        )}
        onClick={toggleMobileMenu}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="px-6 space-y-6">
                    {/* Main Navigation */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Main
                      </h3>
                      <div className="space-y-1">
                        {groupedItems.main.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              onClick={closeMobileMenu}
                              className={cn(
                                'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 touch-manipulation',
                                'min-h-[44px]', // Minimum touch target
                                isActiveRoute(item.href)
                                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100'
                              )}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Event Information */}
                    <div>
                      <button
                        onClick={() => toggleSection('event')}
                        className="flex items-center justify-between w-full text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 touch-manipulation"
                      >
                        <span>Event Info</span>
                        {expandedSections.has('event') ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSections.has('event') && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-1 overflow-hidden"
                          >
                            {groupedItems.event.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                              >
                                <Link
                                  to={item.href}
                                  onClick={closeMobileMenu}
                                  className={cn(
                                    'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 touch-manipulation',
                                    'min-h-[44px]',
                                    isActiveRoute(item.href)
                                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100'
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Connect */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Connect
                      </h3>
                      <div className="space-y-1">
                        {groupedItems.connect.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              onClick={closeMobileMenu}
                              className={cn(
                                'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 touch-manipulation',
                                'min-h-[44px]',
                                isActiveRoute(item.href)
                                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100'
                              )}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      AfCFTA Hackathon 2025
                    </p>
                    <p className="text-xs text-gray-400">
                      May 01 - May 03, 2025
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
