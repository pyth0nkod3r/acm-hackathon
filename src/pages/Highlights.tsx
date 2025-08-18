import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight,
  Play,
  Quote,
  Star,
  Trophy,
  Users,
  Target,
  Lightbulb,
  Calendar,
  MapPin,
  Award,
  Code,
  Presentation,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  team: string;
  category: string;
  impact: string;
  image: string;
  videoUrl?: string;
}

interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  stats: string;
  color: string;
}

const Highlights = () => {
  useDocumentTitle('Highlights - AfCFTA Digital Trade Protocol Hackathon');

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Sample testimonials - in a real app, these would come from an API
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Amara Okafor',
      role: 'Lead Developer',
      company: 'TradeFlow Solutions',
      image: '/assets/img/testimonials/participant-1.jpg',
      quote:
        'The AfCFTA Hackathon was a transformative experience. The mentorship and resources provided helped us develop a solution that is now being piloted across three African countries.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Kwame Asante',
      role: 'Product Manager',
      company: 'Digital Trade Hub',
      image: '/assets/img/testimonials/participant-2.jpg',
      quote:
        'The collaborative environment and expert guidance made this hackathon exceptional. We not only built a great product but also formed lasting partnerships.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Fatima Al-Rashid',
      role: 'UX Designer',
      company: 'AfriTech Innovations',
      image: '/assets/img/testimonials/participant-3.jpg',
      quote:
        'The focus on real-world impact and the quality of mentorship exceeded my expectations. This hackathon truly bridges the gap between innovation and implementation.',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Mwangi',
      role: 'Blockchain Developer',
      company: 'CryptoTrade Africa',
      image: '/assets/img/testimonials/participant-4.jpg',
      quote:
        'The technical challenges were perfectly balanced with business considerations. The judges provided invaluable feedback that shaped our final solution.',
      rating: 5,
    },
  ];

  // Sample success stories
  const successStories: SuccessStory[] = [
    {
      id: 1,
      title: 'Digital Trade Documentation Platform',
      description:
        'A blockchain-based platform that streamlines cross-border trade documentation, reducing processing time by 70%.',
      team: 'Team TradeFlow',
      category: 'Digital Infrastructure',
      impact: '3 countries piloting, 500+ businesses onboarded',
      image: '/assets/img/success/trade-platform.jpg',
      videoUrl: 'https://example.com/demo1',
    },
    {
      id: 2,
      title: 'SME Trade Enablement App',
      description:
        'Mobile-first solution connecting small businesses with cross-border opportunities and financing options.',
      team: 'Team ConnectAfrica',
      category: 'SME Empowerment',
      impact: '1,200+ SMEs registered, $2M in trade facilitated',
      image: '/assets/img/success/sme-app.jpg',
      videoUrl: 'https://example.com/demo2',
    },
    {
      id: 3,
      title: 'Logistics Optimization Engine',
      description:
        'AI-powered system that optimizes shipping routes and reduces logistics costs for African traders.',
      team: 'Team LogiSmart',
      category: 'Supply Chain',
      impact: '25% cost reduction, 40% faster delivery',
      image: '/assets/img/success/logistics.jpg',
    },
  ];

  // Key highlights and achievements
  const highlights: Highlight[] = [
    {
      id: 1,
      title: 'Innovative Solutions',
      description:
        'Groundbreaking digital trade solutions developed during the hackathon',
      icon: Lightbulb,
      stats: '15+ Solutions',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 2,
      title: 'Diverse Participation',
      description:
        'Participants from across Africa representing various expertise areas',
      icon: Users,
      stats: '50 Participants',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 3,
      title: 'Industry Impact',
      description:
        'Solutions with real-world applications and measurable impact',
      icon: Target,
      stats: '8 Countries',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 4,
      title: 'Success Rate',
      description:
        'High percentage of solutions moving to implementation phase',
      icon: Trophy,
      stats: '80% Success',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
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
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/20 to-blue-800/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-green-200 text-lg">Success Stories</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Event Highlights
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-green-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>Highlights</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Celebrating Innovation and Impact
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the remarkable achievements, breakthrough solutions,
                and inspiring stories from the AfCFTA Digital Trade Protocol
                Hackathon. Witness how innovation is transforming Africa's
                digital trade landscape.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Key Highlights Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Key Achievements
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Measurable impact and outstanding results from our hackathon
                participants
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <ScrollAnimation
                key={highlight.id}
                animation="fadeIn"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${highlight.color} rounded-full flex items-center justify-center`}
                  >
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {highlight.stats}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600">{highlight.description}</p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Innovative solutions that are making a real difference in
                African digital trade
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-16">
            {successStories.map((story, index) => (
              <ScrollAnimation
                key={story.id}
                animation="fadeIn"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image/Video */}
                  <div
                    className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative`}
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          {story.videoUrl ? (
                            <div className="relative">
                              <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                              <p className="text-gray-600 text-sm">
                                Watch Demo
                              </p>
                            </div>
                          ) : (
                            <div>
                              <Presentation className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                              <p className="text-gray-600 text-sm">
                                {story.title}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} bg-white rounded-2xl p-8 shadow-lg border border-gray-200`}
                  >
                    <div className="mb-6">
                      <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {story.category}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
                        {story.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {story.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700">
                          <strong>Team:</strong> {story.team}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">
                          <strong>Impact:</strong> {story.impact}
                        </span>
                      </div>
                    </div>

                    {story.videoUrl && (
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Demo
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Participant Testimonials
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from the innovators who made the hackathon a success
              </p>
            </div>
          </ScrollAnimation>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200"
            >
              <div className="text-center">
                <Quote className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role} at{' '}
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Goals Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fadeIn">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Impact Goals Achieved
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drive Innovation for AfCFTA Implementation
                      </h3>
                      <p className="text-gray-600">
                        Successfully developed 15+ innovative solutions directly
                        addressing AfCFTA digital trade protocol challenges.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Build Tech-Enabled Ecosystem
                      </h3>
                      <p className="text-gray-600">
                        Created a network of developers, trade experts, and
                        innovators working towards seamless trade across Africa.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Empower Participants
                      </h3>
                      <p className="text-gray-600">
                        Equipped participants with skills and connections to
                        contribute to digital trade policy and practice
                        improvements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" delay={0.2}>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      80%
                    </div>
                    <div className="text-sm text-gray-600">
                      Solutions in Implementation
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      8
                    </div>
                    <div className="text-sm text-gray-600">
                      Countries Impacted
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      1.2K+
                    </div>
                    <div className="text-sm text-gray-600">SMEs Onboarded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      $2M+
                    </div>
                    <div className="text-sm text-gray-600">
                      Trade Facilitated
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <ScrollAnimation animation="fadeIn">
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Your Own Success Story?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join the next AfCFTA Digital Trade Protocol Hackathon and be
                part of Africa's digital trade transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0"
                >
                  <Link to="/application">
                    Apply for Next Event
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
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

export default Highlights;
