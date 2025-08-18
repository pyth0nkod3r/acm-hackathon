import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Container } from '../layout';
import { Button } from '../ui';
import { CountdownTimer } from '../common/CountdownTimer';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

export const HeroSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section
      className={cn(
        'relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 overflow-hidden',
        isMobile ? '-mt-14' : isTablet ? '-mt-16' : '-mt-20' // ADDED
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"></div>

      <Container
        className={cn(
          'relative z-10',
          isMobile ? 'pt-20 pb-12' : isTablet ? 'pt-28 pb-16' : 'pt-32 pb-20'
        )}
      >
        <div
          className={cn(
            'grid items-center',
            isMobile ? 'grid-cols-1 gap-8' : 'lg:grid-cols-2 gap-12'
          )}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-purple-200 mb-4"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-lg">March 15 - March 17, 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                'font-bold mb-6 leading-tight',
                isMobile
                  ? 'text-3xl'
                  : isTablet
                    ? 'text-4xl'
                    : 'text-4xl md:text-6xl'
              )}
            >
              Africa Creative Market{' '}
              <span className="text-yellow-400">Hackathon</span> 2025
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                'text-purple-200 mb-6',
                isMobile ? 'text-lg' : 'text-xl md:text-2xl'
              )}
            >
              – Innovating for Africa's Creative Economy
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-purple-200 mb-8"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-lg">
                Lagos Creative Hub, Victoria Island, Lagos, Nigeria
              </span>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <CountdownTimer targetDate="2025-03-15T00:00:00" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-purple-100 mb-8 max-w-lg"
            >
              Harness Africa's creative and technological talent to develop
              innovative solutions for the creative economy. Compete. Innovate.
              Create!
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={cn(
                'flex gap-4 mb-12',
                isMobile ? 'flex-col' : 'flex-col sm:flex-row'
              )}
            >
              <Button
                asChild
                size="lg"
                className={cn(
                  'bg-yellow-400 text-black hover:bg-yellow-300 font-semibold touch-manipulation',
                  isTouchDevice ? 'min-h-[44px]' : ''
                )}
              >
                <Link to="/application">Apply Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className={cn(
                  'border-white text-white hover:bg-white hover:text-purple-900 touch-manipulation',
                  isTouchDevice ? 'min-h-[44px]' : ''
                )}
              >
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className={cn(
                'flex items-center gap-6',
                isMobile ? 'flex-col gap-4' : 'flex-row'
              )}
            >
              <span
                className={cn(
                  'text-purple-200',
                  isMobile ? 'text-sm' : 'text-base'
                )}
              >
                Follow Us On:
              </span>
              <div className="flex gap-4">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={cn(
                      'text-purple-200 hover:text-white transition-colors touch-manipulation',
                      isTouchDevice
                        ? 'p-2 min-h-[44px] min-w-[44px] flex items-center justify-center'
                        : ''
                    )}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-black">ACM</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Creative Economy Innovation
                </h3>
                <p className="text-purple-200">
                  Transforming Africa's creative industries through technology
                  and innovation
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
