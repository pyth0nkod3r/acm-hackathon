import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. The page
              might have been moved, deleted, or you might have entered the
              wrong URL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-[#c2d72f] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center justify-center">
                <Search className="w-4 h-4 mr-2" />
                Looking for something specific?
              </h3>
              <div className="text-blue-700 text-sm space-y-1">
                <Link to="/" className="block hover:underline">
                  • Home - Event overview and information
                </Link>
                <Link to="/about" className="block hover:underline">
                  • About - Learn about the hackathon
                </Link>
                <Link to="/registration" className="block hover:underline">
                  • Application - Register for the event
                </Link>
                <Link to="/contact" className="block hover:underline">
                  • Contact - Get in touch with organizers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default NotFound;
