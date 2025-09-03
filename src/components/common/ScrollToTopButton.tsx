import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useScrollDetection } from '../../hooks';

export interface ScrollToTopButtonProps {
  /**
   * Threshold in pixels to show the button
   * @default 300
   */
  threshold?: number;
  /**
   * Position of the button
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Whether to show the button
   * @default true
   */
  show?: boolean;
  /**
   * Custom scroll behavior
   * @default 'smooth'
   */
  behavior?: ScrollBehavior;
  /**
   * Callback when button is clicked
   */
  onClick?: () => void;
}

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
};

const ScrollToTopButton = ({
  threshold = 300,
  position = 'bottom-right',
  className = '',
  show = true,
  behavior = 'smooth',
  onClick,
}: ScrollToTopButtonProps) => {
  const isScrolled = useScrollDetection(threshold);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(show && isScrolled);
  }, [show, isScrolled]);

  const handleClick = () => {
    onClick?.();
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          onClick={handleClick}
          className={`
            fixed z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg
            hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            transition-colors duration-200 backdrop-blur-sm
            ${positionClasses[position]}
            ${className}
          `}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;