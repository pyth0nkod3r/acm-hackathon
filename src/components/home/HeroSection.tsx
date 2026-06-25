import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Container } from '../layout';
import { Button } from '../ui';
import { CountdownTimer } from '../common/CountdownTimer';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { cn } from '../../lib/utils';

import { flierImages } from '@/assets/img/flier';
import type { SocialLink } from '../../types/navigation';
import {
  FaLinkedinIn as Linkedin,
  FaInstagram as Instagram,
  FaXTwitter as Twitter,
  FaFacebookF as Facebook,
} from 'react-icons/fa6';

export const HeroSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const socialLinks: SocialLink[] = [
    {
      platform: 'Facebook',
      icon: 'Facebook',
      url: 'https://www.facebook.com/share/1AaY2WVCUc/',
      label: 'Facebook',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/company/africacmglobal/',
      icon: 'Linkedin',
      label: 'Follow us on LinkedIn',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/africacreativemarketglobal?igsh=MTd6c29oOHJyYjRrcQ==',
      icon: 'Instagram',
      label: 'Follow us on Instagram',
    },
    {
      platform: 'Twitter',
      url: 'https://x.com/africacmglobal?t=vTOk0X1V7BXUchthxRbZpw&s=09',
      icon: 'Twitter',
      label: 'Follow us on Twitter',
    },
  ];
  const getSocialIcon = (iconName: string) => {
    const iconMap = {
      Linkedin: Linkedin,
      Instagram: Instagram,
      Twitter: Twitter,
      Facebook: Facebook,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent;
  };

  return (
    <section
      className={cn(
        'relative text-white overflow-hidden',
        isMobile ? '-mt-14' : isTablet ? '-mt-16' : '-mt-20'
      )}
    >
      {/* Background - Updated with video support */}
      <div className="absolute inset-0">
        {/* Video Background */}
        <div className="w-full h-full">
          {/* Video background with fallback */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/video/videobg.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gradient-to-r from-black/40 to-black/40 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a5f8a]/80 to-[#a8b82a]/80 opacity-60"></div>
            </div>
          </video>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center">
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
                className="flex items-center gap-2 text-gray-300 mb-4"
              >
                <Calendar className="h-5 w-5" />
                <span className="text-lg">
                  29 June - 2 July, 2026
                </span>
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
                Connected Play: Hacking Africa's Future Through{' '}
                <span className="text-[#c2d72f]">Low-Bandwidth Esports Infrastructure</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={cn(
                  'text-gray-300 mb-6',
                  isMobile ? 'text-lg' : 'text-xl md:text-2xl'
                )}
              >
                Join developers, designers, gaming strategists, and entrepreneurs to build the future of esports and connectivity in Africa
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-gray-300 mb-8"
              >
                <MapPin className="h-5 w-5" />
                <span className="text-lg">
                  Mulungushi International Conference Center, 8025 Great East Rd, Lusaka, Zambia
                </span>
              </motion.div>

              {/* Countdown Timer - Update target date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8 lg:ml-[-190px]"
              >
                <CountdownTimer targetDate="2026-06-29T00:00:00" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-200 mb-8 max-w-lg"
              >
                Harness Africa's creative and technological talent to develop innovative solutions for low-data gaming, esports, and connectivity. Compete. Innovate. Create!
              </motion.p>

              {/* Action Buttons - Update CTA */}
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
                    'bg-[#c2d72f] hover:bg-[#c2d72f]/60 transition-colors text-black font-semibold touch-manipulation',
                    isTouchDevice ? 'min-h-[44px]' : ''
                  )}
                >
                  <Link to="/registration">Apply Now</Link>
                </Button>
                {/* <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={cn(
                    'border-white text-white hover:bg-white hover:text-black touch-manipulation',
                    isTouchDevice ? 'min-h-[44px]' : ''
                  )}
                >
                  <Link to="/hackathon-guide">
                    Download Hackathon Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button> */}
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
                    'text-gray-300',
                    isMobile ? 'text-sm' : 'text-base'
                  )}
                >
                  Follow Us On:
                </span>
                <div className="flex gap-4 mt-6">
                  {socialLinks.map(social => {
                    const IconComponent = getSocialIcon(social.icon);
                    return (
                      <a
                          key={social.label}
                        href={social.url}
                        className={cn(
                          'text-gray-400 hover:text-[#c2d72f] transition-colors touch-manipulation',
                          isTouchDevice
                            ? 'p-2 min-h-[44px] min-w-[44px] flex items-center justify-center'
                            : ''
                        )}
                        aria-label={social.label}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Illustration - Update content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative z-10 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(194,215,47,0.15)]">
                <img
                  src={flierImages.acmHackathon2026}
                  alt="ACM Hackathon 2026 - Connectivity & Esports Innovation"
                  className="w-full h-auto rounded-xl shadow-inner"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#c2d72f]/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#c2d72f]/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
};
