import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { NavigationItem } from '../../types/navigation';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

interface MobileNavigationProps {
  navigationItems: NavigationItem[];
  isScrolled: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  navigationItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isTouchDevice } = useTouchDevice();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-md text-white hover:text-[#c2d72f] transition-colors duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2"
        whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-black z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">Menu</h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className={cn(
                            'block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2 focus:ring-offset-black',
                            isActiveRoute(item.href)
                              ? 'text-[#c2d72f] bg-gray-800/50'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                          )}
                          aria-current={
                            isActiveRoute(item.href) ? 'page' : undefined
                          }
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-4">
                      ACM Hackathon 2025
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#c2d72f] transition-colors duration-200 p-2 rounded-full hover:bg-gray-800/30 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Follow us on LinkedIn"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#c2d72f] transition-colors duration-200 p-2 rounded-full hover:bg-gray-800/30 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2 focus:ring-offset-black"
                        aria-label="Follow us on Twitter"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.174 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4.97 0 004.604 3.417 4.9 4.9 0 01-2.173.98 4.96 4.96 0 01-1.853-.183 4.97 4." />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
