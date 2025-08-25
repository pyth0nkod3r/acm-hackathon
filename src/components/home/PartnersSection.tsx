import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Button } from '../ui';
import acmlogo from '../../assets/img/logo/logo.png';
import awsLogo from '../../assets/img/brands/aws.png';
import cherithCodeLogo from '../../assets/img/brands/CHERITH-CODE Logo FA (Full Color) PNG.png';
import ascendLogo from '../../assets/img/brands/03.png';

export const PartnersSection = () => {
  const partners = [
    {
      name: 'ACM Global',
      logo: acmlogo,
      tier: 'Organizer',
    },
    {
      name: 'Ascend Studios Foundation',
      logo: ascendLogo,
      tier: 'Strategic Partner',
    },
    {
      name: 'AWS',
      logo: awsLogo,
      tier: 'Technology Partner',
    },
    {
      name: 'CCHub',
      logo: cherithCodeLogo,
      tier: 'Incubation Partner',
    },
  ];

  return (
    <section className="py-20  bg-gray-900 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation animation="slideLeft">
            <div className="text-white">
              <span className="text-blue-200 font-semibold text-lg mb-4 block">
                Official Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Trusted by Leading Organizations
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                We're proud to partner with organizations that share our vision
                of transforming Africa's digital trade landscape.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideRight">
            <div className="text-right">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link to="/partner-registration">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <ScrollAnimation
              key={partner.name}
              animation="fadeIn"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-[#4a5f8a] transition-colors">
                    {partner.tier}
                  </p>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Partnership Tiers */}
        <ScrollAnimation animation="fadeIn" delay={0.5}>
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Partnership Opportunities
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  tier: 'Platinum',
                  benefits: [
                    'Logo on all materials',
                    'Speaking opportunity',
                    'Booth space',
                    'Networking access',
                  ],
                  color: 'from-gray-300 to-gray-500',
                },
                {
                  tier: 'Gold',
                  benefits: [
                    'Logo on website',
                    'Social media mentions',
                    'Networking access',
                    'Event tickets',
                  ],
                  color: 'from-yellow-300 to-yellow-500',
                },
                {
                  tier: 'Silver',
                  benefits: [
                    'Logo on website',
                    'Social media mentions',
                    'Event tickets',
                  ],
                  color: 'from-gray-400 to-gray-600',
                },
              ].map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-xl p-6 border border-white/20"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {tier.tier} Partner
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="text-blue-100 text-sm flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
};
