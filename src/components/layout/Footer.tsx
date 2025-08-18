import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import type { SocialLink, ContactInfo } from '../../types/navigation';
import { cn } from '../../lib/utils';

interface FooterProps {
  className?: string;
}

const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: '#',
    icon: 'Linkedin',
    label: 'Follow us on LinkedIn',
  },
  {
    platform: 'Instagram',
    url: '#',
    icon: 'Instagram',
    label: 'Follow us on Instagram',
  },
  {
    platform: 'Twitter',
    url: '#',
    icon: 'Twitter',
    label: 'Follow us on Twitter',
  },
  {
    platform: 'WhatsApp',
    url: '#',
    icon: 'MessageCircle',
    label: 'Contact us on WhatsApp',
  },
];

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Challenges', href: '/challenges' },
  { label: 'Application', href: '/application' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Awards & Judging', href: '/awards-judging' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

const contactInfo: ContactInfo = {
  email: 'info@afcfta-hackathon.org',
  phone: '+234 123 456 7890',
  address: 'AfCFTA Secretariat, Accra, Ghana',
  website: 'www.afcfta-hackathon.org',
};

const getSocialIcon = (iconName: string) => {
  const iconMap = {
    Linkedin: Linkedin,
    Instagram: Instagram,
    Twitter: Twitter,
    MessageCircle: MessageCircle,
  };

  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  return IconComponent || MessageCircle;
};

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  const { isMobile, isTablet } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  return (
    <footer
      id="footer"
      role="contentinfo"
      className={cn('bg-gray-900 text-white', className)}
    >
      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div
          className={cn(
            'container mx-auto px-4 sm:px-6 lg:px-8',
            isMobile ? 'py-12' : isTablet ? 'py-14' : 'py-16'
          )}
        >
          <div
            className={cn(
              'grid gap-8',
              isMobile
                ? 'grid-cols-1 gap-8'
                : isTablet
                  ? 'grid-cols-2 gap-8'
                  : 'grid-cols-4 gap-8'
            )}
          >
            {/* Logo and Description */}
            <motion.div
              className={cn(
                isMobile ? 'col-span-1' : isTablet ? 'col-span-2' : 'col-span-1'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Link
                  to="/"
                  className={cn(
                    'flex items-center space-x-3 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md',
                    isTouchDevice ? 'min-h-[44px]' : ''
                  )}
                  aria-label="AfCFTA Hackathon - Go to homepage"
                >
                  <img
                    src="/assets/img/logo/afcfta-logo.jpg"
                    alt="AfCFTA Logo"
                    className={cn(
                      'object-contain',
                      isMobile ? 'h-10 w-10' : 'h-12 w-12'
                    )}
                  />
                  <span
                    className={cn(
                      'font-bold',
                      isMobile ? 'text-lg' : 'text-xl'
                    )}
                  >
                    {isMobile ? 'AfCFTA' : 'AfCFTA Hackathon'}
                  </span>
                </Link>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Join the AfCFTA Digital Trade Protocol Hackathon and help shape
                the future of digital trade in Africa. Compete for amazing
                prizes and connect with innovators across the continent.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={cn(
                      'hover:text-blue-400 transition-colors duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
                      isTouchDevice ? 'min-h-[44px] flex items-center' : ''
                    )}
                    aria-label={`Send email to ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className={cn(
                      'hover:text-blue-400 transition-colors duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
                      isTouchDevice ? 'min-h-[44px] flex items-center' : ''
                    )}
                    aria-label={`Call ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{contactInfo.address}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                className={cn(
                  'font-bold mb-6 text-white',
                  isMobile ? 'text-base' : 'text-lg'
                )}
              >
                Quick Links
              </h3>
              <nav aria-label="Footer navigation">
                <ul
                  className={cn(
                    'space-y-2',
                    isMobile ? 'grid grid-cols-2 gap-2 space-y-0' : 'space-y-3'
                  )}
                >
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={link.href}
                        className={cn(
                          'text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm block py-1 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
                          isTouchDevice ? 'min-h-[44px] flex items-center' : ''
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className={cn(
                isMobile ? 'col-span-1' : isTablet ? 'col-span-2' : 'col-span-2'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                className={cn(
                  'font-bold mb-6 text-white',
                  isMobile ? 'text-base' : 'text-lg'
                )}
              >
                Stay Updated
              </h3>
              <p
                className={cn(
                  'text-gray-300 mb-6 leading-relaxed',
                  isMobile ? 'text-sm' : 'text-sm'
                )}
              >
                Subscribe to receive updates about the AfCFTA Digital Trade
                Protocol Hackathon and future innovation initiatives.
              </p>

              <form
                className="flex flex-col gap-3 mb-8"
                aria-label="Newsletter subscription"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter subscription
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  aria-required="true"
                  aria-describedby="newsletter-description"
                  className={cn(
                    'px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300',
                    'touch-manipulation',
                    isTouchDevice ? 'min-h-[44px]' : ''
                  )}
                />
                <div id="newsletter-description" className="sr-only">
                  Subscribe to receive updates about the AfCFTA Digital Trade
                  Protocol Hackathon
                </div>
                <motion.button
                  type="submit"
                  className={cn(
                    'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300',
                    'touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    isTouchDevice ? 'min-h-[44px]' : ''
                  )}
                  whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                  aria-describedby="newsletter-description"
                >
                  Subscribe
                </motion.button>
              </form>

              {/* Social Links */}
              <div>
                <h4
                  className={cn(
                    'font-semibold text-white mb-4',
                    isMobile ? 'text-sm' : 'text-base'
                  )}
                >
                  Follow Us
                </h4>
                <div
                  className={cn(
                    'flex gap-4',
                    isMobile ? 'justify-center' : 'justify-start'
                  )}
                >
                  {socialLinks.map((social, index) => {
                    const IconComponent = getSocialIcon(social.icon);
                    return (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        aria-label={social.label}
                        className={cn(
                          'bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300 touch-manipulation',
                          isMobile ? 'w-12 h-12' : 'w-10 h-10',
                          isTouchDevice ? 'min-h-[44px] min-w-[44px]' : ''
                        )}
                        whileHover={!isTouchDevice ? { scale: 1.1, y: -2 } : {}}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className={cn('bg-gray-950', isMobile ? 'py-4' : 'py-6')}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex justify-between items-center',
              isMobile
                ? 'flex-col space-y-3'
                : 'flex-col md:flex-row space-y-4 md:space-y-0'
            )}
          >
            <div
              className={cn(
                'text-gray-400 text-sm',
                isMobile ? 'text-center text-xs' : 'text-center md:text-left'
              )}
            >
              <p>
                Copyright © {currentYear} AfCFTA Digital Trade Protocol
                Hackathon. All rights reserved.
              </p>
            </div>
            <div
              className={cn(
                'flex text-sm',
                isMobile ? 'space-x-4 text-xs' : 'space-x-6'
              )}
            >
              <Link
                to="/privacy"
                className={cn(
                  'text-gray-400 hover:text-blue-400 transition-colors duration-300 touch-manipulation',
                  isTouchDevice ? 'min-h-[44px] flex items-center' : ''
                )}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={cn(
                  'text-gray-400 hover:text-blue-400 transition-colors duration-300 touch-manipulation',
                  isTouchDevice ? 'min-h-[44px] flex items-center' : ''
                )}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
