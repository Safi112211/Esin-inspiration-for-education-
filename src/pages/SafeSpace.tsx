import { motion } from "motion/react";
import { Shield, Lock, Users, MessageSquare, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";
import FieldGallery from "../components/FieldGallery";

export default function SafeSpace() {
  const pillars = [
    {
      icon: <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      title: "Zero-Knowledge Privacy",
      desc: "Encrypted communications and alias-based participation ensure that no personal identifiers are ever stored or exposed."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Women-Only Moderated Circles",
      desc: "Every peer circle is facilitated by trusted Afghan women moderators trained in psychological first aid and safeguarding protocols."
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: "Art & Creative Expression",
      desc: "Students express their feelings, dreams of freedom (صلح و آزادی), and solidarity through writing journals and group art."
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
              <div className="label-badge mb-4">Confidential Community</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                A Confidential <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Sanctuary for Women</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                In an environment of extreme social restriction, ESIN provides a secure digital and physical haven where Afghan women and girls connect, express their voices, and find mutual solidarity without fear.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/enroll">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <span>Request Confidential Entry</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="/privacy">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Read Security Architecture
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
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 aspect-[4/3] relative group">
                <img 
                  src={getImageUrl("field_photo_5")} 
                  alt="Afghan women gathered in a safe carpet-seated sisterhood circle surrounded by student wall art" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[0.72rem] border border-white/10">
                  <div className="font-bold text-teal-300">The Sisterhood Circle</div>
                  <div className="text-white/80 text-[0.68rem]">Safe community sanctuary in Afghanistan</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="modern-card p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Gallery Filtered to Community */}
      <FieldGallery 
        title="Sanctuary in Action: Real Moments"
        subtitle="Explore our safe spaces, creative expression journals, and student art circles."
        initialCategory="community"
      />
    </motion.div>
  );
}
