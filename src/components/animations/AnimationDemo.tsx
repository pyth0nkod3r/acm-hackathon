import {
  ScrollAnimation,
  StaggeredScrollAnimation,
  RevealAnimation,
  ScrollProgress,
} from './index';

const AnimationDemo = () => {
  return (
    <div className="min-h-screen space-y-16 p-8">
      <ScrollProgress />

      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center">Animation Demo</h1>

        {/* Basic scroll animations */}
        <div className="space-y-8">
          <ScrollAnimation animation="fadeIn">
            <div className="bg-blue-100 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold">Fade In Animation</h2>
              <p>This element fades in when it comes into view.</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideUp" delay={0.2}>
            <div className="bg-green-100 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold">Slide Up Animation</h2>
              <p>
                This element slides up with a delay when it comes into view.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideLeft" duration={0.8}>
            <div className="bg-purple-100 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold">Slide Left Animation</h2>
              <p>This element slides from the right with a longer duration.</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="scaleIn">
            <div className="bg-yellow-100 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold">Scale In Animation</h2>
              <p>This element scales in when it comes into view.</p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Staggered animations */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Staggered Animations
          </h2>

          <StaggeredScrollAnimation animation="slideUp" staggerDelay={0.15}>
            <div className="bg-red-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Item 1</h3>
              <p>First item in staggered animation</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Item 2</h3>
              <p>Second item in staggered animation</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Item 3</h3>
              <p>Third item in staggered animation</p>
            </div>
          </StaggeredScrollAnimation>
        </div>

        {/* Reveal animations */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Reveal Animations</h2>

          <RevealAnimation direction="up" distance={100}>
            <div className="bg-indigo-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold">Reveal from Bottom</h3>
              <p>
                This content reveals from the bottom with a larger distance.
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="left" delay={0.3}>
            <div className="bg-teal-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold">Reveal from Right</h3>
              <p>This content reveals from the right with a delay.</p>
            </div>
          </RevealAnimation>
        </div>

        {/* Add some spacing for scroll testing */}
        <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">
            Scroll to see more animations above and below
          </p>
        </div>

        <ScrollAnimation animation="rotateIn">
          <div className="bg-cyan-100 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold">Rotate In Animation</h2>
            <p>This element rotates in when it comes into view.</p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default AnimationDemo;
