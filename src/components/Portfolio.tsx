import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Search } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Eco-Commerce Platform",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe"],
    image: "https://picsum.photos/seed/eco/800/600",
    description: "A sustainable e-commerce solution with real-time inventory tracking."
  },
  {
    id: 2,
    title: "Crypto Dashboard",
    category: "Web Development",
    tags: ["Next.js", "Tailwind", "D3.js"],
    image: "https://picsum.photos/seed/crypto/800/600",
    description: "Advanced data visualization for multi-chain crypto assets."
  },
  {
    id: 3,
    title: "SEO Growth Engine",
    category: "SEO",
    tags: ["Analytics", "Content Strategy"],
    image: "https://picsum.photos/seed/seo/800/600",
    description: "Increased organic traffic by 400% for a SaaS startup."
  },
  {
    id: 4,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    tags: ["Instagram", "Ads", "Branding"],
    image: "https://picsum.photos/seed/marketing/800/600",
    description: "Viral marketing campaign reaching 2M+ users."
  }
];

const CATEGORIES = ["All", "Web Development", "SEO", "Digital Marketing"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(p => filter === "All" || p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              SELECTED <span className="text-cyan-400">WORKS</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              A collection of projects that push the boundaries of digital experiences and growth.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? "bg-cyan-500 text-black" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {project.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-widest hover:gap-4 transition-all"
                  >
                    VIEW CASE STUDY <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
