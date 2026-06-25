import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const ProblemStatementSection = () => {
  const challenges = [
    {
      title: 'Expensive Data',
      description:
        'High data costs keep millions of young Africans out of online gaming and esports',
      icon: '💸',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Poor Connectivity',
      description:
        'Inconsistent and weak networks limit access to gaming platforms across the continent',
      icon: '📶',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'High Latency',
      description:
        'Lag and delay make competitive, real-time esports nearly impossible in many regions',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Weak Gaming Infrastructure',
      description:
        'Limited local servers, tournament systems, and community platforms restrict growth',
      icon: '🎮',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Limited Digital Inclusion',
      description:
        'Talented players and developers lack pathways into the gaming economy',
      icon: '🌐',
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
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five critical pain points in Africa's music and film distribution
              ecosystem that need innovative solutions
            </p> */}
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
