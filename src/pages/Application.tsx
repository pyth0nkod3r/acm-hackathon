import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../components/layout';
import { Users, FileText, Trophy, Calendar } from 'lucide-react';
import { RegistrationForm } from '../components/forms';
import { formSubmissionService } from '../services';
import { useNotification } from '../hooks';
import type { RegistrationFormData } from '../lib/validations';

const Application = () => {
  const { showSuccess, showError } = useNotification();
  const [searchParams] = useSearchParams();
  const [preSelectedChallenges, setPreSelectedChallenges] = useState<string[]>(
    []
  );

  useEffect(() => {
    // Get pre-selected challenges from URL parameters
    const challengesParam = searchParams.get('challenges');
    if (challengesParam) {
      const challenges = challengesParam.split(',').filter(Boolean);
      setPreSelectedChallenges(challenges);
    }
  }, [searchParams]);

  const handleRegistrationSubmit = async (data: RegistrationFormData) => {
    try {
      console.log('Registration form submitted:', data);

      // Clean the data to ensure all optional fields are strings
      // Clean the data to ensure all optional fields are strings
      const cleanData = {
        teamName: data.teamName,
        teamSize: data.teamSize,
        teamLeader: {
          name: data.teamLeader.name,
          email: data.teamLeader.email,
          phone: data.teamLeader.phone,
          role: data.teamLeader.role,
          country: data.teamLeader.country,
          nationality: data.teamLeader.nationality,
          age: data.teamLeader.age,
          linkedin: data.teamLeader.linkedin ?? '',
          gender: data.teamLeader.gender ?? '',
        },
        teamMembers: data.teamMembers.map(member => ({
          ...member,
          linkedin: member.linkedin ?? '',
          gender: member.gender ?? '',
        })),
        projectTitle: data.projectTitle,
        ideaSummary: data.ideaSummary,
        problemSolving: data.problemSolving,
        technology: data.technology,
        alignment: data.alignment,
        hasPrototype: data.hasPrototype,
        prototypeURL: data.prototypeURL ?? '',
        projectRepo: data.projectRepo ?? '',
        challengeAreas: data.challengeAreas,
        declarations: data.declarations,
      };

      // Submit form using the API service
      const response =
        await formSubmissionService.submitRegistration(cleanData);
      if (response.success) {
        // Show success notification
        showSuccess(
          `Registration submitted successfully! Your submission ID is: ${response.data?.id}. We will review your application and get back to you soon.`,
          8000
        );
      } else {
        // Handle API errors
        const errorMessage =
          response.message || 'Failed to submit registration';
        console.error('Registration submission failed:', response);
        showError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Registration submission error:', error);
      showError(
        'There was an unexpected error submitting your registration. Please try again.'
      );
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
              Hackathon Registration
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center space-x-2 text-lg"
            >
              <span>Home</span>
              <span>/</span>
              <span>application</span>
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
              Apply for the Hackathon
            </h1>

            {/* Application Process Overview */}
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
                    Assemble your team of 2-5 members
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

            {/* Application Requirements */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Eligibility Requirements
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• African citizens or residents</li>
                  <li>• Age 18 or above</li>
                  <li>• Technical background preferred</li>
                  <li>• Team size: 2-5 members</li>
                  <li>• Commitment to full event participation</li>
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
                </ul>
              </div>
            </div>

            {/* Pre-selected Challenges Indicator */}
            {preSelectedChallenges.length > 0 && (
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

            {/* Registration Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Registration Form
              </h2>
              <RegistrationForm
                onSubmit={handleRegistrationSubmit}
                initialChallenges={preSelectedChallenges}
              />
            </div>

            {/* Important Dates */}
            <div className="bg-yellow-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                Important Dates
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Applications Open
                  </h4>
                  <p className="text-yellow-700">January 15, 2025</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Application Deadline
                  </h4>
                  <p className="text-yellow-700">February 28, 2025</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">
                    Hackathon Event
                  </h4>
                  <p className="text-yellow-700">March 15-17, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
};

export default Application;
