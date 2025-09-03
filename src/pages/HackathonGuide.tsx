import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Download,
  ArrowRight,
  FileText,
  // Users,
  // Trophy,
  Calendar,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

const HackathonGuide = () => {
  useDocumentTitle('Hackathon Guide - ACM Hackathon 2025');

  const guideSections = [
    {
      title: 'Challenges',
      content: 'Complete guide to the 4-day innovation challenge',
      icon: FileText,
      link: '/challenges',
    },
    // {
    //   title: 'Team Formation',
    //   content: 'How to build your winning team of 2-5 members',
    //   icon: Users,
    // },
    // {
    //   title: 'Judging Criteria',
    //   content: 'Understanding how your solution will be evaluated',
    //   icon: Trophy,
    // },
    {
      title: 'Schedule & Timeline',
      content: 'Detailed breakdown of the hackathon phases',
      icon: Calendar,
      link: '/schedule',
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
      <section className="relative py-20 bg-gradient-to-br from-[#4a5f8a] to-[#a8b82a] text-white overflow-hidden">
        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-[#c2d72f] text-lg">Download</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hackathon Guide 2025
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-100 max-w-3xl mx-auto mb-8"
            >
              Everything you need to know about participating in Africa's
              premier music and film distribution hackathon
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-[#c2d72f] hover:bg-[#c2d72f]/80 text-black font-semibold"
                asChild
              >
                <a href="/ACM 2025 Hackathon Plan.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Complete Guide (PDF)
                </a>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Guide Sections */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {guideSections.map((section, index) => (
              <ScrollAnimation
                key={section.title}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-lg flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{section.content}</p>
                  {section.link && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to={section.link}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a]">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the Innovation Journey?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Download the complete guide and start preparing for Africa's
                most exciting hackathon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#4a5f8a] hover:bg-gray-100"
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
                  className="border-white text-white hover:bg-white hover:text-[#4a5f8a]"
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

export default HackathonGuide;
