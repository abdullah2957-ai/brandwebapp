import { motion } from "motion/react";
import { Search, Globe, Smartphone, BarChart, MessageSquare, Instagram, Linkedin, Facebook } from "lucide-react";
import { toast } from "sonner";

const SERVICES = [
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Rank higher on Google and drive organic traffic that converts into customers.",
    price: 499,
    icon: Search,
    color: "cyan"
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Custom, high-performance websites built with modern tech stacks like React and Node.js.",
    price: 999,
    icon: Globe,
    color: "purple"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Full-funnel marketing strategies across paid search, social, and email.",
    price: 799,
    icon: BarChart,
    color: "pink"
  },
  {
    id: "social-media",
    title: "Social Optimization",
    description: "LinkedIn, Instagram, and Facebook profile optimization for maximum authority.",
    price: 299,
    icon: Instagram,
    color: "orange"
  },
  {
    id: "gmb",
    title: "Google Business",
    description: "Optimize your local presence and dominate your neighborhood search results.",
    price: 199,
    icon: Smartphone,
    color: "green"
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    description: "Scale your customer support and sales with intelligent WhatsApp bots.",
    price: 399,
    icon: MessageSquare,
    color: "emerald"
  }
];

export default function Services() {
  const handleHire = async (service: typeof SERVICES[0]) => {
    toast.promise(
      fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: service.id, title: service.title, price: service.price }],
          successUrl: window.location.origin + "/success",
          cancelUrl: window.location.origin + "/cancel"
        })
      }),
      {
        loading: "Initializing secure checkout...",
        success: (data) => {
          return `Redirecting to payment gateway...`;
        },
        error: "Failed to initialize checkout. Please try again."
      }
    );
  };

  return (
    <section id="services" className="py-24 px-6 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
          >
            SERVICES <span className="text-purple-500">MARKETPLACE</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional solutions tailored to scale your business in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="text-purple-500" size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest block">Starting at</span>
                  <span className="text-2xl font-black text-white">${service.price}</span>
                </div>
                <button
                  onClick={() => handleHire(service)}
                  className="px-6 py-3 bg-white text-black font-bold text-xs rounded-full hover:bg-purple-500 hover:text-white transition-all"
                >
                  HIRE ME
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
