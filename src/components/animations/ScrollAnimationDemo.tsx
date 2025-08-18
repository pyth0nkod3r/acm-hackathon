import {
  ScrollReveal,
  ScrollTrigger,
  StaggeredReveal,
  ScrollParallax,
  ScrollAnimationWrapper,
} from './index';

const ScrollAnimationDemo = () => {
  return (
    <div className="min-h-screen space-y-32 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Scroll Animation Demo</h1>
        <p className="text-gray-600">
          Scroll down to see various animations in action
        </p>
      </div>

      {/* ScrollReveal Examples */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold text-center">
          ScrollReveal Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="fadeIn" delay={0}>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Fade In</h3>
              <p>This element fades in when it comes into view.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideUp" delay={0.1}>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Slide Up</h3>
              <p>This element slides up from below.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideLeft" delay={0.2}>
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Slide Left</h3>
              <p>This element slides in from the right.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ScrollTrigger Examples */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold text-center">
          ScrollTrigger Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollTrigger
            animation="scaleIn"
            spring={true}
            onAnimationStart={() => console.log('Scale animation started')}
          >
            <div className="bg-red-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Scale In (Spring)</h3>
              <p>This element scales in with spring physics.</p>
            </div>
          </ScrollTrigger>

          <ScrollTrigger animation="rotateIn" duration={0.8}>
            <div className="bg-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Rotate In</h3>
              <p>This element rotates as it appears.</p>
            </div>
          </ScrollTrigger>
        </div>
      </section>

      {/* StaggeredReveal Example */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold text-center">Staggered Animations</h2>

        <StaggeredReveal
          animation="slideUp"
          staggerDelay={0.1}
          containerClassName="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h4 className="font-semibold">Item 1</h4>
            <p>First item</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h4 className="font-semibold">Item 2</h4>
            <p>Second item</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h4 className="font-semibold">Item 3</h4>
            <p>Third item</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h4 className="font-semibold">Item 4</h4>
            <p>Fourth item</p>
          </div>
        </StaggeredReveal>
      </section>

      {/* ScrollParallax Example */}
      <section className="space-y-16 relative">
        <h2 className="text-3xl font-bold text-center">Parallax Effects</h2>

        <div className="relative h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden">
          <ScrollParallax
            speed={0.5}
            direction="up"
            className="absolute inset-0"
          >
            <div className="h-full flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Parallax Element</h3>
                <p>This moves slower than the scroll speed</p>
              </div>
            </div>
          </ScrollParallax>
        </div>
      </section>

      {/* ScrollAnimationWrapper Examples */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold text-center">Advanced Wrapper</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollAnimationWrapper
            animation="bounceIn"
            spring={true}
            debug={true}
            onEnter={() => console.log('Bounce element entered')}
          >
            <div className="bg-pink-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Bounce In</h3>
              <p>This element bounces in with debug info.</p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper
            animation="slideRight"
            distance={100}
            threshold={0.5}
          >
            <div className="bg-teal-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Custom Distance</h3>
              <p>This slides from 100px away at 50% visibility.</p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Multiple threshold example */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold text-center">Multiple Animations</h2>

        <div className="space-y-8">
          {Array.from({ length: 6 }, (_, i) => (
            <ScrollReveal
              key={i}
              animation={
                [
                  'fadeIn',
                  'slideUp',
                  'slideLeft',
                  'slideRight',
                  'scaleIn',
                  'rotateIn',
                ][i] as
                  | 'fadeIn'
                  | 'slideUp'
                  | 'slideLeft'
                  | 'slideRight'
                  | 'scaleIn'
                  | 'rotateIn'
              }
              delay={i * 0.1}
            >
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Animation {i + 1}:{' '}
                  {
                    [
                      'fadeIn',
                      'slideUp',
                      'slideLeft',
                      'slideRight',
                      'scaleIn',
                      'rotateIn',
                    ][i]
                  }
                </h3>
                <p>Each element uses a different animation type.</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="text-center py-16">
        <p className="text-gray-600">
          End of demo - scroll back up to see animations again!
        </p>
      </div>
    </div>
  );
};

export default ScrollAnimationDemo;
