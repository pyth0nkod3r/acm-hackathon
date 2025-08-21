import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  Medal,
  Users,
  Target,
  Lightbulb,
  Code,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Music,
  Globe,
  Sparkles,
  Gamepad2,
  Brush,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

const Awards = () => {
  useDocumentTitle('Awards & Judging - Africa Creative Market Hackathon');

  const mainPrizes = [
    {
      position: '1st Place',
      amount: '₦5,000,000',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      description: 'Grand Prize Winner',
    },
    {
      position: '2nd Place',
      amount: '₦3,000,000',
      icon: Award,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800',
      description: 'Runner Up',
    },
    {
      position: '3rd Place',
      amount: '₦2,000,000',
      icon: Medal,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      description: 'Second Runner Up',
    },
  ];

  const categoryAwards = [
    {
      category: 'FilmTech',
      description: 'Best innovation in film and television technology',
      icon: Code,
      color: 'from-red-500 to-red-600',
    },
    {
      category: 'MusicTech',
      description: 'Outstanding music technology solution',
      icon: Music,
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'FashionTech',
      description: 'Excellence in fashion technology innovation',
      icon: Palette,
      color: 'from-pink-500 to-pink-600',
    },
    {
      category: 'Gaming & Animation',
      description: 'Best gaming or animation solution',
      icon: Gamepad2,
      color: 'from-green-500 to-green-600',
    },
    {
      category: 'Art & NFT Innovation',
      description: 'Most innovative art or NFT solution',
      icon: Brush,
      color: 'from-purple-500 to-purple-600',
    },
    {
      category: 'Cultural Heritage & Tourism',
      description: 'Best cultural heritage or tourism innovation',
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
    },
    {
      category: 'Creative AI Applications',
      description: 'Most innovative AI application in creative industries',
      icon: Sparkles,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const judgingCriteria = [
    {
      criterion: 'Innovation & Creativity',
      weight: '25%',
      description:
        'Originality of concept, uniqueness in approach, and creative problem-solving methodology.',
      icon: Lightbulb,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      criterion: 'Impact Potential',
      weight: '20%',
      description:
        'How well the solution addresses real industry problems and its potential for widespread adoption.',
      icon: Target,
      color: 'from-red-500 to-red-600',
    },
    {
      criterion: 'Technical Execution',
      weight: '20%',
      description:
        'Functionality, performance, code quality, and technical implementation excellence.',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
    },
    {
      criterion: 'Design & User Experience',
      weight: '15%',
      description:
        'Aesthetics, accessibility, intuitive interface, and overall user experience quality.',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
    },
    {
      criterion: 'Business Viability',
      weight: '10%',
      description:
        'Market potential, revenue model, scalability, and long-term sustainability.',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      criterion: 'Presentation & Storytelling',
      weight: '10%',
      description:
        'Clarity, persuasion, demonstration quality, and effective communication of the solution.',
      icon: Users,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const additionalIncentives = [
    'Incubation/Acceleration Program Access',
    'Office/Co-working Space (6-12 months)',
    'Cloud Credits (AWS, Google Cloud, Microsoft Azure)',
    'Free Creative Software Licenses',
    'Investor Introduction Sessions',
    'Media Publicity and ACM Exhibition Slots',
    'Demo Day @ ACM Annual Event',
    '3-6 Months Mentorship Program',
    'Startup Support Package (Legal, Branding, Market Entry)',
    'Progress Monitoring and Impact Tracking',
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
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>Awards & Judging</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Main Prizes Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prize Pool
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Compete for over ₦10 Million in prizes
              </p>
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                ₦10,000,000+
              </div>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mainPrizes.map((prize, index) => (
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
                  <p className="text-gray-600 mb-4">{prize.description}</p>
                  <p className="text-sm text-gray-500">
                    Plus mentorship and incubation opportunities
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Awards Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Category Awards
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Special recognition for excellence in each creative economy
                category
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
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Judging Criteria Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Judging Criteria
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                World-class standards for evaluating innovative solutions in
                Africa's creative economy
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
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
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
                  <p className="text-gray-600 leading-relaxed">
                    {criterion.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Incentives Section */}
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
            {additionalIncentives.map((incentive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-800 font-medium">{incentive}</span>
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
