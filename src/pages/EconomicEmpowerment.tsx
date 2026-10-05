import { motion } from "motion/react";
import { Briefcase, ShoppingBag, Globe, TrendingUp, CheckCircle, ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";

export default function EconomicEmpowerment() {
  const tracks = [
    {
      title: "Artisan Textiles & High-Finish Tailoring",
      icon: <ShoppingBag className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      desc: "Traditional silk embroidery, garment tailoring, and bespoke craft production connected directly to fair-trade buyers in North America and Europe.",
      outcomes: "2,450+ artisans earning an average of $85/month from home."
    },
    {
      title: "Remote Digital Freelancing & Translation",
      icon: <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      desc: "English-Dari-Pashto translation, content labeling, transcription, and virtual administrative support for international NGOs and clients.",
      outcomes: "740+ women active on secure freelance platforms."
    },
    {
      title: "Micro-Grant Capital & Enterprise Launchpad",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      desc: "Zero-interest equipment loans, raw textile subsidies, digital wallet setup, and business budgeting education.",
      outcomes: "410 home-based businesses successfully sustained over 18+ months."
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
              <div className="label-badge mb-4">Financial Autonomy</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Economic <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Empowerment & Enterprise</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Transforming creative craftsmanship and digital competence into sustainable, home-based livelihoods that protect dignity and provide real economic independence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/enroll">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <span>Join Vocational Track</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="/partnerships">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Wholesale & Fair Trade Partnerships
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
                  src={getImageUrl("/input_file_3.png")} 
                  alt="Afghan women engaged in traditional hand embroidery and artisan crafts" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Core Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {tracks.map((track) => (
              <div key={track.title} className="modern-card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    {track.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {track.desc}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50">
                  <div className="text-[0.68rem] font-bold uppercase text-teal-800 dark:text-teal-300 mb-0.5">
                    Field Impact Metric
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                    {track.outcomes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
