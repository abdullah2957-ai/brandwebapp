import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    text: "Nexus Digital transformed our online presence. Our organic traffic tripled in just 6 months. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Founder, EcoStore",
    text: "The web development team is top-notch. They built a complex e-commerce site that's lightning fast and beautiful.",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, GlobalReach",
    text: "Their social media optimization strategy is a game-changer. Our engagement rates have never been higher.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
            CLIENT <span className="text-cyan-400">SUCCESS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my amazing clients have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-cyan-500/50" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-cyan-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-400 italic text-sm leading-relaxed flex-grow">
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
