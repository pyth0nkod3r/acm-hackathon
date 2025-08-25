import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

interface PartnerRegistrationData {
  fullName: string;
  phoneNumber: string;
  altPhoneNumber: string;
  emailAddress: string;
  altEmailAddress: string;
  company: string;
  message: string;
}

const PartnerRegistration = () => {
  const [formData, setFormData] = useState<PartnerRegistrationData>({
    fullName: '',
    phoneNumber: '',
    altPhoneNumber: '',
    emailAddress: '',
    altEmailAddress: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({});

    try {
      // TODO: Implement actual API call to submit partner registration
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitResult({
        success: true,
        message: 'Your partner registration has been submitted successfully! We will get back to you soon.',
      });
      
      setFormData({
        fullName: '',
        phoneNumber: '',
        altPhoneNumber: '',
        emailAddress: '',
        altEmailAddress: '',
        company: '',
        message: '',
      });
      
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSubmitResult({});
      }, 5000);
    } catch {
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
      
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setSubmitResult({});
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              Become a Partner
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center space-x-2 text-lg"
            >
              <span>Home</span>
              <span>/</span>
              <span>Partner Registration</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Partner Registration Form
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join us in transforming Africa's digital trade landscape. Fill out the form below to become a partner and be part of this groundbreaking initiative.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Alternate Phone Number */}
                  <div>
                    <Label htmlFor="altPhoneNumber" className="text-sm font-medium text-gray-700">
                      Alternate Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="altPhoneNumber"
                      name="altPhoneNumber"
                      value={formData.altPhoneNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter alternate phone number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Alternate Email */}
                  <div>
                    <Label htmlFor="altEmailAddress" className="text-sm font-medium text-gray-700">
                      Alternate Email Address
                    </Label>
                    <Input
                      type="email"
                      id="altEmailAddress"
                      name="altEmailAddress"
                      value={formData.altEmailAddress}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter alternate email address"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Name of Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Tell us about your interest in partnering with us and how we can collaborate..."
                  />
                </div>

                {/* Form submission status message */}
                {submitResult.message && (
                  <div
                    role="alert"
                    className={`p-4 rounded-md ${
                      submitResult.success
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitResult.message}
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                </div>
              </form>

              {/* Partnership Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Partnership Benefits
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Strategic Collaboration',
                      description: 'Work directly with leading organizations in Africa\'s digital trade ecosystem',
                      icon: '🤝'
                    },
                    {
                      title: 'Network Access',
                      description: 'Connect with industry leaders, innovators, and potential clients across Africa',
                      icon: '🌍'
                    },
                    {
                      title: 'Innovation Impact',
                      description: 'Contribute to shaping the future of digital trade in Africa',
                      icon: '💡'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl mb-3">{benefit.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerRegistration;