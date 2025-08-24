import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const ProblemStatementSection = () => {
  const challenges = [
    {
      title: 'Fragmented Infrastructure',
      description:
        'Disconnected systems preventing seamless content distribution across Africa',
      icon: '🏗️',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Last-Mile Access & Affordability',
      description: 'Limited reach to rural areas and high costs for consumers',
      icon: '🌍',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Piracy & Rights Management',
      description:
        'Unauthorized distribution and complex copyright enforcement',
      icon: '🛡️',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Revenue Leakage',
      description: 'Lost income due to inefficient monetization systems',
      icon: '💰',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Limited Visibility for Talent',
      description: 'Emerging artists struggle to reach wider audiences',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Challenges to Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five critical pain points in Africa's music and film distribution
              ecosystem that need innovative solutions
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <ScrollAnimation
              key={challenge.title}
              animation="slideUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${challenge.color} rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <span className="text-3xl">{challenge.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {challenge.description}
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
};
