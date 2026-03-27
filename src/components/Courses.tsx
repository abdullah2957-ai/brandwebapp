import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Lock, ChevronRight, Star } from "lucide-react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";

const COURSES = [
  {
    id: "seo-mastery",
    title: "SEO Mastery 2026",
    description: "The complete guide to ranking #1 on Google in the AI era.",
    price: 199,
    rating: 4.9,
    students: 1200,
    thumbnail: "https://picsum.photos/seed/seo-course/800/600",
    category: "SEO"
  },
  {
    id: "web-dev-bootcamp",
    title: "Full-Stack Web Dev",
    description: "Master React, Node.js, and Three.js for high-end web experiences.",
    price: 299,
    rating: 4.8,
    students: 850,
    thumbnail: "https://picsum.photos/seed/web-course/800/600",
    category: "Web Development"
  },
  {
    id: "digital-marketing-pro",
    title: "Digital Marketing Pro",
    description: "Scale your business with advanced paid ads and content strategy.",
    price: 149,
    rating: 4.7,
    students: 2100,
    thumbnail: "https://picsum.photos/seed/marketing-course/800/600",
    category: "Digital Marketing"
  }
];

export default function Courses() {
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserPurchases(userDoc.data().purchasedCourses || []);
        }
      } else {
        setUserPurchases([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBuy = async (courseId: string) => {
    toast.info(`Redirecting to payment for ${courseId}...`, {
      description: "This is a simulated checkout process."
    });
  };

  return (
    <section id="courses" className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
              LEARNING <span className="text-orange-500">PLATFORM</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              Level up your skills with industry-leading courses designed for the modern digital landscape.
            </p>
          </div>
          <a href="#" className="text-orange-500 font-bold tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
            VIEW ALL COURSES <ChevronRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, idx) => {
            const isPurchased = userPurchases.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-orange-400 border border-orange-500/30">
                    {course.category}
                  </div>
                  {isPurchased && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                        <Play className="text-black fill-current" size={20} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{course.students.toLocaleString()} Students</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-2xl font-black">${course.price}</span>
                    {isPurchased ? (
                      <button className="px-6 py-2 bg-white/10 text-white font-bold text-xs rounded-full hover:bg-white/20 transition-all">
                        RESUME
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuy(course.id)}
                        className="px-6 py-2 bg-orange-500 text-black font-bold text-xs rounded-full hover:bg-orange-400 transition-all"
                      >
                        BUY NOW
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
