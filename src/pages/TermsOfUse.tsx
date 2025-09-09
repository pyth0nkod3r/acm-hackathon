import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout';
import { Button } from '../components/ui';

const TermsOfUse = () => {
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
              ACM Hackathon Terms of Use
            </motion.h1>
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-purple-200 text-lg mb-6"
            >
              ACM Hackathon 2025
            </motion.p> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-purple-200"
            >
              <Link to="/" className="hover:text-white transition-colors ">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">Terms of Use</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      By accessing or using the ACM Hackathon 2025 website
                      ("Website"), you agree to comply with these Terms of Use.
                      If you do not agree, please discontinue use of the
                      Website.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      2. Use of Website
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <strong className="text-gray-900">Purpose:</strong>
                        <p className="text-gray-700 leading-relaxed ml-4">
                          The Website is provided for informational,
                          educational, and event participation purposes only.
                        </p>
                      </div>
                      <div>
                        <strong className="text-gray-900">
                          Prohibited Activities:
                        </strong>
                        <p className="text-gray-700 leading-relaxed ml-4">
                          You agree not to misuse the Website, including
                          attempting to gain unauthorized access, spreading
                          harmful software, or engaging in activities that
                          disrupt its functionality.
                        </p>
                      </div>
                      <div>
                        <strong className="text-gray-900">
                          Content Updates:
                        </strong>
                        <p className="text-gray-700 leading-relaxed ml-4">
                          Content provided on the Website is for general
                          purposes and may be updated or modified at any time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      3. Intellectual Property
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      All materials on the Website (including logos, graphics,
                      text, and design) are owned or licensed by the ACM
                      Hackathon Organizing Team.
                    </p>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li>
                        • You may view and download content for personal,
                        non-commercial use only.
                      </li>
                      <li>
                        • You may not reproduce, distribute, or modify Website
                        content without prior written consent from the
                        Organizer.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      4. User Content
                    </h2>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li>
                        • If you submit content (e.g., registration details,
                        project information, feedback, or comments), you grant
                        the Organizer a non-exclusive, royalty-free license to
                        use such content for event administration and promotion.
                      </li>
                      <li>
                        • You are solely responsible for the accuracy and
                        legality of any content you provide.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      5. Third-Party Links
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Website may contain links to third-party websites. We
                      are not responsible for the content, accuracy, or privacy
                      practices of external sites.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      6. Disclaimer of Warranties
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Website is provided on an "as is" and "as available"
                      basis. The Organizer makes no warranties, express or
                      implied, regarding the availability, accuracy, or
                      reliability of the Website.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      7. Limitation of Liability
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      To the fullest extent permitted by law, the Organizer
                      shall not be liable for any damages arising out of or in
                      connection with the use of the Website, including
                      indirect, incidental, or consequential damages.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      8. Privacy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Use of personal information on the Website is governed by
                      our Privacy Policy.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      9. Changes to Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Organizer reserves the right to modify or update these
                      Terms of Use at any time. Continued use of the Website
                      after such changes constitutes acceptance of the revised
                      Terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      10. Governing Law
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms of Use are governed by the laws of Nigeria.
                      Any disputes shall be resolved under applicable Nigerian
                      law.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      11. Contact Information
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <strong>Organizer:</strong> ACM Hackathon Organizing
                        Team
                      </p>
                      <p className="text-gray-700">
                        <strong>Email:</strong> info@acmhackathon.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link to="/">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Back to Home
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
};

export default TermsOfUse;
