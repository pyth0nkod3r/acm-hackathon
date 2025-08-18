import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Camera,
  Music,
  Palette,
  Gamepad2,
  Brush,
  Globe,
  ArrowRight,
  Target,
  Lightbulb,
  Code,
  Plus,
  Check,
  Sparkles,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

interface Challenge {
  id: number;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image: string;
  keyProblem: string;
  solutionsSought: string;
  technologyExamples: string;
  color: string;
  challengeArea: string;
}

const Challenges = () => {
  useDocumentTitle('Creative Categories - Africa Creative Market Hackathon');
  const navigate = useNavigate();
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'FilmTech',
      icon: Camera,
      image: '/assets/img/challenges/filmtech.jpg',
      keyProblem:
        'Limited access to production tools, distribution challenges, and audience engagement barriers in African film and TV industry.',
      solutionsSought:
        'Digital production platforms, streaming solutions, audience analytics tools, and content monetization systems.',
      technologyExamples:
        'AI-powered editing tools, blockchain for rights management, VR/AR for immersive storytelling, mobile-first streaming platforms.',
      color: 'from-red-500 to-red-600',
      challengeArea: 'FilmTech',
    },
    {
      id: 2,
      title: 'MusicTech',
      icon: Music,
      image: '/assets/img/challenges/musictech.jpg',
      keyProblem:
        'Complex royalty tracking, limited artist-fan engagement, and fragmented music distribution across Africa.',
      solutionsSought:
        'Streaming platforms, royalty management systems, artist-fan engagement tools, and music discovery platforms.',
      technologyExamples:
        'Blockchain for royalty distribution, AI for music recommendation, mobile payment integration, social music platforms.',
      color: 'from-blue-500 to-blue-600',
      challengeArea: 'MusicTech',
    },
    {
      id: 3,
      title: 'FashionTech',
      icon: Palette,
      image: '/assets/img/challenges/fashiontech.jpg',
      keyProblem:
        'Supply chain opacity, limited e-commerce adoption, and design automation challenges in African fashion industry.',
      solutionsSought:
        'E-commerce platforms, supply chain transparency tools, design automation software, and sustainable fashion solutions.',
      technologyExamples:
        'AR/VR for virtual try-ons, blockchain for supply chain tracking, AI for trend prediction, mobile commerce platforms.',
      color: 'from-pink-500 to-pink-600',
      challengeArea: 'FashionTech',
    },
    {
      id: 4,
      title: 'Gaming & Animation',
      icon: Gamepad2,
      image: '/assets/img/challenges/gaming.jpg',
      keyProblem:
        'Limited African-themed content, educational gaming gaps, and interactive storytelling opportunities in gaming and animation.',
      solutionsSought:
        'African-themed games, educational content platforms, interactive storytelling tools, and animation production software.',
      technologyExamples:
        'Unity/Unreal Engine development, AI for character animation, mobile gaming platforms, VR/AR educational content.',
      color: 'from-green-500 to-green-600',
      challengeArea: 'Gaming & Animation',
    },
    {
      id: 5,
      title: 'Art & NFT Innovation',
      icon: Brush,
      image: '/assets/img/challenges/art-nft.jpg',
      keyProblem:
        'Limited digital art ownership verification, gallery accessibility, and artist financing opportunities in African art market.',
      solutionsSought:
        'Blockchain-based art ownership platforms, digital galleries, artist financing tools, and NFT marketplaces.',
      technologyExamples:
        'Blockchain for provenance tracking, AI for art authentication, digital gallery platforms, crowdfunding for artists.',
      color: 'from-purple-500 to-purple-600',
      challengeArea: 'Art & NFT Innovation',
    },
    {
      id: 6,
      title: 'Cultural Heritage & Tourism',
      icon: Globe,
      image: '/assets/img/challenges/heritage.jpg',
      keyProblem:
        'Limited access to cultural experiences, heritage preservation challenges, and tourism engagement opportunities.',
      solutionsSought:
        'AR/VR cultural tours, heritage preservation platforms, immersive tourism experiences, and cultural education tools.',
      technologyExamples:
        'VR/AR for virtual tours, AI for cultural content curation, mobile apps for heritage sites, 360-degree cultural experiences.',
      color: 'from-orange-500 to-orange-600',
      challengeArea: 'Cultural Heritage & Tourism',
    },
    {
      id: 7,
      title: 'Creative AI Applications',
      icon: Sparkles,
      image: '/assets/img/challenges/creative-ai.jpg',
      keyProblem:
        'Limited AI tools for creative processes, scriptwriting assistance, design automation, and sound engineering in African creative industries.',
      solutionsSought:
        'AI tools for scriptwriting, design automation, sound engineering, and creative content generation.',
      technologyExamples:
        'AI for script analysis, machine learning for design, AI-powered sound mixing, natural language processing for creative writing.',
      color: 'from-indigo-500 to-indigo-600',
      challengeArea: 'Creative AI Applications',
    },
  ];

  const challengeThemes = [
    'FilmTech',
    'MusicTech',
    'FashionTech',
    'Gaming & Animation',
    'Art & NFT Innovation',
    'Cultural Heritage & Tourism',
    'Creative AI Applications',
  ];

  const handleChallengeToggle = (challengeArea: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challengeArea)
        ? prev.filter(area => area !== challengeArea)
        : [...prev, challengeArea]
    );
  };

  const handleApplyWithChallenges = () => {
    // Navigate to application page with selected challenges as URL params
    const params = new URLSearchParams();
    if (selectedChallenges.length > 0) {
      params.set('challenges', selectedChallenges.join(','));
    }
    navigate(`/application?${params.toString()}`);
  };

  const isChallengeSelected = (challengeArea: string) => {
    return selectedChallenges.includes(challengeArea);
  };

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
              Creative Economy Categories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-purple-200 max-w-3xl mx-auto mb-8"
            >
              Seven innovative categories driving Africa's creative economy
              transformation through technology and innovation
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
              <span>Creative Categories</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Challenge Selection Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Select Your Challenge Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the creative economy categories that interest you most.
                You can select multiple areas to work on during the hackathon.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {challengeThemes.map((theme, index) => (
              <ScrollAnimation
                key={theme}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChallengeToggle(theme)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    isChallengeSelected(theme)
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isChallengeSelected(theme)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isChallengeSelected(theme) ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Plus className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {selectedChallenges.length}/7
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {theme}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Innovative solutions for Africa's creative industries
                  </p>
                </motion.button>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeIn">
            <div className="text-center">
              <Button
                onClick={handleApplyWithChallenges}
                size="lg"
                disabled={selectedChallenges.length === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                Apply with Selected Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Detailed Challenges Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Challenge Details
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore each creative economy category in detail and understand
                the problems we're solving
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-12">
            {challenges.map((challenge, index) => (
              <ScrollAnimation
                key={challenge.id}
                animation={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
                delay={index * 0.1}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div
                        className={`w-24 h-24 bg-gradient-to-br ${challenge.color} rounded-full flex items-center justify-center`}
                      >
                        <challenge.icon className="h-12 w-12 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${challenge.color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-lg">
                            {challenge.id}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {challenge.title}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-600" />
                            Key Problem
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {challenge.keyProblem}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            Solutions We're Seeking
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {challenge.solutionsSought}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Code className="h-5 w-5 text-blue-600" />
                            Technology Examples
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {challenge.technologyExamples}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          onClick={() =>
                            handleChallengeToggle(challenge.challengeArea)
                          }
                          variant={
                            isChallengeSelected(challenge.challengeArea)
                              ? 'default'
                              : 'outline'
                          }
                          className={`${
                            isChallengeSelected(challenge.challengeArea)
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                          }`}
                        >
                          {isChallengeSelected(challenge.challengeArea) ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Select This Category
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Innovate Africa's Creative Economy?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Choose your challenge areas and start building solutions that
                will transform Africa's creative industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleApplyWithChallenges}
                  size="lg"
                  disabled={selectedChallenges.length === 0}
                  className="bg-white text-purple-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Link to="/about">
                    Learn More
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

export default Challenges;
