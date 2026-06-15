import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { PrizeSection } from '../components/home/PrizeSection';
import { ProblemStatementSection } from '../components/home/ProblemStatementSection';
import { SolutionVisionSection } from '../components/home/SolutionVisionSection';
import { TeamRolesSection } from '../components/home/TeamRolesSection';
import { WhyEsportsSection } from '../components/home/WhyEsportsSection';
import { PastWinnersSection } from '../components/home/PastWinnersSection';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      {/* Why Esports Section */}
      <WhyEsportsSection />
      {/* Challenges to Solve */}
      <ProblemStatementSection />
      {/* What You'll Build */}
      <SolutionVisionSection />
      {/* Team Roles / Participants Section */}
      <TeamRolesSection />
      {/* Past Winners Recap */}
      <PastWinnersSection />
      {/* Prize Information Section */}
      <PrizeSection />
      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

export default Home;
