import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/layout';
import { Button } from '../components/ui';

const Terms = () => {
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
              Terms and Conditions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-purple-200 text-lg mb-6"
            >
              Effective Date: August 25th, 2025
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
              <span className="mb-4">Terms and Conditions</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="font-bold text-2xl text-gray-900 mb-6">
                ACM Hackathon Terms and Conditions
              </h2>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                1. Overview
              </h3>
              <p className="mb-4">
                These Terms and Conditions ("Terms") govern participation in the
                ACM Hackathon 2025 ("Hackathon"), as organized by the Africa
                Creative Market (ACM) Hackathon team in collaboration with
                Ascend Studios Foundation and Amazon Web Services (AWS). By
                submitting an application to participate in the Hackathon (the
                "Application"), you ("Participant") agree to abide by these
                Terms in full.
              </p>
              <p className="mb-6">
                The Hackathon will take place from September 16 – 19, 2025, with
                the finale and demo day on September 19, 2025, in Lagos,
                Nigeria.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                2. Eligibility & Participation
              </h3>
              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Team Formation:
              </h4>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  Participation is encouraged as a team. Teams must consist of 3
                  to 5 members with complementary skills (software development,
                  UI/UX design, creative strategy, business/legal, and
                  optionally data science).
                </li>
                <li className="mb-2">
                  Individuals are welcome to apply and form or join a team
                  on-site before the Hackathon begins.
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Application Process:
              </h4>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  Submission of an Application signifies acceptance of all Terms
                  herein.
                </li>
                <li className="mb-2">
                  Only participants whose Applications have been approved by
                  email the Organizer are officially accepted.
                </li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                3. Application & Acceptance
              </h3>
              <p className="mb-6">
                By submitting the Application, you affirm that all information
                provided is accurate and true. The Organizer reserves the right,
                at its sole discretion, to reject or accept any Application
                without providing a reason.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                4. Participation Requirements
              </h3>
              <p className="mb-4">
                Participants are expected to behave professionally, collaborate
                respectfully, and support the spirit of innovation and teamwork.
                The Organizer may disqualify any team or individual for reasons
                including, but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Harmful conduct</li>
                <li className="mb-2">Plagiarism</li>
                <li className="mb-2">Breach of these Terms</li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                5. Intellectual Property
              </h3>
              <p className="mb-4">
                Each team retains ownership of its own pre-existing intellectual
                property (IP). Any new ideas, code, or creations developed
                during the Hackathon ("Hackathon IP") remain the property of the
                respective team, unless otherwise stated in separate agreements.
              </p>
              <p className="mb-4">
                By participating, you grant the Organizer a perpetual,
                irrevocable, royalty-free license to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  Use, reproduce, modify, and display Hackathon IP
                </li>
                <li className="mb-2">Use content for promotional purposes</li>
                <li className="mb-2">Use content for publicity purposes</li>
                <li className="mb-2">Use content for archival purposes</li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                6. Prize Fund Guidelines
              </h3>
              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                6.1 Seed Fund, Not Personal Reward
              </h4>
              <p className="mb-4">
                The ₦10,000,000 Grand Prize allocated to the winning team is
                provided as seed capital to support the growth and development
                of the project/platform presented at the Hackathon. It must not
                be divided among team members as personal reward.
              </p>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                6.2 Responsible Use of Funds
              </h4>
              <p className="mb-4">
                The seed fund must be utilized for activities such as:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Product development</li>
                <li className="mb-2">Market validation</li>
                <li className="mb-2">Technical improvements</li>
                <li className="mb-2">Business structuring</li>
                <li className="mb-6">
                  Other milestones that transform the solution into a viable,
                  scalable, and impactful venture
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                6.3 Visibility & Publicity
              </h4>
              <p className="mb-4">
                Winning teams agree to publicly share their achievement on
                official and personal social media platforms, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  Tagging ACM Hackathon channels where applicable
                </li>
                <li className="mb-2">Highlighting their win</li>
                <li className="mb-2">Sharing their vision</li>
                <li className="mb-6">
                  Demonstrating commitment to advancing the idea
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                6.4 Progress & Accountability
              </h4>
              <p className="mb-4">Winners will be expected to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  Showcase their progress at future editions of the ACM
                  Hackathon or ACM events
                </li>
                <li className="mb-6">
                  Provide periodic updates or reports to the Organizing
                  Committee (may be required)
                </li>
              </ul>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                6.5 Community & Recognition
              </h4>
              <p className="mb-4">
                Winning teams automatically become part of the ACM Innovation
                Community—a network of innovators across Africa. Winners are
                expected to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Remain engaged with the community</li>
                <li className="mb-2">Collaborate with peers</li>
                <li className="mb-2">Share insights</li>
                <li className="mb-2">Contribute actively to the network</li>
                <li className="mb-6">
                  Participate in official communication groups (e.g., WhatsApp,
                  Slack)
                </li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                7. Disclaimers & Limitation of Liability
              </h3>
              <p className="mb-4">
                The Organizer, including its successors, assigns, employees, and
                agents, is not responsible for any:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  Losses arising from or in connection with the Hackathon
                </li>
                <li className="mb-2">
                  Damages arising from or in connection with the Hackathon
                </li>
                <li className="mb-2">
                  Claims arising from or in connection with the Hackathon
                </li>
                <li className="mb-2">
                  Costs arising from or in connection with the Hackathon
                </li>
                <li className="mb-6">
                  Liabilities arising from or in connection with the Hackathon
                </li>
              </ul>
              <p className="mb-6">
                To the fullest extent permitted by law, the Organizer disclaims
                all warranties, whether express or implied, regarding any aspect
                of the Hackathon.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                8. Safety & Conduct
              </h3>
              <p className="mb-4">
                Participants are responsible for their personal safety and
                belongings. The Organizer does not assume liability for any:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  Personal injury that may occur during the Hackathon
                </li>
                <li className="mb-2">
                  Illness that may occur during the Hackathon
                </li>
                <li className="mb-2">
                  Loss that may occur during the Hackathon
                </li>
                <li className="mb-6">
                  Damage that may occur during the Hackathon
                </li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                9. Privacy & Use of Personal Data
              </h3>
              <p className="mb-4">
                The Organizer may collect and process personal information
                including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Name</li>
                <li className="mb-2">Contact details</li>
                <li className="mb-2">Biography</li>
                <li className="mb-6">Team details</li>
              </ul>
              <p className="mb-6">
                Personal data will be used in accordance with the Organizer's
                Privacy Policy (to be referenced separately).
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                10. Photography, Video & Promotion
              </h3>
              <p className="mb-4">
                The Organizer may record, photograph, or film the Hackathon. By
                participating, you grant permission for the following to be used
                in promotional or archival materials without compensation:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Your name</li>
                <li className="mb-2">Your likeness</li>
                <li className="mb-2">Your image</li>
                <li className="mb-2">Your voice</li>
                <li className="mb-6">Your biographical information</li>
              </ul>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                11. Changes to the Hackathon & Terms
              </h3>
              <p className="mb-6">
                The Organizer reserves the right to modify, cancel, suspend, or
                postpone the Hackathon or these Terms at any time. Continued
                participation after such changes constitutes acceptance of the
                revised Terms.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                12. Governing Law & Dispute Resolution
              </h3>
              <p className="mb-6">
                These Terms are governed by and construed in accordance with the
                laws of Nigeria. All disputes arising from or related to these
                Terms or the Hackathon shall be referred to the Lagos State
                Multi-Door Courthouse (LMDC) for mediation, which shall be final
                and binding on the Parties.
              </p>

              <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">
                13. Contact Information
              </h3>
              <p className="mb-2">
                <strong>Organizer:</strong> ACM Hackathon Organizing Team
              </p>
              <p className="mb-6">
                <strong>Email:</strong> info@acmhackathon.com
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
              Ready to Join the Hackathon?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Now that you've reviewed the terms and conditions, join us in
              shaping Africa's creative future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#a8b82a] hover:bg-[#a8b82a]/90 text-white"
              >
                <Link to="/registration">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Link to="/contact">
                  Contact Us
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

export default Terms;
