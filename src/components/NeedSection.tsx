import { motion } from "motion/react";
import { GraduationCap, Briefcase, HeartHandshake, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NeedSection() {
  const needs = [
    {
      icon: <GraduationCap size={24} className="text-teal-600 dark:text-teal-400" />,
      tag: "Education",
      title: "Schools Are Closed for Girls",
      description: "Over 1.4 million girls cannot attend secondary school or university. We provide free online classes, offline study packages, and helpful study groups so learning never stops.",
      link: "/learning-hub",
      action: "See Online Classes"
    },
    {
      icon: <Briefcase size={24} className="text-amber-600 dark:text-amber-400" />,
      tag: "Jobs & Income",
      title: "Hard to Earn a Living",
      description: "Women face strict limits on working outside. We teach practical skills like tailoring, embroidery, and remote computer freelancing to help women earn money safely from home.",
      link: "/economic-empowerment",
      action: "See Job Skills & Crafts"
    },
    {
      icon: <HeartHandshake size={24} className="text-rose-600 dark:text-rose-400" />,
      tag: "Mental Health",
      title: "Stress, Isolation & Sadness",
      description: "Being locked out of society causes deep emotional distress. We offer free, caring counseling circles in Dari and Pashto, plus simple daily stress-relief exercises.",
      link: "/wellbeing",
      action: "Get Emotional Support"
    },
    {
      icon: <ShieldCheck size={24} className="text-emerald-600 dark:text-emerald-400" />,
      tag: "Safety & Privacy",
      title: "100% Private & Safe",
      description: "Staying safe online is our top priority. Students can join without using real names, personal data is never recorded, and conversations are always private.",
      link: "/safe-space",
      action: "Learn About Privacy"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#faf8f5] dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="label-badge mb-4">Why This Matters</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              The 4 Biggest Challenges <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">And How We Help</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              School bans have left millions of Afghan girls at home. Here is how our programs provide real, practical, and safe solutions.
            </p>
          </motion.div>
        </div>

        {/* Modern Needs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {needs.map((need, index) => (
            <motion.div
              key={need.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="modern-card p-8 md:p-10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {need.icon}
                  </div>
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 rounded-full">
                    {need.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#0d9488] dark:group-hover:text-[#2dd4bf] transition-colors">
                  {need.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  {need.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <Link
                  to={need.link}
                  className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>{need.action}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
