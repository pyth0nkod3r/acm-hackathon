import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const PrizeSection = () => {
  // Remove the split prizes array and update to single grand prize
  const grandPrize = {
    position: 'Grand Prize',
    amount: '₦10,000,000',
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
  };

  const additionalPrizes = [
    'AWS Credits for Cloud Infrastructure',
    'Mentorship from Industry Experts',
    'Incubation Program Access (ASF + CcHub)',
    'Funding Opportunities & Investor Connections',
    'ACM Platform Exposure & Marketing Support',
    'Legal & IP Guidance for Startups',
  ];

  const postHackathonSupport = [
    {
      title: 'Investor-ready exposure',
      description: 'Connect with potential investors and partners',
      icon: '💼',
    },
    {
      title: 'Technical & business incubation',
      description: 'ASF + CCHub incubation programs',
      icon: '🚀',
    },
    {
      title: 'AWS cloud infrastructure',
      description: 'Cloud credits and technical support',
      icon: '☁️',
    },
    {
      title: 'ACM platform exposure',
      description: 'Showcase on Africa Creative Market platform',
      icon: '🌟',
    },
    {
      title: 'Legal & IP guidance',
      description: 'Professional legal support for startups',
      icon: '⚖️',
    },
    {
      title: 'Road to market acceleration',
      description: 'Market entry and scaling support',
      icon: '📈',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#d4e05a]/20">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prize Pool & Incentives
            </h2>
          </div>
        </ScrollAnimation>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-1 gap-8 mb-16">
          <ScrollAnimation animation="slideUp">
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${grandPrize.bgColor} rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#a8b82a]/30`}
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${grandPrize.color} rounded-full flex items-center justify-center shadow-lg`}
              >
                <grandPrize.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${grandPrize.textColor} mb-2`}>
                {grandPrize.position}
              </h3>
              <div
                className={`text-3xl font-bold ${grandPrize.textColor} mb-4`}
              >
                {grandPrize.amount}
              </div>
              <p className="text-gray-600">
                Plus mentorship and incubation opportunities
              </p>
            </motion.div>
          </ScrollAnimation>
        </div>

        {/* Additional Prizes */}
        <ScrollAnimation animation="fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Non-Cash Incentives
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalPrizes.map((prize, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#6b7ba3]/30 to-[#6b7ba3]/30 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">{prize}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Post-Hackathon Support - New section */}
        <ScrollAnimation animation="fadeIn" delay={0.3}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Post-Hackathon Support
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postHackathonSupport.map((support, index) => (
                <motion.div
                  key={support.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">{support.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {support.title}
                  </h4>
                  <p className="text-gray-600">{support.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
};
