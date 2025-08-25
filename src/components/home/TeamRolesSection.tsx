import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const TeamRolesSection = () => {
  const teamRoles = [
    {
      role: 'Developer',
      emoji: '👨‍💻',
      description: 'Build the technical foundation and implement solutions',
      skills: ['Programming', 'API Development', 'Database Design'],
    },
    {
      role: 'UI/UX Designer',
      emoji: '🎨',
      description: 'Create intuitive and accessible user experiences',
      skills: ['User Research', 'Prototyping', 'Visual Design'],
    },
    {
      role: 'Creative Strategist',
      emoji: '🎬',
      description: 'Develop creative concepts and content strategies',
      skills: ['Content Strategy', 'Storytelling', 'Market Analysis'],
    },
    {
      role: 'Business/Legal Analyst',
      emoji: '⚖️',
      description: 'Ensure business viability and legal compliance',
      skills: ['Business Model', 'Legal Compliance', 'Market Research'],
    },
    {
      role: 'Data Scientist',
      emoji: '📊',
      description: 'Leverage data for insights and optimization (optional)',
      skills: ['Data Analysis', 'Machine Learning', 'Analytics'],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Team Roles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build a diverse team with complementary skills to tackle Africa's
              distribution challenges
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamRoles.map((role, index) => (
            <ScrollAnimation
              key={role.role}
              animation="slideUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{role.emoji}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {role.role}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-[#a8b82a]/10 text-[#4a5f8a] text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
};
