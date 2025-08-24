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
import { ProblemStatementSection } from '../components/home/ProblemStatementSection';
import { SolutionVisionSection } from '../components/home/SolutionVisionSection';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      <ProblemStatementSection /> {/* New section */}
      <SolutionVisionSection /> {/* New section */}
      {/* Key Challenges Section */}
      {/* <ChallengesSection /> */}
      {/* Prize Information Section */}
      <PrizeSection />
      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

export default Home;
