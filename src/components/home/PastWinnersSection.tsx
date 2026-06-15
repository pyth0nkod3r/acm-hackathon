import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Trophy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PastWinnersSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:mx-10">
          <ScrollAnimation animation="slideLeft">
            <div>
              <span className="text-[#4a5f8a] font-semibold text-lg mb-4 block uppercase tracking-wider">
                Building on Success
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                2025 Hackathon Recap
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The inaugural ACM Hackathon focused on music and film distribution in Lagos, Nigeria. The caliber of talent and practical nature of solutions showed that Africa-led tech can solve complex local content access problems.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 text-lime-700 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">₦10M Funding Disbursed</h3>
                    <p className="text-sm text-gray-600">Enabling product development and market scaling for early stages.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 text-lime-700 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">3-Month Incubation</h3>
                    <p className="text-sm text-gray-600">Ongoing startup support and mentoring provided by CcHub.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideRight">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 relative overflow-hidden"
            >
              {/* Highlight badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-bl-xl flex items-center gap-1.5 shadow-sm">
                <Trophy className="h-3.5 w-3.5" />
                2025 Winner
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                FairPlay Africa
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Music & Film Distribution Platform
              </p>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                FairPlay Africa emerged as the grand prize winner, taking home <strong>₦10,000,000</strong> in funding, along with 3 months of technical/business incubation at CcHub and access to AWS infrastructure credits.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-[#a8b82a]" />
                  Incubation Progress
                </h4>
                <p className="text-sm text-gray-600">
                  FairPlay has successfully completed incubation, established key distribution partnerships, and integrated automated rights/royalty splits into their production-ready MVP.
                </p>
              </div>

              <Link
                to="/registration"
                className="text-[#4a5f8a] hover:text-[#a8b82a] font-semibold text-sm inline-flex items-center gap-2 group transition-colors duration-300"
              >
                Apply for ACM 2026 Today
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </ScrollAnimation>
        </div>
      </Container>
    </section>
  );
};
