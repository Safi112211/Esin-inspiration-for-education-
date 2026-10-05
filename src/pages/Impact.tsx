import { motion } from "motion/react";
import { TrendingUp, Award, Users, BookOpen, MapPin, CheckCircle2, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";
import FieldGallery from "../components/FieldGallery";
import NewsletterSignup from "../components/NewsletterSignup";

export default function Impact() {
  const metrics = [
    { number: "15,240+", label: "Enrolled Afghan Learners", desc: "Active in primary, secondary, and vocational online modules across 18 provinces.", icon: <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" /> },
    { number: "50+ Nodes", label: "Active Safe Pods", desc: "Scaled from 12 initial community nodes to 50+ micro-schools nationwide.", icon: <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> },
    { number: "2,450", label: "Income-Generating Artisans", desc: "Home-based producers actively earning sustainable monthly revenue via international exports.", icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { number: "500+", label: "Afghan Female Teachers", desc: "Local educators receiving regular stipends and teaching kits to lead community classes.", icon: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" /> }
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
              <div className="label-badge mb-4">Audited Field Metrics</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Measurable Impact & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Evidence in the Field</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                In one of the world's most restrictive operational contexts, ESIN combines rigorous evaluation with strict student privacy protocols to deliver proven outcomes and real transformations.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => alert("The 2025-2026 Audited Impact Report (PDF) will be downloaded.")}
                  className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download Annual Impact Report (PDF)</span>
                </button>
                <Link to="/partnerships">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Institutional M&E Data Requests
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
                  src={getImageUrl("field_photo_2")} 
                  alt="Afghan learners actively raising hands and participating in classroom" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* 4 Hero Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {metrics.map((metric) => (
              <div key={metric.label} className="modern-card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    {metric.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {metric.number}
                  </div>
                  <div className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] uppercase tracking-wider mb-2">
                    {metric.label}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Provincial Reach */}
          <div className="modern-card p-8 md:p-12 mb-20">
            <div className="label-badge mb-3">Field Geographic Distribution</div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">
              Active Network Presence Across 18 Afghan Provinces
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-3xl leading-relaxed mb-8">
              Operations span both major urban centers and remote rural nodes through decentralized community hubs, local volunteer coordinators, and peer-to-peer micro-learning groups.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {["Kabul", "Herat", "Mazar-i-Sharif", "Bamyan", "Jalalabad", "Kandahar", "Kunduz", "Badakhshan", "Balkh", "Ghazni", "Parwan", "Panjshir"].map((city) => (
                <div key={city} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{city}</div>
                  <div className="text-[0.65rem] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Active Sanctuary</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Field Gallery on Impact */}
      <FieldGallery 
        title="Field Evidence: Photos from Afghanistan"
        subtitle="Unfiltered photographic documentation showing active study circles, hope walls, and local teaching centers."
      />

      <section className="px-6 md:px-12 lg:px-20 mt-12">
        <div className="max-w-7xl mx-auto">
          {/* Monthly Updates Banner */}
          <NewsletterSignup variant="banner" />
        </div>
      </section>
    </motion.div>
  );
}
