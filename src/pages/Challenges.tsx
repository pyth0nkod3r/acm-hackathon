import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight,
  Target,
  Lightbulb,
  Code,
  Plus,
  Check,
  AlertTriangle,
  TrendingUp,
  Users,
  Globe,
  Shield,
  DollarSign,
  Star,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

interface Problem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  impact: string;
  currentState: string;
  solutionOpportunities: string;
  stakeholders: string[];
}

const ProblemStatement = () => {
  useDocumentTitle('Problem Statement - Africa Creative Market Hackathon');
  const navigate = useNavigate();
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  const problems: Problem[] = [
    {
      id: 1,
      title: 'Fragmented Infrastructure',
      description:
        'Disconnected systems preventing seamless content distribution across Africa',
      icon: '🏗️',
      color: 'from-red-500 to-red-600',
      impact: 'High',
      currentState: 'Multiple isolated platforms with no interoperability',
      solutionOpportunities:
        'Unified distribution networks, API standardization, cross-platform integration',
      stakeholders: [
        'Content Creators',
        'Platform Providers',
        'Consumers',
        'Regulators',
      ],
    },
    {
      id: 2,
      title: 'Last-Mile Access & Affordability',
      description: 'Limited reach to rural areas and high costs for consumers',
      icon: '🌍',
      color: 'from-blue-500 to-blue-600',
      impact: 'Critical',
      currentState: 'Urban-focused services with expensive data costs',
      solutionOpportunities:
        'Offline-first solutions, data compression, community networks, micro-payments',
      stakeholders: [
        'Rural Communities',
        'Telecom Providers',
        'Content Distributors',
        'Government',
      ],
    },
    {
      id: 3,
      title: 'Piracy & Rights Management',
      description:
        'Unauthorized distribution and complex copyright enforcement',
      icon: '🛡️',
      color: 'from-purple-500 to-purple-600',
      impact: 'High',
      currentState: 'Widespread piracy with limited enforcement capabilities',
      solutionOpportunities:
        'Blockchain verification, AI-powered detection, simplified licensing, education campaigns',
      stakeholders: [
        'Artists',
        'Rights Holders',
        'Law Enforcement',
        'Platforms',
      ],
    },
    {
      id: 4,
      title: 'Revenue Leakage',
      description: 'Lost income due to inefficient monetization systems',
      icon: '💰',
      color: 'from-green-500 to-green-600',
      impact: 'Critical',
      currentState: 'Multiple payment gateways with high transaction fees',
      solutionOpportunities:
        'Unified payment systems, micro-transactions, subscription models, revenue analytics',
      stakeholders: [
        'Content Creators',
        'Payment Processors',
        'Platforms',
        'Financial Institutions',
      ],
    },
    {
      id: 5,
      title: 'Limited Visibility for Talent',
      description: 'Emerging artists struggle to reach wider audiences',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
      impact: 'Medium',
      currentState: 'Discovery algorithms favor established artists',
      solutionOpportunities:
        'AI-powered discovery, community curation, mentorship programs, showcase platforms',
      stakeholders: [
        'Emerging Artists',
        'Fans',
        'Industry Professionals',
        'Platforms',
      ],
    },
  ];

  const problemCategories = [
    'Infrastructure',
    'Accessibility',
    'Rights Management',
    'Monetization',
    'Talent Development',
  ];

  const handleProblemToggle = (problemTitle: string) => {
    setSelectedProblems(prev =>
      prev.includes(problemTitle)
        ? prev.filter(title => title !== problemTitle)
        : [...prev, problemTitle]
    );
  };

  const handleApplyWithProblems = () => {
    // Navigate to application page with selected problems as URL params
    const params = new URLSearchParams();
    if (selectedProblems.length > 0) {
      params.set('problems', selectedProblems.join(','));
    }
    navigate(`/application?${params.toString()}`);
  };

  const isProblemSelected = (problemTitle: string) => {
    return selectedProblems.includes(problemTitle);
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
      <section className="relative py-20 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-red-800/20 to-orange-800/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-orange-200 text-lg">Hackathon Focus</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Critical Problems to Solve
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-orange-200 max-w-3xl mx-auto mb-8"
            >
              Five critical pain points in Africa's music and film distribution
              ecosystem that need innovative solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-orange-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>Problem Statement</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Problem Selection Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Select Problems to Address
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the critical problems that you want to focus on during
                the hackathon. You can select multiple areas to work on.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {problemCategories.map((category, index) => (
              <ScrollAnimation
                key={category}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProblemToggle(category)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedProblems.some(problem =>
                      problems.find(p =>
                        p.title.toLowerCase().includes(category.toLowerCase())
                      )
                    )
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedProblems.some(problem =>
                          problems.find(p =>
                            p.title
                              .toLowerCase()
                              .includes(category.toLowerCase())
                          )
                        )
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {selectedProblems.some(problem =>
                        problems.find(p =>
                          p.title.toLowerCase().includes(category.toLowerCase())
                        )
                      ) ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Plus className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {selectedProblems.length}/5
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Critical challenges in Africa's creative industries
                  </p>
                </motion.button>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeIn">
            <div className="text-center">
              <Button
                onClick={handleApplyWithProblems}
                size="lg"
                disabled={selectedProblems.length === 0}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50"
              >
                Apply with Selected Problems
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Detailed Problems Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Problem Analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Deep dive into each critical problem affecting Africa's creative
                economy and the opportunities for innovative solutions
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-12">
            {problems.map((problem, index) => (
              <ScrollAnimation
                key={problem.id}
                animation={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
                delay={index * 0.1}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid lg:grid-cols-2">
                    {/* Icon Section */}
                    <div className="relative h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div
                        className={`w-32 h-32 bg-gradient-to-br ${problem.color} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-6xl">{problem.icon}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${problem.color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-lg">
                            {problem.id}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {problem.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {problem.description}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Impact Level
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                problem.impact === 'Critical'
                                  ? 'bg-red-100 text-red-800'
                                  : problem.impact === 'High'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {problem.impact}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            Current State
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {problem.currentState}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                            Solution Opportunities
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {problem.solutionOpportunities}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-600" />
                            Key Stakeholders
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {problem.stakeholders.map((stakeholder, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {stakeholder}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Button
                          onClick={() => handleProblemToggle(problem.title)}
                          variant={
                            isProblemSelected(problem.title)
                              ? 'default'
                              : 'outline'
                          }
                          className={`${
                            isProblemSelected(problem.title)
                              ? 'bg-orange-600 hover:bg-orange-700'
                              : 'border-orange-600 text-orange-600 hover:bg-orange-50'
                          }`}
                        >
                          {isProblemSelected(problem.title) ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Selected
                            </>
                          ) : (
                            <>
                              <Plus className="mr-2 h-4 w-4" />
                              Select This Problem
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
      <section className="py-20 bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a]">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Solve Africa's Creative Economy Problems?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Choose the problems you want to address and start building
                solutions that will transform Africa's creative industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleApplyWithProblems}
                  size="lg"
                  disabled={selectedProblems.length === 0}
                  className="bg-white text-orange-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <Link to="/challenges">
                    View Challenges
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

export default ProblemStatement;
