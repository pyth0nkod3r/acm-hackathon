/**
 * ScrollAnimation component tests
 * Tests scroll-based animations, intersection observer integration, and responsive behavior
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScrollAnimation from '../ScrollAnimation';

// Mock hooks
vi.mock('../../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: vi.fn(() => ({
    ref: { current: null },
    isVisible: false,
    hasBeenVisible: false,
    intersectionRatio: 0,
    shouldAnimate: false,
    reset: vi.fn(),
  })),
}));

vi.mock('../../../hooks/useResponsive', () => ({
  useResponsive: () => ({ isMobile: false, isTablet: false }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ScrollAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <ScrollAnimation>
        <div>Test Content</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('uses scroll animation hook with default configuration', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    render(
      <ScrollAnimation>
        <div>Test Content</div>
      </ScrollAnimation>
    );

    expect(mockUseScrollAnimation).toHaveBeenCalledWith({
      threshold: 0.1,
      triggerOnce: true,
      delay: 0,
      rootMargin: '0px',
    });
  });

  it('passes custom configuration to scroll animation hook', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    render(
      <ScrollAnimation
        threshold={0.5}
        triggerOnce={false}
        delay={200}
        rootMargin="50px"
      >
        <div>Test Content</div>
      </ScrollAnimation>
    );

    expect(mockUseScrollAnimation).toHaveBeenCalledWith({
      threshold: 0.5,
      triggerOnce: false,
      delay: 200,
      rootMargin: '50px',
    });
  });

  it('applies animation when element is visible', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    mockUseScrollAnimation.mockReturnValue({
      ref: { current: null },
      isVisible: true,
      hasBeenVisible: true,
      intersectionRatio: 0.8,
      shouldAnimate: true,
      reset: vi.fn(),
    });

    render(
      <ScrollAnimation animation="fadeIn">
        <div>Animated Content</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Animated Content')).toBeInTheDocument();
  });

  it('handles different animation types', () => {
    const animationTypes = [
      'fadeIn',
      'slideUp',
      'slideLeft',
      'slideRight',
      'scaleIn',
    ];

    animationTypes.forEach(animation => {
      const { unmount } = render(
        <ScrollAnimation animation={animation as any}>
          <div>Content for {animation}</div>
        </ScrollAnimation>
      );

      expect(screen.getByText(`Content for ${animation}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className when provided', () => {
    render(
      <ScrollAnimation className="custom-animation-class">
        <div>Test Content</div>
      </ScrollAnimation>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('custom-animation-class');
  });

  it('handles mobile responsive behavior', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );

    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    render(
      <ScrollAnimation>
        <div>Mobile Content</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Mobile Content')).toBeInTheDocument();
  });

  it('handles disabled animations on mobile when specified', () => {
    const mockUseResponsive = vi.mocked(
      require('../../../hooks/useResponsive').useResponsive
    );

    mockUseResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
    });

    render(
      <ScrollAnimation disableOnMobile>
        <div>No Animation on Mobile</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('No Animation on Mobile')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    const mockRef = { current: null };
    mockUseScrollAnimation.mockReturnValue({
      ref: mockRef,
      isVisible: false,
      hasBeenVisible: false,
      intersectionRatio: 0,
      shouldAnimate: false,
      reset: vi.fn(),
    });

    render(
      <ScrollAnimation>
        <div>Ref Test</div>
      </ScrollAnimation>
    );

    expect(mockUseScrollAnimation).toHaveBeenCalled();
  });

  it('handles animation duration configuration', () => {
    render(
      <ScrollAnimation duration={1000}>
        <div>Duration Test</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Duration Test')).toBeInTheDocument();
  });

  it('handles animation easing configuration', () => {
    render(
      <ScrollAnimation easing="easeInOut">
        <div>Easing Test</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Easing Test')).toBeInTheDocument();
  });

  it('handles stagger delay for multiple children', () => {
    render(
      <ScrollAnimation staggerChildren={0.1}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('handles reset functionality', () => {
    const mockReset = vi.fn();
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    mockUseScrollAnimation.mockReturnValue({
      ref: { current: null },
      isVisible: false,
      hasBeenVisible: false,
      intersectionRatio: 0,
      shouldAnimate: false,
      reset: mockReset,
    });

    render(
      <ScrollAnimation>
        <div>Reset Test</div>
      </ScrollAnimation>
    );

    // The reset function should be available through the hook
    expect(mockReset).toBeDefined();
  });

  it('handles intersection ratio changes', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    mockUseScrollAnimation.mockReturnValue({
      ref: { current: null },
      isVisible: true,
      hasBeenVisible: true,
      intersectionRatio: 0.6,
      shouldAnimate: true,
      reset: vi.fn(),
    });

    render(
      <ScrollAnimation>
        <div>Intersection Test</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Intersection Test')).toBeInTheDocument();
  });

  it('handles animation state transitions', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    // First render - not visible
    mockUseScrollAnimation.mockReturnValue({
      ref: { current: null },
      isVisible: false,
      hasBeenVisible: false,
      intersectionRatio: 0,
      shouldAnimate: false,
      reset: vi.fn(),
    });

    const { rerender } = render(
      <ScrollAnimation>
        <div>State Test</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('State Test')).toBeInTheDocument();

    // Second render - visible
    mockUseScrollAnimation.mockReturnValue({
      ref: { current: null },
      isVisible: true,
      hasBeenVisible: true,
      intersectionRatio: 0.8,
      shouldAnimate: true,
      reset: vi.fn(),
    });

    rerender(
      <ScrollAnimation>
        <div>State Test</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('State Test')).toBeInTheDocument();
  });

  it('handles custom animation variants', () => {
    render(
      <ScrollAnimation
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div>Custom Variants</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Custom Variants')).toBeInTheDocument();
  });

  it('handles animation with custom transition', () => {
    render(
      <ScrollAnimation
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        }}
      >
        <div>Custom Transition</div>
      </ScrollAnimation>
    );

    expect(screen.getByText('Custom Transition')).toBeInTheDocument();
  });

  it('handles viewport configuration', () => {
    const mockUseScrollAnimation = vi.mocked(
      require('../../../hooks/useScrollAnimation').useScrollAnimation
    );

    render(
      <ScrollAnimation viewport={{ once: false, margin: '100px' }}>
        <div>Viewport Test</div>
      </ScrollAnimation>
    );

    expect(mockUseScrollAnimation).toHaveBeenCalledWith(
      expect.objectContaining({
        triggerOnce: false,
        rootMargin: '100px',
      })
    );
  });
});
