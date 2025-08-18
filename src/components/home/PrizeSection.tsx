import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Award, Medal, ArrowRight } from 'lucide-react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Button } from '../ui';

export const PrizeSection = () => {
  const prizes = [
    {
      position: '1st Place',
      amount: '₦5,000,000',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
    },
    {
      position: '2nd Place',
      amount: '₦3,000,000',
      icon: Award,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800',
    },
    {
      position: '3rd Place',
      amount: '₦2,000,000',
      icon: Medal,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
    },
  ];

  const additionalPrizes = [
    'Incubation/Acceleration Program Access',
    'Office/Co-working Space (6-12 months)',
    'Cloud Credits (AWS, Google Cloud, Azure)',
    'Free Creative Software Licenses',
    'Investor Introduction Sessions',
    'Media Publicity & ACM Exhibition Slots',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prize Pool & Incentives
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Compete for over ₦10 Million in prizes and valuable opportunities
            </p>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              ₦10,000,000+
            </div>
          </div>
        </ScrollAnimation>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <ScrollAnimation
              key={prize.position}
              animation="slideUp"
              delay={index * 0.2}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className={`${prize.bgColor} rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${prize.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <prize.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${prize.textColor} mb-2`}>
                  {prize.position}
                </h3>
                <div className={`text-3xl font-bold ${prize.textColor} mb-4`}>
                  {prize.amount}
                </div>
                <p className="text-gray-600">
                  Plus mentorship and incubation opportunities
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
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
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
