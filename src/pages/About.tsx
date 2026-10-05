import { motion } from "motion/react";
import { Shield, Users, Target, Heart, CheckCircle2, Sparkles, ArrowRight, BookOpen, Award, DollarSign, Activity, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";
import FieldGallery from "../components/FieldGallery";

export default function About() {
  const values = [
    { 
      title: "Confidential Sanctuary", 
      description: "End-to-end encryption, nickname-based registration, and zero data logging to guarantee student and family safety.",
      icon: <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
    },
    { 
      title: "Women-Led Architecture", 
      description: "Designed, managed, and instructed by Afghan women who understand the cultural nuances and local realities.",
      icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    { 
      title: "Competency & Autonomy", 
      description: "Shifting away from passive aid toward practical, market-tested vocational skills and academic credentials.",
      icon: <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    { 
      title: "Trauma-Informed Care", 
      description: "Caring psychological support and 'Hope Wall' circles embedded directly into learning routines.",
      icon: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
    },
    { 
      title: "100% Free for Every Girl", 
      description: "All classes, offline packs, textbooks, and counseling sessions are provided completely free of charge.",
      icon: <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    }
  ];

  const modelSteps = [
    {
      step: "01",
      name: "Learn",
      nameDari: "آموختن",
      title: "Free Schooling & Digital Skills",
      desc: "Low-bandwidth courses in high school subjects, English, computer basics, and tailoring delivered safely to homes and micro-pods.",
      icon: <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
    },
    {
      step: "02",
      name: "Certify",
      nameDari: "تصدیق‌نامه",
      title: "Recognized Skill Certificates",
      desc: "Every completed academic and vocational track awards accredited completion credentials to build student portfolios.",
      icon: <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      step: "03",
      name: "Earn",
      nameDari: "کسب درآمد",
      title: "Home Jobs & Market Access",
      desc: "Connecting trained tailors, silk artisans, and digital transcribers directly to fair-trade buyers and remote work.",
      icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      step: "04",
      name: "Stabilize",
      nameDari: "پایداری روانی",
      title: "Mental Health & Hope Sanctuary",
      desc: "Trauma healing, peer circles, and 'The Hope Wall' activities led by certified female psychologists in Dari and Pashto.",
      icon: <Activity className="w-5 h-5 text-rose-600 dark:text-rose-400" />
    },
    {
      step: "05",
      name: "Lead",
      nameDari: "رهبری",
      title: "Graduates Becoming Teachers",
      desc: "Alumni return as paid instructors, mentors, and local leaders, multiplying education across new community nodes.",
      icon: <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />
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
          {/* Hero Narrative Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="label-badge mb-4">Inspiration for Education</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Our Story, Mission & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Grassroots Sanctuary</span>
              </h1>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                <p>
                  <strong>ESIN (Empowerment & Safe Interaction Network)</strong> is a women-led grassroots organization operating in Afghanistan. We provide safe, structured access to free education, digital skills, home income opportunities, and psychological care.
                </p>
                <p>
                  When restrictions closed standard schools for girls, ESIN responded immediately with home-based micro-learning pods, offline-first curriculum packs, and encrypted online classrooms.
                </p>
                <p>
                  Today, over <strong>15,000 Afghan women and girls</strong> have been reached through a decentralized network that has scaled from 12 initial pods to over 50 active regional nodes across the country.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/programs">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold">
                    Explore Active Programs
                  </button>
                </Link>
                <Link to="/enroll">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold">
                    Join Free as Student
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900">
                <img 
                  src={getImageUrl("field_photo_1")} 
                  alt="Afghan schoolgirls holding up their textbooks proudly in a safe classroom" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-4 p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800">
                <div className="font-serif-quote italic text-slate-800 dark:text-slate-200 text-sm leading-relaxed mb-2">
                  "Confidentiality. Mutual Respect. Anonymity. Dignity. We are not a political platform; we are a safe, structured empowerment sanctuary for Afghan women and girls."
                </div>
                <div className="text-[0.7rem] font-bold text-[#0d9488] dark:text-[#2dd4bf] uppercase tracking-wider">
                  — ESIN Founding Charter & Field Blueprint
                </div>
              </div>
            </motion.div>
          </div>

          {/* 5-Stage Closed System Model Section (from ESIN Overview) */}
          <div className="mb-24 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="label-badge mb-3">Our Sustainable Model</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                The Closed-Loop <span className="text-[#0d9488] dark:text-[#2dd4bf]">Empowerment Model</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base mt-4">
                ESIN operates through a proven 5-stage closed system that guarantees long-term sustainability: from first lesson to independent leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {modelSteps.map((m, idx) => (
                <div 
                  key={m.name}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between relative shadow-sm hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center">
                        {m.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
                        {m.step}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white mb-0.5">
                      {m.name}
                    </div>
                    <div className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-2">
                      {m.nameDari}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {m.title}
                    </div>
                    <p className="text-[0.75rem] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="modern-card p-8 md:p-10 bg-gradient-to-br from-white to-teal-50/40 dark:from-slate-900 dark:to-teal-950/20"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#0d9488] dark:text-[#2dd4bf] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#2dd4bf]" />
                Our Core Mission
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Structured Access & Practical Autonomy
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                To provide Afghan women and girls with safe, uninterrupted access to certified education, digital skills, independent income pathways, and trauma-informed psychosocial healing.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="modern-card p-8 md:p-10 bg-gradient-to-br from-slate-900 to-teal-950 text-white"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-300" />
                Our Long-Term Vision
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                A Future Where Every Afghan Girl Can Learn and Lead
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A resilient Afghan society where every woman and girl exercises her universal right to knowledge, economic self-determination, and personal dignity without fear or barrier.
              </p>
            </motion.div>
          </div>

          {/* Guiding Principles */}
          <div className="mb-24">
            <div className="mb-12">
              <div className="label-badge mb-3">Foundational Standards</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-4">
                Guiding <span className="text-[#0d9488] dark:text-[#2dd4bf]">Principles</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl">
                Our operations follow strict ethical, humanitarian, and data governance frameworks to ensure zero compromise on participant safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="modern-card p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Field Gallery on About Page */}
      <FieldGallery 
        title="Field Operations in Action"
        subtitle="Explore our active learning nodes, student artwork journals, 'The Hope Wall' wellbeing boards, and community educators."
      />
    </motion.div>
  );
}
