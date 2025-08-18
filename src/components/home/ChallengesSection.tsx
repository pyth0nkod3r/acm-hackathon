import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Button } from '../ui';

export const ChallengesSection = () => {
  const challenges = [
    'FilmTech',
    'MusicTech',
    'FashionTech',
    'Gaming & Animation',
    'Art & NFT Innovation',
    'Cultural Heritage & Tourism',
    'Creative AI Applications',
  ];

  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Creative Economy Categories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seven innovative categories driving Africa's creative economy
              transformation
            </p>
          </div>
        </ScrollAnimation>

        {/* Animated Challenge Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [0, -100 * challenges.length] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-8 whitespace-nowrap"
              style={{ width: `${200 * challenges.length}%` }}
            >
              {[...challenges, ...challenges].map((challenge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-8 py-4 min-w-max"
                >
                  <span className="text-lg font-semibold">{challenge}</span>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {challenges.map((challenge, index) => (
            <ScrollAnimation
              key={challenge}
              animation="slideUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {challenge}
                </h3>
                <p className="text-gray-300 text-sm">
                  Innovative solutions for Africa's creative industries
                </p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fadeIn">
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link to="/challenges">
                Explore All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
};
