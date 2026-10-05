import { motion } from "motion/react";
import { BookOpen, Monitor, Briefcase, MessageCircle, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";

export default function Programs() {
  const programs = [
    {
      id: "education",
      title: "Online School & High School Lessons",
      icon: <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      tagline: "High-quality school lessons, study kits, and exam preparation from home.",
      items: ["High school lessons in math, science, and languages", "Study groups and live online classes with female teachers", "Catch-up classes for students who missed school", "University exam prep and English lessons", "Official completion certificates for every course"],
      methodology: "How it works: Step-by-step video & audio lessons with friendly teacher feedback.",
      image: getImageUrl("/input_file_0.png"),
      link: "/learning-hub",
      badge: "Free Education"
    },
    {
      id: "digital",
      title: "Computer & Internet Skills",
      icon: <Monitor className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tagline: "Easy computer basics, coding, and safe internet tips that work offline.",
      items: ["Typing, Word, Excel, and computer basics", "How to use the internet safely and privately", "Downloadable lessons that work without strong internet", "Practical English for online communication", "Beginner coding and creative digital tools"],
      methodology: "How it works: Works on low-cost smartphones and computers with offline downloads.",
      image: getImageUrl("/input_file_12.png"),
      link: "/learning-hub",
      badge: "Tech Skills"
    },
    {
      id: "economic",
      title: "Tailoring, Embroidery & Home Jobs",
      icon: <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tagline: "Learn sewing, carpet crafts, and remote freelance work to earn money.",
      items: ["Professional tailoring and clothing design", "Traditional Afghan silk embroidery and handicrafts", "Remote online typing and translation work", "Help selling crafts to buyers worldwide", "Simple budgeting and money management"],
      methodology: "How it works: Learn the craft → Build your items → Sell safely for fair pay.",
      image: getImageUrl("/input_file_3.png"),
      link: "/economic-empowerment",
      badge: "Earn from Home"
    },
    {
      id: "safe-space",
      title: "Safe Student Community",
      icon: <MessageCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      tagline: "A private, girls-only space to chat, make friends, and find mentors.",
      items: ["Private girls-only online chat rooms", "Join using any nickname (no real names needed)", "Helpful female mentors from around the world", "Creative writing, art, and poetry clubs", "A welcoming space with zero judgment"],
      methodology: "How it works: 100% private and protected with trained female moderators.",
      image: getImageUrl("/input_file_2.png"),
      link: "/safe-space",
      badge: "Safe Space"
    },
    {
      id: "wellbeing",
      title: "Mental Health & Counseling",
      icon: <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      tagline: "Free, caring counseling and stress relief to help you feel your best.",
      items: ["Friendly group talk circles with Afghan female counselors", "Easy breathing and stress-relief exercises", "Help dealing with anxiety, sadness, and isolation", "Basic family health and wellness advice", "Free private 1-on-1 counseling calls"],
      methodology: "How it works: Private, confidential sessions led by licensed therapists in Dari & Pashto.",
      image: getImageUrl("/input_file_11.png"),
      link: "/wellbeing",
      badge: "Emotional Support"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-24 bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg"
    >
      <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="label-badge mb-4">What We Offer</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Our Programs for <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">Afghan Girls & Women</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Explore our free online school classes, job skills and tailoring courses, safe student community, and mental health counseling. Everything is 100% free and confidential.
            </p>
          </div>

          {/* Program Cards */}
          <div className="flex flex-col gap-12">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="modern-card p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 px-3 py-1 rounded-full">
                      {program.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      PROGRAM 0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                    {program.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
                    {program.tagline}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {program.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={16} className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 mb-8">
                    <div className="text-[0.68rem] uppercase font-bold text-teal-700 dark:text-teal-400 mb-1">
                      How It Works
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {program.methodology}
                    </p>
                  </div>

                  <Link 
                    to={program.link}
                    className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2"
                  >
                    <span>View Course Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 dark:border-slate-800 aspect-[4/3] bg-slate-900 group">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
