import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container } from '../components/layout';
import {
  Users,
  FileText,
  Trophy,
  Calendar,
  ArrowRight,
  XCircle,
} from 'lucide-react';
import { hackathonService } from '../nServices';
import { emailService } from '../services';
import { useNotification } from '../hooks';
import type { HackathonForm } from '../nServices/apiType';
import { NewApplicationForm } from '@/components/forms';

const NewApplication = () => {
  const { showSuccess, showError } = useNotification();
  const [searchParams] = useSearchParams();
  const [preSelectedChallenges, setPreSelectedChallenges] = useState<string[]>(
    []
  );
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Registration closed state - set to true to close registration
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(true);

  useEffect(() => {
    // Get pre-selected challenges from URL parameters
    const challengesParam = searchParams.get('challenges');
    if (challengesParam) {
      const challenges = challengesParam.split(',').filter(Boolean);
      setPreSelectedChallenges(challenges);
    }
  }, [searchParams]);

  const handleRegistrationSubmit = async (data: HackathonForm) => {
    try {
      console.log('New registration form submitted:', data);

      // Reset success state
      setIsFormSuccess(false);
      setFormSuccessMessage('');

      // Submit form using the new hackathon service
      const response = await hackathonService.submitRegistration(data);

      if (response.success) {
        // Send confirmation email
        try {
          await emailService.sendHackathonConfirmation(data);
          console.log('Confirmation email sent successfully');
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the registration if email fails
        }

        // Show success notification with registration ID if available
        const registrationId = response.data?.id;
        const successMessage = registrationId
          ? `Registration submitted successfully! Your registration ID is: ${registrationId}. A confirmation email has been sent to ${data.teamLeaderEmail}.`
          : `Registration submitted successfully! A confirmation email has been sent to ${data.teamLeaderEmail}. We will review your application and get back to you soon.`;

        // Set form success state
        setIsFormSuccess(true);
        setFormSuccessMessage(successMessage);

        // Also show toast notification
        showSuccess(successMessage, 10000);

        // Scroll to success message
        setTimeout(() => {
          const successElement = document.querySelector('.bg-green-50');
          if (successElement) {
            successElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      } else {
        showError(
          (response.message as string) ?? 'Failed to submit registration'
        );
      }
    } catch (err) {
      console.error('Registration submission error:', err);
      showError('Unexpected error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-20"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Registration for ACM Hackathon 2025
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center space-x-2 text-lg"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">Registration</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Container className="py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Apply for the ACM Hackathon 2025
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-6 font-semibold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            >
              "Distribute Africa: Hacking the Future of Music & Film Access"
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8"
            >
              <div className="space-y-4 text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="font-medium">September 16-19, 2025</p>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <p className="font-medium">
                      Finale & Demo Day: September 19, 2025
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-2xl font-bold text-white-400 mb-2">
                    Prize: ₦10,000,000 + AWS Tech Support + Mentorship +
                    Investment Opportunities
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 text-md opacity-90">
                  <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    ACM
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    Ascend Studios Foundation
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    AWS
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Registration Closed Message */}
            {isRegistrationClosed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8 text-center"
              >
                <div className="flex items-center justify-center mb-4">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Registration is closed
                </h2>
                <p className="text-lg text-red-800 mb-4">
                  Registration is closed. See you at the ACM Hackathon @
                  Landmark Event Center, 16th - 19th September, 2025.
                </p>
                <div className="bg-red-100 rounded-lg p-4 border border-red-200">
                  <p className="text-red-700 font-medium">
                    Thank you for your interest in the ACM Hackathon 2025. We
                    look forward to seeing you at the event!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Application Process Overview - Only show if registration is open */}
            {!isRegistrationClosed && (
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Application Process
                </h2>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Form Team
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Assemble your team of 3-5 members
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Submit Application
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Complete the registration form
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Review Process
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Applications reviewed by our panel
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Confirmation
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Receive acceptance notification
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Application Requirements - Only show if registration is open */}
            {!isRegistrationClosed && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Eligibility Requirements
                  </h3>
                  <ul className="text-blue-700 space-y-2">
                    <li>• African citizens or residents</li>
                    <li>• Age 18 or above</li>
                    <li>• Technical or creative background preferred</li>
                    <li>• Team size: 3-5 members</li>
                    <li>• Commitment to full event participation</li>
                    <li>• Interest in music & film distribution</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">
                    What You'll Need
                  </h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Team member details</li>
                    <li>• Project idea summary</li>
                    <li>• Technical approach outline</li>
                    <li>• Prototype or portfolio (optional)</li>
                    <li>• Motivation statement</li>
                    <li>• Skills and experience details</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Pre-selected Challenges Indicator - Only show if registration is open */}
            {!isRegistrationClosed && preSelectedChallenges.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Selected Challenge Areas ({preSelectedChallenges.length})
                </h3>
                <p className="text-blue-700 mb-4">
                  You've pre-selected the following challenge areas from the
                  Challenges page. These will be automatically selected in your
                  application form:
                </p>
                <div className="flex flex-wrap gap-2">
                  {preSelectedChallenges.map((challenge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full text-sm text-blue-800 font-medium"
                    >
                      {challenge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Registration Form - Only show if registration is open */}
            {!isRegistrationClosed && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Registration Form
                </h2>

                <NewApplicationForm
                  onSubmit={handleRegistrationSubmit}
                  _initialChallenges={preSelectedChallenges}
                  isSuccess={isFormSuccess}
                  successMessage={formSuccessMessage}
                />
              </div>
            )}

            {/* Important Dates - Updated with correct dates */}
            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                Important Dates
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Applications Open
                  </h4>
                  <p className="text-yellow-700">August 29, 2025</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Application Deadline
                  </h4>
                  <p className="text-yellow-700">September 10, 2025</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Hackathon Event
                  </h4>
                  <p className="text-yellow-700">September 16-19, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
};

export default NewApplication;
