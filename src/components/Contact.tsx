import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Send, Mail, MessageSquare, User, Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#", color: "text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "text-cyan-400" },
    { name: "WhatsApp", icon: MessageCircle, href: "#", color: "text-green-500" },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase">
              LET'S <span className="text-cyan-400">CONNECT</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-md leading-relaxed">
              Ready to take your digital presence to the next level? Drop me a message and let's build something extraordinary together.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Me</p>
                  <p className="text-lg font-medium">hello@nexusbrand.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Live Chat</p>
                  <p className="text-lg font-medium">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-6">Follow Me</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={cn("w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-colors hover:border-cyan-500/50", social.color)}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    {...register("name")}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    {...register("email")}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 focus:outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 block">Your Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-cyan-500 focus:outline-none transition-all"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : (
                  <>
                    SEND MESSAGE <Send size={18} />
                  </>
                )}
              </button>

              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center text-sm font-bold"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
