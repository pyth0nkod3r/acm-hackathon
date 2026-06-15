import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout';
import { Button } from '../components/ui';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-pink-800/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            ></motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-purple-200 text-lg mb-6"
            >
              Last Updated: June 10th, 2026
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-purple-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">Privacy Policy</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="font-bold text-2xl text-gray-900 mb-6">
                ACM Hackathon Privacy Policy
              </h2>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                1. Introduction
              </h3>
              <p className="mb-6">
                ACM Hackathon 2026 ("we," "our," or "us") values your privacy
                and is committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your data when you participate in or interact with the
                ACM Hackathon 2026 website and related activities. By using our
                website or submitting your information for participation in the
                Hackathon, you agree to the practices described in this Policy.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                2. Information We Collect
              </h3>
              <p className="mb-4">
                We may collect the following categories of information:
              </p>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Personal Information:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Full name</li>
                <li className="mb-2">Email address</li>
                <li className="mb-2">Phone number</li>
                <li className="mb-2">Nationality</li>
                <li className="mb-2">Biography</li>
                <li className="mb-2">Team details</li>
                <li className="mb-2">
                  Any information provided during registration or communication
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Usage Information:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">IP address</li>
                <li className="mb-2">Browser type</li>
                <li className="mb-2">Operating system</li>
                <li className="mb-2">Pages visited</li>
                <li className="mb-2">Interaction with the website</li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Hackathon Submissions:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Project details</li>
                <li className="mb-2">Presentations</li>
                <li className="mb-2">Source code</li>
                <li className="mb-2">
                  Related materials submitted during the Hackathon
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Media Content:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  Photos of participants during the Hackathon
                </li>
                <li className="mb-2">
                  Videos of participants during the Hackathon
                </li>
                <li className="mb-2">
                  Recordings of participants during the Hackathon
                </li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                3. How We Use Your Information
              </h3>
              <p className="mb-4">
                Your information may be used for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  To process and manage Hackathon applications and
                  participation.
                </li>
                <li className="mb-2">
                  To communicate important updates, event details, and
                  announcements.
                </li>
                <li className="mb-2">
                  To facilitate team formation, mentoring, judging, and prize
                  distribution.
                </li>
                <li className="mb-2">
                  To promote and showcase the Hackathon, including using
                  participant names, images, and project details for publicity.
                </li>
                <li className="mb-2">
                  To comply with legal and regulatory requirements.
                </li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                4. Sharing of Information
              </h3>
              <p className="mb-4">
                We do not sell your personal data. However, we may share your
                information with:
              </p>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Organizing Partners & Sponsors:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">To provide support</li>
                <li className="mb-2">To provide mentorship</li>
                <li className="mb-2">To provide funding</li>
                <li className="mb-2">To provide collaboration opportunities</li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Service Providers:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">For website hosting</li>
                <li className="mb-2">For communication</li>
                <li className="mb-2">For logistics</li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Legal Authorities:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">If required by law</li>
                <li className="mb-2">If required by regulation</li>
                <li className="mb-2">If required by legal process</li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                5. Data Security
              </h3>
              <p className="mb-6">
                We implement reasonable technical and organizational measures to
                protect your personal data from unauthorized access, loss,
                misuse, or disclosure. However, no online platform can be 100%
                secure, and we cannot guarantee absolute security of your data.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                6. Data Retention
              </h3>
              <p className="mb-6">
                We will retain your personal information for as long as
                necessary to fulfill the purposes outlined in this Policy,
                unless a longer retention period is required by law.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                7. Your Rights
              </h3>
              <p className="mb-4">As a participant, you have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  Access the personal data we hold about you.
                </li>
                <li className="mb-2">
                  Request correction or deletion of your information.
                </li>
                <li className="mb-2">
                  Withdraw your consent for data use (where applicable).
                </li>
                <li className="mb-2">
                  Opt out of promotional communications at any time.
                </li>
              </ul>
              <p className="mb-6">
                To exercise these rights, contact us at info@acmhackathon.com
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-white border-t">
        <Container className="max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Have Questions About Your Privacy?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              If you have any questions about our privacy practices or would
              like to exercise your rights, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#a8b82a] hover:bg-[#a8b82a]/90 text-white"
              >
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link to="/registration">
                  Join the Hackathon
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
