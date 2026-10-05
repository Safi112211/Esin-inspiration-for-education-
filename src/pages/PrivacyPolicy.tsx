import { motion } from "motion/react";
import { Shield, Lock, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Zero-Knowledge Encryption",
      content: "All digital transmissions across the ESIN platform utilize TLS 1.3 in transit and AES-256 at rest. Interactive student discussions and mentoring sessions occur via end-to-end encrypted pipelines that do not store identifiable packet logs."
    },
    {
      title: "Anonymous & Pseudonymous Participation",
      content: "Learners have the explicit right to participate in any curriculum track, discussion circle, or webinar under a pseudonym. We do not require legal names, physical addresses, or national identity numbers."
    },
    {
      title: "Data Minimization & Ephemeral Logging",
      content: "We collect only the bare technical metadata required to deliver compressed learning bundles. Connection logs are automatically wiped every 24 hours, preventing historical forensic tracing."
    },
    {
      title: "Protection from Sexual Exploitation & Abuse (PSEA)",
      content: "Our organization enforces strict zero-tolerance PSEA standards in full compliance with United Nations and international humanitarian guidelines. Every mentor and volunteer undergoes verified safeguarding background checks."
    },
    {
      title: "Child Protection Standards",
      content: "Minors participating in secondary educational continuity tracks are protected by specialized safeguarding protocols, supervised study circles, and dedicated child welfare focal points."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-24 bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg"
    >
      <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="label-badge mb-4">Security & Safeguarding Charter</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Safe Digital Space & <br />
              <span className="text-[#0d9488] dark:text-[#2dd4bf]">Privacy Architecture</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              At ESIN, privacy is not merely a policy—it is the foundational prerequisite for personal safety, human dignity, and educational access in Afghanistan.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="modern-card p-8"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Shield size={16} />
                  </div>
                  <span>{section.title}</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-11">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Safeguarding Box */}
          <div className="p-8 md:p-10 rounded-3xl bg-slate-900 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">
                PSEA Compliance & Confidential Reporting
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              If you ever observe, experience, or suspect any form of harassment, exploitation, or breach of confidentiality within any ESIN program, you may submit a confidential report directly to our external Safeguarding Committee.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-3 px-6 rounded-xl transition-colors">
                  Contact Safeguarding Focal Point
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
