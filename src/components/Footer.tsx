import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tighter mb-2">
              NEXUS_BRAND
            </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              Empowering businesses through cutting-edge digital experiences and strategic growth.
            </p>
          </div>

          <div className="flex gap-6">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-400 transition-all"
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-gray-600 text-xs tracking-widest uppercase">
            © 2026 NEXUS BRAND. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 text-xs hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-gray-600 text-xs hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
