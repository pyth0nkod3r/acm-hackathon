import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { PrizeSection } from '../components/home/PrizeSection';
import { ProblemStatementSection } from '../components/home/ProblemStatementSection';
import { SolutionVisionSection } from '../components/home/SolutionVisionSection';
import { TeamRolesSection } from '../components/home/TeamRolesSection';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      <ProblemStatementSection /> {/* New section */}
      <SolutionVisionSection /> {/* New section */}
      {/* Team Roles Section */}
      <TeamRolesSection />
      {/* Prize Information Section */}
      <PrizeSection />
      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
};

export default Home;
