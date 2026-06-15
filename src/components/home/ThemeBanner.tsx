import { motion } from 'framer-motion';
import { Gamepad2, Cpu } from 'lucide-react';

export const ThemeBanner = () => {
  return (
    <div className="bg-slate-950 py-10 relative overflow-hidden border-y border-slate-800">
      {/* Background grids/gradients */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-gradient-to-r from-[#a8b82a]/20 to-[#4a5f8a]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a8b82a] to-[#4a5f8a] flex items-center justify-center shadow-lg shadow-[#a8b82a]/20 flex-shrink-0">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-[#a8b82a] text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                2026 Hackathon Theme
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                CONNECTED PLAY
              </h2>
            </div>
          </div>

          <div className="h-px w-full md:h-12 md:w-px bg-slate-800 flex-shrink-0"></div>

          <p className="text-slate-300 font-medium text-lg text-center md:text-left max-w-xl leading-relaxed flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#4a5f8a] hidden sm:block flex-shrink-0" />
            Hacking Africa’s Future Through Low-Bandwidth Esports Infrastructure
          </p>
        </motion.div>
      </div>
    </div>
  );
};
