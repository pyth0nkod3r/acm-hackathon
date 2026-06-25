import { motion } from 'framer-motion';
import { Container } from '../layout';
import { ScrollAnimation } from '../animations';
import { Gamepad2, Zap, WifiOff, Users } from 'lucide-react';

export const WhyEsportsSection = () => {
  const points = [
    {
      title: 'Massive Youth Demographic',
      description:
        "Over 60% of Africa's population is under the age of 25, representing the world's largest digital-native cohort eager for competitive play.",
      icon: Users,
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Explosive Gaming Growth',
      description:
        'African mobile gaming is growing at an unprecedented rate, capturing global market attention and creating new economic pathways.',
      icon: Gamepad2,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Infrastructure Bottlenecks',
      description:
        'Esports is throttled by expensive data costs, weak networks, and high latency. Low-bandwidth infrastructure is the key to unlocking accessibility.',
      icon: WifiOff,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Building Local Value',
      description:
        'Creating local tournament platforms and servers reduces latency and keeps digital revenues within the local developer ecosystem.',
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c2d72f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#c2d72f] font-semibold text-lg mb-4 block uppercase tracking-wider">
              Esports Landscape
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Why Esports? Why Now?
            </h2>
            <p className="text-lg text-slate-300">
              Africa has the fastest-growing youth population and mobile
              connectivity. However, infrastructure gaps limit access to
              competitive gaming. The future of esports belongs to
              low-bandwidth, low-data innovation.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 lg:mx-10">
          {points.map((point, index) => (
            <ScrollAnimation
              key={point.title}
              animation="slideUp"
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/60 flex gap-6 h-full"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <point.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </section>
  );
};
