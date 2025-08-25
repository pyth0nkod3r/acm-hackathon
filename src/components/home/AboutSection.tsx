import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const AboutSection = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <span className="text-[#4a5f8a] font-semibold text-lg mb-4 block">
                Welcome to ACM Hackathon 2025
              </span>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  A 4-day innovation challenge dedicated to solving Africa's
                  music and film distribution challenges. This exciting event
                  brings together developers, designers, storytellers, artists,
                  business minds and industry leaders to create market-ready
                  solutions that can evolve into sustainable startups.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Key Stats - Updated 4-column layout */}
          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { stat: '4 Days', label: 'of innovation', icon: '📅' },
                { stat: '₦10M', label: 'Prize', icon: '🏆' },
                { stat: 'Top Partners', label: 'ACM, ASF, AWS', icon: '🤝' },
                { stat: 'Tech + Creatives', label: 'united', icon: '💡' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold text-[#4a5f8a] mb-1">
                    {item.stat}
                  </div>
                  <div className="text-gray-600 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" delay={0.2}>
            <div className="relative max-w-4xl mx-auto">
              {/* YouTube Video iframe */}
              <div className="relative bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/WkrOTKTGEEI?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0&mute=1&enablejsapi=1&origin=https://www.youtube.com"
                    title="Africa's Creative Economy Vision"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={e => {
                      // Prevent thumbnail preloading by setting a custom poster
                      const iframe = e.target as HTMLIFrameElement;
                      if (iframe.contentWindow) {
                        iframe.contentWindow.postMessage(
                          '{"event":"command","func":"pauseVideo","args":""}',
                          '*'
                        );
                      }
                    }}
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400/30 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-6 h-6 bg-pink-300/40 rounded-full"></div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Vision & Mission - Updated section */}
          <div className="grid lg:grid-cols-2 gap-12 mt-20">
            {/* Vision Section */}
            <ScrollAnimation animation="slideLeft">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Catalyze Africa-led innovation for scalable distribution of
                  music and film content across the continent and beyond.
                </p>
                <div className="bg-gradient-to-r from-[#a8b82a]/20 to-[#4a5f8a]/20 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Key Focus Areas:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Scalable distribution infrastructure</li>
                    <li>• Cross-border content access</li>
                    <li>• Revenue optimization</li>
                    <li>• Talent discovery and promotion</li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
            {/* Mission Section */}
            <ScrollAnimation animation="slideRight">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Empower Innovators',
                      description:
                        'Provide tools, resources, and mentorship to creative entrepreneurs',
                    },
                    {
                      title: 'Build Collaborative Platforms',
                      description:
                        'Create ecosystems that connect creators, distributors, and consumers',
                    },
                    {
                      title: 'Drive Real-World Implementation',
                      description:
                        'Ensure solutions are practical and market-ready',
                    },
                  ].map((goal, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#4a5f8a] pl-4"
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
    </>
  );
};
