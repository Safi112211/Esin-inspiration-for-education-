import { motion } from "motion/react";
import { Download, FileText, BookOpen, Shield, Headphones, Video, ExternalLink, CheckCircle } from "lucide-react";
import { getImageUrl } from "../assets/images";

export default function Resources() {
  const resources = [
    { title: "English for Academic Fluency: Level 1 Starter Kit", type: "PDF & Audio Bundle", size: "14.2 MB", category: "Language", downloads: "5,800+", desc: "Complete vocabulary worksheets, grammar drills, audio pronunciation guides, and reading comprehension exercises." },
    { title: "Digital Security & Anti-Surveillance Toolkit for Afghan Women", type: "Guide & Checklist", size: "4.8 MB", category: "Security", downloads: "8,900+", desc: "Step-by-step instructions on secure VPN setup, browser metadata clearing, Signal app safety, and device wipe triggers." },
    { title: "Home-Based Textile Artisan Curriculum & Patterns", type: "Visual Manual", size: "28.5 MB", category: "Vocational", downloads: "3,200+", desc: "High-resolution pattern diagrams, modern thread color palettes, quality control grading sheets, and finishing guides." },
    { title: "Somatic Distress Relief & Breathing Routines (Dari & Pashto)", type: "Audio MP3 Series", size: "32.0 MB", category: "Mental Health", downloads: "4,600+", desc: "Guided calming audio sessions for anxiety management, insomnia, and trauma stabilization by Afghan clinicians." },
    { title: "Introduction to Freelance Translation & Remote Work", type: "PDF Handbook", size: "8.1 MB", category: "Economic", downloads: "2,900+", desc: "How to create anonymous freelance portfolios, format translation deliverables, and receive cross-border remittances." },
    { title: "Secondary School Mathematics & Science Review Sheets (Grades 7-12)", type: "PDF Pack", size: "22.4 MB", category: "Education", downloads: "6,400+", desc: "Comprehensive formula review, algebra exercises, biology diagrams, and chemistry summaries for self-study." }
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
              <div className="label-badge mb-4">Open Knowledge Sanctuary</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Open Resource & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Curriculum Repository</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                All educational kits, digital security checklists, and vocational manuals are freely accessible, lightweight, and engineered for low-bandwidth mobile devices.
              </p>

              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-xs font-semibold text-[#0d9488] dark:text-[#2dd4bf]">
                  ✓ 100% Free & Open Access
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  ✓ Low-Bandwidth Compressed
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  ✓ Available in Dari & Pashto
                </span>
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
                  src={getImageUrl("/input_file_10.png")} 
                  alt="Afghan learners studying open educational material" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <div key={res.title} className="modern-card p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-500 dark:text-slate-400 font-semibold mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {res.category}
                    </span>
                    <span className="text-[#0d9488] dark:text-[#2dd4bf] font-mono">{res.size}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[0.68rem] text-slate-400 font-medium">{res.downloads} downloads</span>
                  <button 
                    onClick={() => alert(`Starting download for: ${res.title}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
