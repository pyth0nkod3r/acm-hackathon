import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '../components/forms';
import { formSubmissionService } from '../services';
import { useNotification } from '../hooks';
import type { ContactFormData } from '../lib/validations';

const Contact = () => {
  const { showSuccess, showError } = useNotification();

  const handleContactSubmit = async (data: ContactFormData) => {
    try {
      console.log('Contact form submitted:', data);

      // Submit form using the API service
      const response = await formSubmissionService.submitContact(data);

      if (response.success) {
        // Show success notification
        showSuccess(
          `Message sent successfully! Your message ID is: ${response.data?.id}. We will get back to you within 24 hours.`,
          6000
        );
      } else {
        // Handle API errors
        const errorMessage = response.message || 'Failed to send message';
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
                    <p className="text-gray-600">
                      hackathon@africacreativemarket-global.org
                    </p>
                    <p className="text-gray-600">
                      support@africacreativemarket-global.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 903 265 70911</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">
                      Lagos
                      <br />
                      Nigeria
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
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT)
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
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Registration deadline and process</li>
                  <li>• Team formation guidelines</li>
                  <li>• Technical requirements</li>
                  <li>• Prize information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Contact;
