import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showScrollToTop?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showScrollToTop = true,
}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowScrollButton(scrollTop > 300);
    };

    if (showScrollToTop) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    return undefined;
  }, [showScrollToTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <div
        className={cn(
          'flex-1',
          isMobile ? 'pt-14' : isTablet ? 'pt-16' : 'pt-20',
          className
        )}
      >
        {children}
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && showScrollButton && (
          <motion.button
            type="button"
            className={cn(
              'fixed z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              isMobile
                ? 'bottom-4 right-4 w-14 h-14'
                : 'bottom-6 right-6 w-12 h-12',
              isTouchDevice ? 'min-h-[44px] min-w-[44px]' : ''
            )}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={!isTouchDevice ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label="Scroll to top of page"
            title="Scroll to top"
          >
            <ArrowUp className={cn(isMobile ? 'h-6 w-6' : 'h-5 w-5')} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
