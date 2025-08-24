import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SolutionVisionSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const solutions = [
    {
      title: 'Multi-layered Distribution Ecosystem',
      description:
        'Comprehensive platform connecting creators, distributors, and consumers across multiple channels',
      icon: '🌐',
      features: [
        'Content aggregation',
        'Multi-platform distribution',
        'Analytics dashboard',
      ],
    },
    {
      title: 'Mobile-first & Low-bandwidth Optimized',
      description:
        "Solutions designed for Africa's mobile-first users and varying internet conditions",
      icon: '📱',
      features: [
        'Offline capabilities',
        'Data compression',
        'Progressive loading',
      ],
    },
    {
      title: 'Secure Content Protection + Smart Contracts',
      description:
        'Blockchain-based rights management and automated royalty distribution',
      icon: '🔒',
      features: [
        'Digital rights management',
        'Automated payments',
        'Transparent tracking',
      ],
    },
    {
      title: 'Monetization Tools',
      description: 'Diverse revenue streams for creators and distributors',
      icon: '💎',
      features: [
        'Subscription models',
        'Pay-per-view',
        'Advertising integration',
      ],
    },
    {
      title: 'AI-powered Discovery Engine',
      description: 'Intelligent content recommendation and talent discovery',
      icon: '🤖',
      features: ['Content matching', 'Trend analysis', 'Audience insights'],
    },
    {
      title: 'Integrated Community + Insights',
      description: 'Social features and data-driven decision making',
      icon: '👥',
      features: ['Creator communities', 'Performance metrics', 'Market trends'],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What You'll Build
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {solutions.length}
              </span>
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Carousel Content */}
          <ScrollAnimation animation="fadeIn">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#a8b82a]/10 to-[#4a5f8a]/10 rounded-2xl p-8 border border-[#a8b82a]/20"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {solutions[currentSlide].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {solutions[currentSlide].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {solutions[currentSlide].description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {solutions[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 text-center shadow-sm"
                  >
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimation>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#a8b82a]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
