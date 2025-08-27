import { motion } from 'framer-motion';
import { Container } from '../components/layout';
import { ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData: FAQItem[] = [
    {
      question: 'What is the Africa Creative Market Hackathon?',
      answer:
        "The ACM Hackathon 2025 is a high-energy innovation sprint hosted as part of the Africa Creative Market 2025, bringing together brilliant minds across technology, music, and film to create multi-layered solutions to Africa's music and film distribution challenges. From last-mile access to payment systems and anti-piracy tech, this hackathon is a call to action for transformative disruption.",
    },
    {
      question: 'Who can participate in the ACM Hackathon?',
      answer:
        'The program is open to Africans. Eligible participants include Software Developers, UI/UX Designers, Creative Strategists, Business/Legal Analysts, and Data Scientists.',
    },
    {
      question: 'What resources are offered?',
      answer:
        'Participants will have access to mentors and industry experts, high-speed WiFi and tech support powered by AWS. Breakfast and lunch will also be provided daily.',
    },
    {
      question: 'How can I get involved?',
      answer:
        'Apply through our website to participate in the program and receive updates. You can start your application by visiting our registration page.',
    },
    {
      question: 'Is there a cost to participate?',
      answer: 'The program is free for participants.',
    },
    {
      question: 'Is transportation and accommodation provided?',
      answer:
        'No, participants will be responsible for their own transportation and accommodation, as these are not covered.',
    },
    {
      question: "Can I participate virtually if I can't attend in person?",
      answer: 'No, full participation is required.',
    },
    {
      question: 'Where can I find more information about upcoming events?',
      answer:
        'Event schedules and updates are posted on our website. You can check our schedule page for the latest information.',
    },
    {
      question: 'How can organizations support ACM Hackathon?',
      answer:
        'Organizations can become partners or sponsors. Contact us for more information on how to collaborate.',
    },
    {
      question: 'Who can I contact for further questions?',
      answer:
        "Contact us via the email provided on the website, or the numbers listed there. We're here to assist.",
    },
  ];

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
              <HelpCircle className="h-16 w-16 mx-auto text-white/80" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-white/80"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">FAQ</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Content */}
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about the ACM Hackathon
              2025. Can't find what you're looking for?{' '}
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Contact us
              </Link>{' '}
              for assistance.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <motion.div
                  id={`faq-answer-${index}`}
                  initial={false}
                  animate={{
                    height: openItems.has(index) ? 'auto' : 0,
                    opacity: openItems.has(index) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is here to help! Reach out to us for personalized
              assistance with any questions about the hackathon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact Us
              </Link>
              <Link
                to="/registration"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#c2d72f] text-gray-900 font-semibold rounded-lg hover:bg-[#b8c82a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c2d72f] focus:ring-offset-2"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default FAQ;
