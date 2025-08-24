import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight } from 'lucide-react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Button } from '../ui';

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

        {/* Benefits Section */}
        <ScrollAnimation animation="fadeIn" delay={0.3}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Post-Hackathon Support
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Demo Day @ ACM Annual Event',
                  description:
                    'Showcase your solution to a wider audience of industry leaders and investors',
                },
                {
                  title: 'Mentorship Program',
                  description:
                    '3-6 months guidance from industry experts and successful entrepreneurs',
                },
                {
                  title: 'Startup Support Package',
                  description:
                    'Legal, branding, and market entry assistance to launch your business',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeIn" delay={0.4}>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a] hover:from-[#d4e05a] hover:to-[#6b7ba3]"
            >
              <Link to="/awards-judging">
                View Judging Criteria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
};
