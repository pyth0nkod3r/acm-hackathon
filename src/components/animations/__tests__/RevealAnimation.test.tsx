/**
 * RevealAnimation component tests
 * Tests reveal animations with different directions and configurations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevealAnimation from '../RevealAnimation';

// Mock framer-motion
const mockUseInView = vi.fn();
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      variants,
      initial,
      animate,
      transition,
      ...props
    }: any) => (
      <div
        data-testid="reveal-animation"
        data-initial={initial}
        data-animate={animate}
        data-variants={JSON.stringify(variants)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
  useInView: mockUseInView,
}));

describe('RevealAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseInView.mockReturnValue(false);
  });

  it('renders children correctly', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default direction (up)', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants).toEqual({
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, x: 0, y: 0 },
    });
  });

  it('applies up direction correctly', () => {
    render(
      <RevealAnimation direction="up">
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, y: 50 });
    expect(variants.visible).toEqual({ opacity: 1, x: 0, y: 0 });
  });

  it('applies down direction correctly', () => {
    render(
      <RevealAnimation direction="down">
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, y: -50 });
    expect(variants.visible).toEqual({ opacity: 1, x: 0, y: 0 });
  });

  it('applies left direction correctly', () => {
    render(
      <RevealAnimation direction="left">
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, x: 50 });
    expect(variants.visible).toEqual({ opacity: 1, x: 0, y: 0 });
  });

  it('applies right direction correctly', () => {
    render(
      <RevealAnimation direction="right">
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, x: -50 });
    expect(variants.visible).toEqual({ opacity: 1, x: 0, y: 0 });
  });

  it('applies custom distance', () => {
    render(
      <RevealAnimation direction="up" distance={100}>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, y: 100 });
  });

  it('shows hidden state when not in view', () => {
    mockUseInView.mockReturnValue(false);

    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    expect(animationDiv.getAttribute('data-animate')).toBe('hidden');
  });

  it('shows visible state when in view', () => {
    mockUseInView.mockReturnValue(true);

    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    expect(animationDiv.getAttribute('data-animate')).toBe('visible');
  });

  it('applies custom delay', () => {
    render(
      <RevealAnimation delay={0.5}>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const transition = JSON.parse(
      animationDiv.getAttribute('data-transition') || '{}'
    );

    expect(transition.delay).toBe(0.5);
  });

  it('applies custom duration', () => {
    render(
      <RevealAnimation duration={1.2}>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const transition = JSON.parse(
      animationDiv.getAttribute('data-transition') || '{}'
    );

    expect(transition.duration).toBe(1.2);
  });

  it('applies custom className to motion div', () => {
    render(
      <RevealAnimation className="custom-class">
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    expect(animationDiv).toHaveClass('custom-class');
  });

  it('uses default transition easing', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const transition = JSON.parse(
      animationDiv.getAttribute('data-transition') || '{}'
    );

    expect(transition.ease).toEqual([0.25, 0.46, 0.45, 0.94]);
  });

  it('passes correct threshold to useInView', () => {
    render(
      <RevealAnimation threshold={0.5}>
        <div>Test content</div>
      </RevealAnimation>
    );

    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), {
      amount: 0.5,
      once: true,
    });
  });

  it('passes triggerOnce to useInView', () => {
    render(
      <RevealAnimation triggerOnce={false}>
        <div>Test content</div>
      </RevealAnimation>
    );

    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), {
      amount: 0.1,
      once: false,
    });
  });

  it('applies overflow hidden by default', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const wrapper =
      screen.getByText('Test content').parentElement?.parentElement;
    expect(wrapper).toHaveClass('overflow-hidden');
  });

  it('can disable overflow hidden', () => {
    render(
      <RevealAnimation overflow={false}>
        <div>Test content</div>
      </RevealAnimation>
    );

    const wrapper =
      screen.getByText('Test content').parentElement?.parentElement;
    expect(wrapper).not.toHaveClass('overflow-hidden');
  });

  it('applies willChange style for performance', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const wrapper =
      screen.getByText('Test content').parentElement?.parentElement;
    expect(wrapper).toHaveStyle({ willChange: 'transform' });
  });

  it('uses default values when no props provided', () => {
    render(
      <RevealAnimation>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const transition = JSON.parse(
      animationDiv.getAttribute('data-transition') || '{}'
    );

    expect(transition.duration).toBe(0.6);
    expect(transition.delay).toBe(0);
    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), {
      amount: 0.1,
      once: true,
    });
  });

  it('handles invalid direction gracefully', () => {
    render(
      <RevealAnimation direction={'invalid' as any}>
        <div>Test content</div>
      </RevealAnimation>
    );

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    // Should fall back to default (up)
    expect(variants.hidden).toEqual({ opacity: 0, y: 50 });
  });

  it('handles multiple children correctly', () => {
    render(
      <RevealAnimation direction="left" distance={75}>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </RevealAnimation>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, x: 75 });
  });

  it('handles complex nested content', () => {
    render(
      <RevealAnimation
        direction="down"
        delay={0.3}
        duration={0.8}
        distance={80}
      >
        <div className="content-wrapper">
          <h2>Title</h2>
          <p>Description text</p>
          <button>Action Button</button>
        </div>
      </RevealAnimation>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();

    const animationDiv = screen.getByTestId('reveal-animation');
    const variants = JSON.parse(
      animationDiv.getAttribute('data-variants') || '{}'
    );
    const transition = JSON.parse(
      animationDiv.getAttribute('data-transition') || '{}'
    );

    expect(variants.hidden).toEqual({ opacity: 0, y: -80 });
    expect(transition.duration).toBe(0.8);
    expect(transition.delay).toBe(0.3);
  });

  it('creates proper wrapper structure', () => {
    render(
      <RevealAnimation>
        <div data-testid="child">Test content</div>
      </RevealAnimation>
    );

    const child = screen.getByTestId('child');
    const motionDiv = child.parentElement;
    const wrapper = motionDiv?.parentElement;

    expect(wrapper).toHaveClass('overflow-hidden');
    expect(wrapper).toHaveStyle({ willChange: 'transform' });
    expect(motionDiv).toHaveAttribute('data-testid', 'reveal-animation');
  });

  it('applies custom threshold correctly', () => {
    render(
      <RevealAnimation threshold={0.8}>
        <div>Test content</div>
      </RevealAnimation>
    );

    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), {
      amount: 0.8,
      once: true,
    });
  });
});
