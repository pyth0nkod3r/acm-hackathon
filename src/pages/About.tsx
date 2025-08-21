import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Palette,
  Music,
  Camera,
  Gamepad2,
  Brush,
  Globe,
  ArrowRight,
  Target,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';

const About = () => {
  const objectives = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'Build solutions that push boundaries in tech + creativity, fostering groundbreaking approaches to creative industry challenges.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description:
        'Bring together developers, designers, storytellers, artists, business minds, and industry leaders for cross-disciplinary innovation.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: TrendingUp,
      title: 'Market-Ready Solutions',
      description:
        'Encourage prototypes that can evolve into sustainable startups with real market potential and scalability.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Target,
      title: 'Capacity Building',
      description:
        "Upskill participants through workshops, mentoring, and networking to enhance Africa's creative economy talent pool.",
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Award,
      title: 'Investment Opportunities',
      description:
        'Connect winners with investors, accelerators, and grants to transform innovative ideas into successful businesses.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description:
        "Position Africa's creative industries on the global stage through innovative technology solutions and market-ready products.",
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const acmTimeline = [
    {
      year: '2020',
      title: 'Africa Creative Market Foundation',
      description:
        "Establishment of ACM to support and promote Africa's creative industries and cultural heritage.",
    },
    {
      year: '2022',
      title: 'Creative Economy Initiative',
      description:
        "Launch of programs to foster innovation and entrepreneurship in Africa's creative sectors.",
    },
    {
      year: '2024',
      title: 'Technology Integration Focus',
      description:
        'Strategic shift towards leveraging technology to enhance creative industry capabilities and market access.',
    },
    {
      year: '2025',
      title: 'Innovation Hackathon',
      description:
        'First Africa Creative Market Hackathon to drive technological innovation in creative industries.',
    },
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
              <span className="text-purple-200 text-lg">About</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About The Hackathon
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-purple-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>About ACM Hackathon</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slideLeft">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Palette className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ACM
                    </h3>
                    <p className="text-gray-600">Creative Economy Innovation</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400/20 rounded-full blur-xl"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideRight">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Overview of the Hackathon
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The Africa Creative Market Hackathon 2025 is a landmark
                    event aimed at harnessing Africa's creative and
                    technological talent to develop innovative solutions that
                    solve challenges in the creative economy.
                  </p>
                  <p>
                    With Africa's rich cultural heritage and growing creative
                    industries, innovation in creative technology is crucial to
                    unlocking economic opportunities and positioning African
                    creators on the global stage.
                  </p>
                  <p>
                    This hackathon is not just a competition—it's an opportunity
                    for Africa's brightest creative and technical minds to come
                    together and develop transformative solutions that will
                    shape the future of film, fashion, music, arts, gaming,
                    design, and related industries.
                  </p>
                  <p>
                    By tackling critical challenges in these creative sectors,
                    the hackathon will help Africa build a more vibrant,
                    sustainable, and globally competitive creative economy,
                    empowering creators and businesses alike to fully
                    participate in the global creative market.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </section>

      {/* Key Objectives Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Key Goals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The Africa Creative Market Hackathon is designed to achieve the
                following objectives:
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <ScrollAnimation
                key={objective.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${objective.color} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <objective.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {objective.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {objective.description}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* ACM Timeline Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ACM Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the evolution of Africa Creative Market and its
                commitment to creative industry innovation
              </p>
            </div>
          </ScrollAnimation>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>

            <div className="space-y-12">
              {acmTimeline.map((item, index) => (
                <ScrollAnimation
                  key={item.year}
                  animation={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
                  delay={index * 0.2}
                >
                  <div
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                        <div className="text-2xl font-bold text-purple-600 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Creative Categories Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Creative Economy Focus Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seven innovative categories driving Africa's creative economy
                transformation
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'FilmTech',
                description:
                  'Tools for production, distribution, or audience engagement in film/TV.',
                color: 'from-red-500 to-red-600',
              },
              {
                icon: Music,
                title: 'MusicTech',
                description:
                  'Platforms for streaming, royalties tracking, artist–fan engagement.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Palette,
                title: 'FashionTech',
                description:
                  'E-commerce, design automation, supply chain transparency.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: Gamepad2,
                title: 'Gaming & Animation',
                description:
                  'African-themed games, educational content, interactive storytelling.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Brush,
                title: 'Art & NFT Innovation',
                description:
                  'Blockchain-based art ownership, galleries, or artist financing.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Globe,
                title: 'Cultural Heritage & Tourism',
                description:
                  'AR/VR tours, heritage preservation, immersive experiences.',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((category, index) => (
              <ScrollAnimation
                key={category.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.title}
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

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a]">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Shape Africa's Creative Future?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join the Africa Creative Market Hackathon and be part of the
                innovation that will transform Africa's creative industries.
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
                  <Link to="/challenges">
                    View Categories
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

export default About;
