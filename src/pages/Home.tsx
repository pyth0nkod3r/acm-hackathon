import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ChallengesSection } from '../components/home/ChallengesSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { PrizeSection } from '../components/home/PrizeSection';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      {/* Key Challenges Section */}
      <ChallengesSection />
      {/* Prize Information Section */}
      <PrizeSection />
      {/* Partners Section */}
      <PartnersSection />

      {/* Call to Action Section */}
      <ScrollAnimation animation="fadeIn">
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Innovate Africa's Creative Economy?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join a continental movement to create innovative solutions for
                Africa's creative industries. Compete. Innovate. Create!
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
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </ScrollAnimation>
    </motion.div>
  );
};

export default Home;
