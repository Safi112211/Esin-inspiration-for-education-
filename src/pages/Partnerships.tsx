import { motion } from "motion/react";
import { Globe, ShieldCheck, HeartHandshake, FileText, ArrowRight, Building, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";

export default function Partnerships() {
  const models = [
    {
      icon: <Building className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: "Academic & University Alliances",
      desc: "Co-developing accredited distance courses, remote degree pathways, faculty mentorship exchanges, and language training labs."
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Institutional Grants & Philanthropy",
      desc: "Direct funding for student offline kits, internet connectivity micro-grants, underground venue subsidies, and teacher stipends."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Fair-Trade Artisan Procurement",
      desc: "Commercial partnerships with international ethical fashion brands, museum gift shops, and online retailers for Afghan handicraft exports."
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="label-badge mb-4">Institutional Collaboration</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Global Alliances & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Strategic Partnerships</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                We partner with international academic institutions, foundations, and ethical brands to amplify educational access and economic opportunities for Afghan women.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <span>Propose Institutional Partnership</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="/about">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Review Governance Charter
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 aspect-[4/3]">
                <img 
                  src={getImageUrl("/input_file_6.png")} 
                  alt="Afghan women collaborating in learning sanctuary" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Models */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <div key={model.title} className="modern-card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    {model.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {model.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {model.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
