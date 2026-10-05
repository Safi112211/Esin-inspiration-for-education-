import { motion } from "motion/react";
import { Shield, CheckCircle2, Lock, BarChart3, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const alignments = [
  {
    title: "Student Safety First",
    description: "Strict safety rules for children and young women in all classes and online groups.",
    icon: <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
  },
  {
    title: "Regular Quality Checks",
    description: "Every course is reviewed to make sure students gain real, useful skills and certificates.",
    icon: <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
  },
  {
    title: "Zero Tolerance for Harm",
    description: "Trained female staff, respectful mentors, and safe private reporting channels for all.",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
  },
  {
    title: "100% Privacy Protection",
    description: "No real names required, encrypted chats, and zero personal data saved or shared.",
    icon: <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
  }
];

export default function InternationalAlignment() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#faf8f5] dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="label-badge mb-4">Trusted Worldwide</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
              Global Standards & <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">Safety Guarantees</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
              ESIN is built to work with international charities, foundations, and universities. We maintain strict safety, quality, and privacy in everything we do.
            </p>
            
            <div className="flex flex-wrap gap-2.5 mb-8">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Quality Education for All
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Equal Rights for Girls
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Fair Income & Jobs
              </span>
            </div>

            <Link to="/partnerships">
              <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold cursor-pointer">
                Learn About Partnering With Us
              </button>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {alignments.map((alignment, index) => (
              <motion.div
                key={alignment.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="modern-card p-6 md:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    {alignment.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {alignment.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {alignment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
