import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Users,
  Target,
  Lightbulb,
  Code,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

const Awards = () => {
  useDocumentTitle('Awards & Judging - Africa Creative Market Hackathon');

  // Replace main prizes with grand prize from PrizeSection
  const grandPrize = {
    position: 'Grand Prize',
    amount: '₦10,000,000',
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    description: 'Grand Prize Winner',
  };

  // Replace category awards with solutions from SolutionVisionSection
  const categoryAwards = [
    {
      category: 'Multi-layered Distribution Ecosystem',
      description:
        'Comprehensive platform connecting creators, distributors, and consumers across multiple channels',
      icon: Code,
      color: 'from-red-500 to-red-600',
    },
    {
      category: 'Mobile-first & Low-bandwidth Optimized',
      description:
        "Solutions designed for Africa's mobile-first users and varying internet conditions",
      icon: Code,
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'Secure Content Protection + Smart Contracts',
      description:
        'Blockchain-based rights management and automated royalty distribution',
      icon: Code,
      color: 'from-green-500 to-green-600',
    },
    {
      category: 'Monetization Tools',
      description: 'Diverse revenue streams for creators and distributors',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
    },
    {
      category: 'AI-powered Discovery Engine',
      description: 'Intelligent content recommendation and talent discovery',
      icon: Code,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      category: 'Integrated Community + Insights',
      description: 'Social features and data-driven decision making',
      icon: Code,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  // Replace judging criteria with content from pitch scoring text file
  const judgingCriteria = [
    {
      criterion: 'Problem Relevance',
      weight: '15%',
      description:
        'Does the solution directly address a key challenge in African music or film distribution?',
      icon: Target,
      color: 'from-red-500 to-red-600',
      details: [
        '13–15 pts: Problem is clearly defined and solution addresses a major industry pain point.',
        '9–12 pts: Somewhat relevant but lacks depth in problem articulation.',
        '0–8 pts: Weak or unclear understanding of the problem.',
      ],
    },
    {
      criterion: 'Innovation & Creativity',
      weight: '20%',
      description:
        'How original, creative, or technically inventive is the solution?',
      icon: Lightbulb,
      color: 'from-yellow-500 to-yellow-600',
      details: [
        '17–20 pts: Extremely innovative with a novel approach or tech twist.',
        '12–16 pts: Moderately creative with some unique elements.',
        '0–11 pts: Commonplace or heavily replicated idea.',
      ],
    },
    {
      criterion: 'Technical Execution',
      weight: '20%',
      description:
        'How well was the idea executed in the demo? Is the prototype functional or technically promising?',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      details: [
        '17–20 pts: Fully functional MVP or robust prototype.',
        '12–16 pts: Partial or demo-ready build with solid backend logic.',
        '0–11 pts: Conceptual pitch with minimal to no execution.',
      ],
    },
    {
      criterion: 'Business Model & Scalability',
      weight: '15%',
      description:
        'Is there a viable path to monetization and growth across Africa?',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      details: [
        '13–15 pts: Clear and realistic monetization model + regional expansion potential.',
        '9–12 pts: Some monetization thinking but not fully worked out.',
        '0–8 pts: No clear model or unrealistic scalability plan.',
      ],
    },
    {
      criterion: 'User Experience & Design',
      weight: '10%',
      description:
        'Is the solution easy to use, visually appealing, and appropriate for the African context?',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      details: [
        '9–10 pts: Excellent UI/UX for both urban and low-bandwidth audiences.',
        '6–8 pts: Fair interface with room for UX improvement.',
        '0–5 pts: Confusing or poorly designed user flow.',
      ],
    },
    {
      criterion: 'Impact & Sustainability',
      weight: '20%',
      description:
        'What is the potential impact of this solution on creators, consumers, and the industry?',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      details: [
        '17–20 pts: High potential to create economic or cultural transformation at scale.',
        '12–16 pts: Some clear benefits with medium impact.',
        '0–11 pts: Limited or unclear benefit.',
      ],
    },
  ];

  // Replace additionalIncentives with additionalPrizes from PrizeSection
  const additionalPrizes = [
    'AWS Credits for Cloud Infrastructure',
    'Mentorship from Industry Experts',
    'Incubation Program Access (ASF + CcHub)',
    'Funding Opportunities & Investor Connections',
    'ACM Platform Exposure & Marketing Support',
    'Legal & IP Guidance for Startups',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-pink-800/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-purple-200 text-lg">Hackathon</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Awards & Judging
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-8"
            >
              World-class judging criteria and over ₦10 million in prizes and
              incentives
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-purple-200"
            >
              <Link to="/" className="hover:text-white transition-colors ">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-5">Awards & Judging</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Main Prizes Section - Updated to show only grand prize */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prize Pool
              </h2>
              {/* <p className="text-xl text-gray-600 mb-4">
                Compete for the grand prize
              </p>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ₦10,000,000
              </div> */}
            </div>
          </ScrollAnimation>

          <div className="flex justify-center mb-5">
            <ScrollAnimation animation="slideUp">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className={`${grandPrize.bgColor} rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 max-w-md`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${grandPrize.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <grandPrize.icon className="h-10 w-10 text-white" />
                </div>
                <h3
                  className={`text-2xl font-bold ${grandPrize.textColor} mb-2`}
                >
                  {grandPrize.position}
                </h3>
                <div
                  className={`text-3xl font-bold ${grandPrize.textColor} mb-4`}
                >
                  {grandPrize.amount}
                </div>
                <p className="text-gray-600 mb-4">{grandPrize.description}</p>
                <p className="text-sm text-gray-500">
                  Plus mentorship and incubation opportunities
                </p>
              </motion.div>
            </ScrollAnimation>
          </div>
        </Container>
      </section>

      {/* Category Awards Section - Updated with solutions */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What You'll Build
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Special recognition for excellence in each creative economy
                solution category
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryAwards.map((category, index) => (
              <ScrollAnimation
                key={category.category}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6 flex-shrink-0`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {category.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Judging Criteria Section - Updated with pitch scoring criteria */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Judging Criteria
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each pitch will be evaluated by a panel of expert judges across
                six core categories, with a maximum of 100 points
              </p>
              <p className="text-lg text-gray-500 mt-2">
                All teams will present their solutions in a 5-minute demo
                followed by 2 minutes of Q&A
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {judgingCriteria.map((criterion, index) => (
              <ScrollAnimation
                key={criterion.criterion}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${criterion.color} rounded-lg flex items-center justify-center`}
                    >
                      <criterion.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {criterion.weight}
                      </div>
                      <div className="text-sm text-gray-500">Weight</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {criterion.criterion}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    {criterion.description}
                  </p>
                  <div className="space-y-2 mt-auto">
                    {criterion.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Bonus Points Section */}
          <ScrollAnimation animation="fadeIn" delay={0.3}>
            <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Bonus Points (up to 5 points)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="text-gray-700">
                    Use of emerging technologies (e.g. blockchain, AI/ML, smart
                    contracts)
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-gray-700">
                    Consideration of data privacy and copyright compliance
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">🤝</div>
                  <p className="text-gray-700">
                    Inclusion of underserved user groups (e.g. rural creatives,
                    disabled users)
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Additional Incentives Section - Updated with additional prizes from PrizeSection */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Non-Cash Incentives
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond the prize money, winners receive valuable opportunities
                and support
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalPrizes.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-lime-600/100 to-lime-800/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium">{prize}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a]">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Compete for These Prizes?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join the Africa Creative Market Hackathon and compete for
                world-class recognition and valuable opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Link to="/application">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Link to="/schedule">
                    View Schedule
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </section>
    </motion.div>
  );
};

export default Awards;
