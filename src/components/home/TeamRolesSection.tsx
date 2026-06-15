import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';

export const TeamRolesSection = () => {
  const teamRoles = [
    {
      role: 'Software Developer/Engineer',
      emoji: '👨‍💻',
      description: 'Build the technical foundation, low-bandwidth APIs, and secure real-time protocols.',
      skills: ['Low-bandwidth APIs', 'Offline storage', 'Performance optimization', 'Real-time protocols'],
    },
    {
      role: 'UI/UX Designer',
      emoji: '🎨',
      description: 'Create intuitive, lightweight, and data-saving user experiences optimized for gamers.',
      skills: ['Responsive interfaces', 'Data-saving patterns', 'Gaming dashboard layout', 'User research'],
    },
    {
      role: 'Gaming/Esports Strategist',
      emoji: '🎮',
      description: 'Design tournament structures, game mechanics, monetization paths, and player engagement loops.',
      skills: ['Tournament formats', 'Esports ecosystem dev', 'Gaming monetization', 'Player engagement'],
    },
    {
      role: 'Business & Product Strategist',
      emoji: '📈',
      description: 'Determine product market-readiness, entry tactics, partnership options, and scaling models.',
      skills: ['Business modeling', 'Market entry strategies', 'Partnership development', 'Scaling models'],
    },
    {
      role: 'AI/Data/Infrastructure Specialist',
      emoji: '🖥️',
      description: 'Design matchmaking systems, manage network latency issues, and perform data analytics.',
      skills: ['Predictive analytics', 'Network latency modeling', 'Matchmaking algorithms', 'Infrastructure optimization'],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who is Participating?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gathering <strong>75+ young African innovators</strong> (age range 20–35) across 5 core roles to collaborate and build high-impact solutions.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamRoles.map((role, index) => (
            <ScrollAnimation
              key={role.role}
              animation="slideUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="text-center mb-4 flex-1">
                  <div className="text-6xl mb-4">{role.emoji}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {role.role}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-2 mt-auto">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Key Focus Skills:
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
