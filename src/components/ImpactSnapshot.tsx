import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, CheckCircle, Award, Users, BookOpen } from "lucide-react";
import PremiumImage from "./PremiumImage";

const stats = [
  { label: "Girls & Women Learning", value: "15,240+", icon: <Users size={20} className="text-teal-600 dark:text-teal-400" /> },
  { label: "Lessons Completed", value: "48,500+", icon: <BookOpen size={20} className="text-indigo-600 dark:text-indigo-400" /> },
  { label: "Women Earning from Home", value: "2,450", icon: <TrendingUp size={20} className="text-emerald-600 dark:text-emerald-400" /> },
  { label: "Scholarships Won", value: "850+", icon: <Award size={20} className="text-amber-600 dark:text-amber-400" /> }
];

export default function ImpactSnapshot() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#faf8f5] dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="label-badge mb-4">Our Real Results</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
              Real Progress for <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">Afghan Women & Girls</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-8">
              We check every program regularly to ensure students are learning real skills, earning money from home, and finding hope and friendship.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/impact">
                <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer">
                  <span>See Our Full Results</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
              <PremiumImage 
                src="/input_file_7.png" 
                alt="Afghan girls engaged in educational study and writing"
                aspectRatio="aspect-[16/10]"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/30 dark:border-slate-700/50 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">Active Online Study Groups</span>
                <span className="font-mono text-[#0d9488] dark:text-[#2dd4bf] font-bold">Kabul, Herat & Across Afghanistan</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="modern-card p-6 md:p-8 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
