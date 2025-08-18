import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-lg mb-4 block">
              Welcome to Africa Creative Market Hackathon 2025
            </span>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                A 3-day innovation challenge dedicated to harnessing Africa's
                creative and technological talent to develop innovative
                solutions that solve challenges in the creative economy. This
                exciting event brings together developers, designers,
                storytellers, artists, business minds, and industry leaders to
                create market-ready solutions that can evolve into sustainable
                startups.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeIn" delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            {/* Video/Image Placeholder */}
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Watch Our Vision</p>
                  <p className="text-sm text-white/80">
                    Learn about the future of Africa's creative economy
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-6 h-6 bg-pink-300/40 rounded-full"></div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Purpose and Key Goals Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          {/* Purpose Section */}
          <ScrollAnimation animation="slideLeft">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Purpose of the Event
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Africa Creative Market Hackathon is designed to spark
                creativity and collaboration in addressing critical challenges
                in Africa's creative economy. By bringing together diverse
                talents from across the continent, the hackathon seeks to solve
                pressing issues in film, fashion, music, arts, gaming, design,
                and related industries.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The solutions created during this event will help pave the way
                for a more vibrant, sustainable, and globally competitive
                creative economy in Africa.
              </p>
            </div>
          </ScrollAnimation>

          {/* Key Goals Section */}
          <ScrollAnimation animation="slideRight">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Goals
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Innovation',
                    description:
                      'Build solutions that push boundaries in tech + creativity.',
                  },
                  {
                    title: 'Collaboration',
                    description:
                      'Bring together developers, designers, storytellers, artists, business minds, and industry leaders.',
                  },
                  {
                    title: 'Market-Ready Solutions',
                    description:
                      'Encourage prototypes that can evolve into sustainable startups.',
                  },
                  {
                    title: 'Capacity Building',
                    description:
                      'Upskill participants through workshops, mentoring, and networking.',
                  },
                  {
                    title: 'Investment Opportunities',
                    description:
                      'Connect winners with investors, accelerators, and grants.',
                  },
                ].map((goal, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 pl-4"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {goal.title}
                    </h4>
                    <p className="text-sm text-gray-600 italic">
                      {goal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </section>
  );
};
