import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { ContactForm } from '../components/forms';
import { formSubmissionService, emailService } from '../services';
import { useNotification } from '../hooks';
import type { ContactFormData } from '../lib/validations';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { showSuccess, showError } = useNotification();
  const handleContactSubmit = async (data: ContactFormData) => {
    try {
      console.log('Contact form submitted:', data);

      // Submit form using the API service
      const response = await formSubmissionService.submitContact(data);

      if (response.success) {
        // Send inquiry response email
        try {
          await emailService.sendInquiryResponse(data);
          console.log('Inquiry response email sent successfully');
        } catch (emailError) {
          console.error('Failed to send inquiry response email:', emailError);
          // Don't fail the contact submission if email fails
        }

        // Show success notification
        showSuccess(
          `Message sent successfully! Your message ID is: ${response.data?.id}. A confirmation email has been sent to ${data.email}. We will get back to you within 24 hours.`,
          8000
        );
      } else {
        // If the API returns field-level messages, surface them to the user
        // via notifications (or aggregate them into one message if you prefer)
        if (response.messages) {
          Object.values(response.messages).forEach(msg => showError(msg));
        }
        // Handle API errors
        const errorMessage = response.message ?? 'Failed to send message';
        console.error('Contact form submission failed:', response);
        showError(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      showError(
        'There was an unexpected error sending your message. Please try again.'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#c2d72f] via-[#4a5f8a] to-[#4a5f8a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c2d72f]/20 to-[#4a5f8a]/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              {/* <span className="text-white-400 text-lg">Hackathon Focus</span> */}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-white-400"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">Contact Us</span>
            </motion.div>
          </div>
        </Container>
      </section>
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@acmhackathon.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 9167667376</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">
                      Mulungushi International Conference Center, <br />
                      8025 Great East Rd, Lusaka, Zambia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Support Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT+2)
                      <br />
                      Weekend: Limited support available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm onSubmit={handleContactSubmit} />

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  Find answers to common questions about registration, team
                  formation, technical requirements, and more.
                </p>
                <Link
                  to="/faq"
                  className="inline-flex items-center text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors"
                >
                  View FAQ Page
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Contact;
