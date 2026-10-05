import { motion } from "motion/react";
import { ArrowRight, BookOpen, Monitor, DollarSign, MessageCircle, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    badge: "Learning",
    title: "Online School & Lessons",
    description: "Free school courses, English lessons, study kits, and university exam preparation.",
    link: "/learning-hub",
    highlight: "12,000+ Students"
  },
  {
    icon: <Monitor className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Digital Skills",
    title: "Computer & AI Skills",
    description: "Easy-to-follow coding, web design, computer basics, and safe internet tips.",
    link: "/learning-hub",
    highlight: "Works Offline"
  },
  {
    icon: <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    badge: "Work & Income",
    title: "Tailoring & Craft Jobs",
    description: "Step-by-step training in sewing, silk embroidery, and remote freelance work from home.",
    link: "/economic-empowerment",
    highlight: "2,450 Earning"
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    badge: "Private Community",
    title: "Safe Student Community",
    description: "A private, girls-only space to make friends, share stories, and get encouragement from female mentors.",
    link: "/safe-space",
    highlight: "Girls-Only Space"
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
    badge: "Mental Health",
    title: "Counseling & Stress Relief",
    description: "Free group and individual counseling with kind Afghan psychologists in Dari and Pashto.",
    link: "/wellbeing",
    highlight: "Free & Caring"
  },
  {
    icon: <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
    badge: "Safety Guarantee",
    title: "100% Privacy Protection",
    description: "Zero personal data recorded. Use any nickname to stay safe, private, and worry-free.",
    link: "/safe-space",
    highlight: "No Tracking"
  }
];

export default function ConsultancyServices() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-[#faf8f5] dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="label-badge mb-4">What We Offer</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Our 6 Main Programs <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">For Afghan Girls & Women</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-md text-base md:text-lg leading-relaxed">
            Clear, practical programs designed to keep girls learning, earning, and feeling supported every single day.
          </p>
        </div>

        {/* Modern Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="modern-card p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <span className="text-[0.68rem] font-bold text-[#0d9488] dark:text-[#2dd4bf] bg-teal-50 dark:bg-teal-950/60 border border-teal-200/50 dark:border-teal-800/50 px-2.5 py-1 rounded-full">
                    {pillar.highlight}
                  </span>
                </div>

                <div className="text-[0.7rem] font-mono font-semibold uppercase text-slate-400 dark:text-slate-500 mb-1 tracking-wider">
                  {pillar.badge}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#0d9488] dark:group-hover:text-[#2dd4bf] transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <Link 
                to={pillar.link}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2dd4bf] pt-4 border-t border-slate-100 dark:border-slate-800/80 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
