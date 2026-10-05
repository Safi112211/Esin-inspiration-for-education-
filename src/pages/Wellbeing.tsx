import { motion } from "motion/react";
import { Heart, Activity, Smile, ShieldCheck, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";
import FieldGallery from "../components/FieldGallery";

export default function Wellbeing() {
  const offerings = [
    {
      title: "The Hope Wall & Expressive Circles",
      desc: "Weekly peer discussions guided by certified Afghan psychologists in Dari and Pashto, using sticky-note Hope Walls and art therapy to share dreams and heal together.",
      icon: <Smile className="w-6 h-6 text-teal-600 dark:text-teal-400" />
    },
    {
      title: "Somatic Breathing & Nervous System Grounding",
      desc: "Audio-led breathing and meditation routines designed to reduce panic attacks, severe anxiety, and distress in high-pressure home environments.",
      icon: <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
    },
    {
      title: "Private Tele-Counseling Consultations",
      desc: "One-on-one confidential consultations for severe depression, isolation-related trauma, and crisis interventions with licensed global clinicians.",
      icon: <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
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
              <div className="label-badge mb-4">Mental Health & Resilience</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Psychosocial Care & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">The Hope Sanctuary</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Empowerment begins with psychological safety. We provide culturally nuanced, confidential mental health services, art therapy, and 'The Hope Wall' circles to restore agency, hope, and emotional strength.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/enroll">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <span>Access Free Wellbeing Care</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="/safe-space">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Explore Safe Space Sanctuary
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
                  src={getImageUrl("field_photo_6")} 
                  alt="Afghan students gathered before 'The Hope Wall' filled with colorful affirmation notes" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[0.72rem] border border-white/10">
                  <div className="font-bold text-teal-300">The Hope Wall (دیوار امید)</div>
                  <div className="text-white/80 text-[0.68rem]">Afghan students expressing their dreams & mutual support</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {offerings.map((item) => (
              <div key={item.title} className="modern-card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Gallery Filtered to Wellbeing & Community */}
      <FieldGallery 
        title="Sisterhood & Wellbeing in the Field"
        subtitle="Witness how art therapy, shared hope walls, and peer circles bring light and emotional safety to Afghan girls."
        initialCategory="wellbeing"
      />
    </motion.div>
  );
}
