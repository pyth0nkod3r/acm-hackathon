/**
 * ScrollAnimation component tests
 * Tests scroll-based animations using the actual ScrollAnimationProps interface.
 *
 * Actual props: children, animation, delay, duration, threshold, triggerOnce,
 *               className, stagger
 * The component uses framer-motion's useInView internally (no custom hook).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScrollAnimation from '../ScrollAnimation';

// ── Mock framer-motion so useInView is controllable ───────────────────────
const mockUseInView = vi.fn((_ref: unknown, _options?: unknown) => false);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style }: any) => (
      <div className={className} style={style} data-testid="scroll-animation">
        {children}
      </div>
    ),
  },
  useInView: (ref: unknown, options?: unknown) => mockUseInView(ref, options),
}));

describe('ScrollAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseInView.mockReturnValue(false);
  });

  // ── Render ────────────────────────────────────────────────────────────
  it('renders children correctly', () => {
    render(
      <ScrollAnimation>
        <div>Test Content</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders wrapper div with data-testid', () => {
    render(
      <ScrollAnimation>
        <div>Test</div>
      </ScrollAnimation>
    );
    expect(screen.getByTestId('scroll-animation')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────────
  it('applies custom className when provided', () => {
    render(
      <ScrollAnimation className="custom-animation-class">
        <div>Test Content</div>
      </ScrollAnimation>
    );
    expect(screen.getByTestId('scroll-animation')).toHaveClass(
      'custom-animation-class'
    );
  });

  it('renders with default animation (fadeIn) without crashing', () => {
    render(
      <ScrollAnimation>
        <div>Default Animation</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Default Animation')).toBeInTheDocument();
  });

  it('handles each named animation type without crashing', () => {
    const animationTypes = [
      'fadeIn',
      'slideUp',
      'slideDown',
      'slideLeft',
      'slideRight',
      'scaleIn',
      'rotateIn',
    ] as const;

    animationTypes.forEach(animation => {
      const { unmount } = render(
        <ScrollAnimation animation={animation}>
          <div>Content for {animation}</div>
        </ScrollAnimation>
      );
      expect(screen.getByText(`Content for ${animation}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('passes threshold to useInView', () => {
    render(
      <ScrollAnimation threshold={0.5}>
        <div>Threshold Test</div>
      </ScrollAnimation>
    );
    expect(mockUseInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ amount: 0.5 })
    );
  });

  it('passes triggerOnce to useInView', () => {
    render(
      <ScrollAnimation triggerOnce={false}>
        <div>TriggerOnce Test</div>
      </ScrollAnimation>
    );
    expect(mockUseInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ once: false })
    );
  });

  it('renders content when isInView is true', () => {
    mockUseInView.mockReturnValue(true);

    render(
      <ScrollAnimation animation="slideUp">
        <div>Visible Content</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Visible Content')).toBeInTheDocument();
  });

  it('renders content when isInView is false (hidden state)', () => {
    mockUseInView.mockReturnValue(false);

    render(
      <ScrollAnimation animation="slideUp">
        <div>Hidden Content</div>
      </ScrollAnimation>
    );
    // Children still render in the DOM, just animated differently
    expect(screen.getByText('Hidden Content')).toBeInTheDocument();
  });

  it('handles delay prop without crashing', () => {
    render(
      <ScrollAnimation delay={300}>
        <div>Delayed</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Delayed')).toBeInTheDocument();
  });

  it('handles duration prop without crashing', () => {
    render(
      <ScrollAnimation duration={1.2}>
        <div>Duration Test</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Duration Test')).toBeInTheDocument();
  });

  it('handles stagger prop without crashing', () => {
    render(
      <ScrollAnimation stagger={0.1}>
        <div>Stagger Test</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Stagger Test')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <ScrollAnimation>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('handles re-render with different animation state', () => {
    mockUseInView.mockReturnValue(false);

    const { rerender } = render(
      <ScrollAnimation>
        <div>State Test</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('State Test')).toBeInTheDocument();

    mockUseInView.mockReturnValue(true);

    rerender(
      <ScrollAnimation>
        <div>State Test</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('State Test')).toBeInTheDocument();
  });

  it('renders with all valid props combined without crashing', () => {
    render(
      <ScrollAnimation
        animation="slideLeft"
        delay={100}
        duration={0.8}
        threshold={0.3}
        triggerOnce={true}
        className="combined-test"
        stagger={0.05}
      >
        <div>All Props</div>
      </ScrollAnimation>
    );
    expect(screen.getByText('All Props')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-animation')).toHaveClass('combined-test');
  });
});
