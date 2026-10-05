import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Sparkles, BookOpen } from "lucide-react";
import PremiumImage from "./PremiumImage";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] grid lg:grid-cols-12 border-b border-slate-200/80 dark:border-slate-800/80 pt-20 overflow-hidden bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Left Content */}
      <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="label-badge">
              Free & Safe Education in Afghanistan
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[0.75rem] font-semibold text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Safe & Private
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-6">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#0f766e] to-[#14b8a6] dark:from-[#2dd4bf] dark:via-[#14b8a6] dark:to-[#5eead4]">
              Afghan Women & Girls
            </span> <br />
            to Learn, Earn, and Grow.
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mb-10 leading-relaxed font-normal">
            ESIN provides free online school classes, practical job training (like tailoring and computer skills), and friendly mental health support — kept completely safe, private, and free.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link to="/enroll">
              <button className="btn-editorial btn-editorial-primary text-sm py-3.5 px-7 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-teal-700/20 cursor-pointer">
                <span>Join Free as a Student</span>
                <ArrowRight size={16} />
              </button>
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-esin-chat"))}
              className="btn-editorial btn-editorial-secondary text-sm py-3.5 px-6 rounded-xl font-medium inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} className="text-[#0d9488] dark:text-[#2dd4bf]" />
              <span>Ask AI Helper</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                15,200+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Girls Learning
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0d9488] dark:text-[#2dd4bf]">
                82%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Finish Course
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                100%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Free & Private
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Right Image Showcase */}
      <div className="lg:col-span-5 relative p-6 md:p-12 lg:p-14 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full relative max-w-lg"
        >
          {/* Main Visual Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 group">
            <PremiumImage 
              src="/input_file_0.png" 
              alt="Afghan women learning together in classroom sanctuary"
              aspectRatio="aspect-[4/5]"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Visual Caption */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-slate-700/60 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-400/20 text-[#0d9488] dark:text-[#2dd4bf] flex items-center justify-center shrink-0">
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Free Online Classes
                  </div>
                  <div className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                    School subjects, English, coding & certificates
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Pill Badge 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -top-4 -left-4 sm:-left-8 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                100% Safe & Private
              </div>
              <div className="text-[0.68rem] text-slate-500 dark:text-slate-400">
                No real names needed
              </div>
            </div>
          </motion.div>

          {/* Floating Pill Badge 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute top-1/2 -right-4 sm:-right-6 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                500+ Teachers & Mentors
              </div>
              <div className="text-[0.68rem] text-slate-500 dark:text-slate-400">
                Caring support worldwide
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
