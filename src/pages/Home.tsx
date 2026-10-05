import Hero from "../components/Hero";
import NeedSection from "../components/NeedSection";
import ConsultancyServices from "../components/ConsultancyServices";
import ImpactSnapshot from "../components/ImpactSnapshot";
import FieldGallery from "../components/FieldGallery";
import InternationalAlignment from "../components/InternationalAlignment";
import NewsletterSignup from "../components/NewsletterSignup";
import { motion } from "motion/react";
import { Heart, Sparkles, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#faf8f5] dark:bg-[#090d16]"
    >
      <Hero />
      
      {/* Real Field Gallery Section */}
      <FieldGallery 
        title="Real Moments from Our Classrooms in Afghanistan"
        subtitle="See how Afghan girls and women are studying with free textbooks, creating art journals, writing on 'The Hope Wall', and learning from dedicated female teachers."
      />

      <NeedSection />
      <ConsultancyServices />
      <ImpactSnapshot />
      <InternationalAlignment />

      {/* Monthly Updates & Newsletter Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup variant="card" />
        </div>
      </section>
      
      {/* Modern High-Impact Call to Action */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle Background Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-teal-200 mb-6">
            <Sparkles size={14} className="text-amber-300" />
            Make a Real Difference Today
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Support Afghan Girls. <br />
            <span className="text-teal-300">Change Future Generations.</span>
          </h2>
          
          <p className="text-teal-50/80 text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Your gift buys offline study packs, sewing machines, friendly counseling, and full scholarships for girls who cannot attend school.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl">
              <div className="text-lg font-bold text-white mb-1">Study Starter</div>
              <div className="text-[0.7rem] uppercase tracking-wider text-teal-300 font-semibold mb-3">$35 / Month</div>
              <p className="text-xs text-white/80 leading-relaxed">
                Provides offline learning packs and internet data cards for 2 students.
              </p>
            </div>
            
            <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-2xl relative">
              <div className="absolute -top-3 right-6 bg-amber-500 text-white text-[0.65rem] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
                Popular Choice
              </div>
              <div className="text-lg font-bold text-slate-900 mb-1">Sewing & Craft Kit</div>
              <div className="text-[0.7rem] uppercase tracking-wider text-teal-700 font-semibold mb-3">$120 One-Time</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides a woman with a sewing machine, fabrics, and help selling her handmade items.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl">
              <div className="text-lg font-bold text-white mb-1">Full 1-Year Scholarship</div>
              <div className="text-[0.7rem] uppercase tracking-wider text-teal-300 font-semibold mb-3">$500 / Year</div>
              <p className="text-xs text-white/80 leading-relaxed">
                Funds a full year of online school, personal mentorship, and counseling support.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("open-donation-modal"))}
              className="bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm py-3.5 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <Heart size={16} className="fill-current text-rose-500" />
              <span>Make a Donation</span>
            </button>
            <Link 
              to="/enroll"
              className="bg-teal-800/60 hover:bg-teal-700/60 border border-white/20 text-white font-semibold text-sm py-3.5 px-6 rounded-xl backdrop-blur-md transition-all inline-flex items-center gap-2"
            >
              <span>Join Free as Student</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
