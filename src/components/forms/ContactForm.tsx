import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FormField } from '../ui/form-field';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useResponsive } from '../../hooks/useResponsive';
import { useTouchDevice } from '../../hooks/useTouchDevice';
import { contactFormSchema, type ContactFormData } from '../../lib/validations';
import { cn } from '../../lib/utils';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { isMobile } = useResponsive();
  const { isTouchDevice } = useTouchDevice();

  const initialValues: Partial<ContactFormData> = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormValidation({
      schema: contactFormSchema,
      initialValues,
      onSubmit: async data => {
        if (onSubmit) {
          await onSubmit(data);
        }
      },
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'bg-white rounded-lg shadow-sm border',
        isMobile ? 'p-4' : 'p-8'
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 rounded-full p-2">
          <Mail className="w-5 h-5 text-[#c2d72f]" />
        </div>
        <h2
          className={cn(
            'font-semibold text-gray-900',
            isMobile ? 'text-lg' : 'text-xl'
          )}
        >
          Send us a Message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={cn(
            'grid gap-6',
            isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
          )}
        >
          <FormField
            label="Full Name"
            required
            error={touched.name ? errors.name : undefined}
            htmlFor="name"
          >
            <Input
              id="name"
              placeholder="Enter your full name"
              {...getFieldProps('name')}
            />
          </FormField>

          <FormField
            label="Email Address"
            required
            error={touched.email ? errors.email : undefined}
            htmlFor="email"
          >
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...getFieldProps('email')}
            />
          </FormField>
        </div>

        <FormField
          label="Subject"
          required
          error={touched.subject ? errors.subject : undefined}
          htmlFor="subject"
        >
          <Input
            id="subject"
            placeholder="Enter the subject of your message"
            {...getFieldProps('subject')}
          />
        </FormField>

        <FormField
          label="Message"
          required
          error={touched.message ? errors.message : undefined}
          htmlFor="message"
        >
          <Textarea
            id="message"
            placeholder="Enter your message (minimum 10 characters)"
            rows={6}
            {...getFieldProps('message')}
          />
        </FormField>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || isLoading}
            className={cn(
              'px-8 touch-manipulation',
              isTouchDevice ? 'min-h-[44px]' : '',
              isMobile ? 'w-full' : ''
            )}
          >
            {isSubmitting || isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MessageSquare className="w-4 h-4" />
          <span>
            We typically respond within 24 hours during business days.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
