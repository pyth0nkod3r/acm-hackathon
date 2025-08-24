import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Container } from '../components/layout';
import { Button } from '../components/ui';

const HackathonGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <section className="py-20 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hackathon Guide 2025
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Everything you need to know about participating in "Distribute
              Africa: Hacking the Future of Music & Film Access"
            </p>
            <Button
              size="lg"
              className="bg-white text-[#4a5f8a] hover:bg-gray-100"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF Guide
            </Button>
          </div>
        </Container>
      </section>

      {/* Guide content sections would go here */}
    </motion.div>
  );
};

export default HackathonGuide;
