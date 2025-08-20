import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollDetection } from '../../hooks/useScrollDetection';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { MobileNavigation } from './MobileNavigation';
import type { NavigationItem } from '../../types/navigation';
import { cn } from '../../lib/utils';
import logo from '@/assets/img/logo/logo.png';

interface HeaderProps {
  className?: string;
}

// Phase 1, 2 & 3 navigation items - implemented pages
const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/', isActive: false },
  { label: 'About', href: '/about', isActive: false },
  { label: 'Challenges', href: '/challenges', isActive: false },
  { label: 'Schedule', href: '/schedule', isActive: false },
  { label: 'Awards & Judging', href: '/awards', isActive: false },
  { label: 'Gallery', href: '/gallery', isActive: false },
  { label: 'Highlights', href: '/highlights', isActive: false },
  { label: 'Mentors & Judges', href: '/partners', isActive: false },
  { label: 'Application', href: '/application', isActive: false },
  { label: 'Contact', href: '/contact', isActive: false },
];

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const isScrolled = useScrollDetection(50);
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      id="navigation"
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/90 backdrop-blur-md shadow-sm',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            isMobile ? 'h-14' : isTablet ? 'h-16' : 'h-20'
          )}
        >
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
              className={cn(
                'flex items-center space-x-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md',
                isTouchDevice ? 'min-h-[44px]' : ''
              )}
              aria-label="ACM Hackathon - Go to homepage"
            >
              <img
                src={logo}
                alt="ACM Logo"
                className={cn(
                  'object-contain transition-all duration-300',
                  isMobile ? 'h-8 w-8' : isTablet ? 'h-10 w-10' : 'h-12 w-12'
                )}
              />
              <span
                className={cn(
                  'font-bold transition-colors duration-300',
                  isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl',
                  'text-gray-900',
                  isMobile ? 'hidden sm:inline' : ''
                )}
              >
                {isMobile ? 'ACM' : 'ACM Hackathon'}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-3 xl:space-x-4"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'relative px-2 py-2 text-sm font-medium transition-all duration-300',
                    'touch-manipulation rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    isActiveRoute(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  )}
                  aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <MobileNavigation
            navigationItems={navigationItems}
            isScrolled={isScrolled}
          />
        </div>
      </div>
    </motion.header>
  );
};
