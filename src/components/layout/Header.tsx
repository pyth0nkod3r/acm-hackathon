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
  { label: 'Mentors & Judges', href: '/judges', isActive: false },
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
      className={cn('sticky top-0 z-50 flex bg-black', className)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl flex h-full mx-auto w-full items-center py-4 px-6 md:py-6 md:px-10">
        {/* Desktop Navigation */}
        <div className="hidden w-full items-center justify-between md:flex">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/"
              className={cn(
                'flex items-center space-x-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2 rounded-md',
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
                  'font-bold transition-colors duration-300 text-white',
                  isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'
                )}
              >
                {isMobile ? 'ACM' : 'ACM Hackathon'}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="flex items-center gap-4 lg:gap-6"
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
                    'text-white text-sm relative transition-colors duration-200',
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5',
                    'after:bg-[#c2d72f] after:scale-x-0 after:origin-left',
                    'after:transition-transform after:duration-300',
                    'hover:text-purple-200 hover:after:scale-x-100',
                    isActiveRoute(item.href)
                      ? 'text-[#c2d72f] font-semibold after:scale-x-100'
                      : ''
                  )}
                  aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between w-full z-50">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="ACM Logo"
              className={cn(
                'object-contain',
                isMobile ? 'h-8 w-8' : 'h-10 w-10'
              )}
            />
            <span className="text-white font-bold">
              {isMobile ? 'ACM' : 'ACM Hackathon'}
            </span>
          </Link>

          <MobileNavigation
            navigationItems={navigationItems}
            isScrolled={isScrolled}
          />
        </div>
      </div>
    </motion.header>
  );
};
