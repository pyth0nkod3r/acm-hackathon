import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

interface MentorJudge {
  id: string;
  name: string;
  position: string;
  image: string;
  type: 'judge' | 'mentor';
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
}

const mentorsAndJudges: MentorJudge[] = [
  {
    id: '1',
    name: 'Dr. Akinwumi Adesina',
    position: 'Lead Judge - President, African Development Bank',
    image: '/assets/img/team/team-4/judge-1.png',
    type: 'judge',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '2',
    name: 'Prof. Benedict Oramah',
    position: 'Senior Judge - President, Afreximbank',
    image: '/assets/img/team/team-4/judge-2.png',
    type: 'judge',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '3',
    name: 'Dr. Hippolyte Fofack',
    position: 'Senior Judge - Chief Economist, Afreximbank',
    image: '/assets/img/team/team-4/judge-3.png',
    type: 'judge',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '4',
    name: 'Dr. Vera Songwe',
    position: 'Lead Mentor - Former Executive Secretary, UNECA',
    image: '/assets/img/team/team-4/mentor-1.png',
    type: 'mentor',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '5',
    name: 'Ms. Chileshe Kapwepwe',
    position: 'Senior Mentor - Secretary General, COMESA',
    image: '/assets/img/team/team-4/mentor-2.png',
    type: 'mentor',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: '6',
    name: 'Dr. Olayinka David-West',
    position: 'Technical Mentor - Digital Financial Services Expert',
    image: '/assets/img/team/team-4/mentor-3.png',
    type: 'mentor',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const Partners = () => {
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
              Mentors & Judges
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center space-x-2 text-lg"
            >
              <span>Home</span>
              <span>/</span>
              <span>Mentors & Judges</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Distinguished Panel of Mentors and Judges for the
                ACM Hackathon
              </h2>
            </div>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorsAndJudges.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>

                {/* Content */}
                <div className="relative p-6 text-center">
                  {/* Image */}
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=128&background=3b82f6&color=ffffff`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Name and Position */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {person.position}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {person.socialLinks.linkedin && (
                      <motion.a
                        href={person.socialLinks.linkedin}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        aria-label={`${person.name} LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </motion.a>
                    )}
                    {person.socialLinks.twitter && (
                      <motion.a
                        href={person.socialLinks.twitter}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                        aria-label={`${person.name} Twitter`}
                      >
                        <Twitter size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      person.type === 'judge'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {person.type === 'judge' ? 'Judge' : 'Mentor'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
