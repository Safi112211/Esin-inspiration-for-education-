import { motion } from "motion/react";
import { Shield, Lock, EyeOff, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Enroll() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="pt-32 pb-24 flex items-center justify-center min-h-[80vh] px-6 bg-[#faf8f5] dark:bg-[#090d16]"
      >
        <div className="text-center max-w-lg p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl">
          <div className="w-16 h-16 bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center rounded-2xl mx-auto mb-6">
            <CheckCircle size={36} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            Registration Received
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
            Your registration has been received and encrypted. Our female admissions coordination team will reach out through your specified secure channel within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => setSubmitted(false)}
              className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold"
            >
              Submit Another Application
            </button>
            <Link 
              to="/"
              className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-24 bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg"
    >
      <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Info */}
            <div className="lg:col-span-5">
              <div className="label-badge mb-4">Free & Private Registration</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Sign Up for <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Free Classes</span>
              </h1>
              
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                Join thousands of Afghan girls and women learning for free from home in a safe, friendly community.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      100% Free & Private
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      All classes are completely free. We keep your information private and never share it with anyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <EyeOff size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      Use Any Nickname
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      You do not need to use your real name. Choose any nickname you feel comfortable with.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="modern-card p-8 md:p-10 shadow-xl">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Your Name or Nickname *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g., Soraya or any nickname"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Age Group
                      </label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500">
                        <option>Under 18</option>
                        <option>18–24</option>
                        <option>25–34</option>
                        <option>35+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        City or Province (Optional)
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., Kabul, Herat, Balkh, etc."
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        How Can We Reach You? *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="WhatsApp / Telegram / Email address"
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                      Select What You Want to Learn (Choose any)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Online School & High School Lessons", 
                        "Computer & Coding Skills", 
                        "Tailoring & Sewing Crafts", 
                        "English & Online Translation", 
                        "Safe Student Chat & Mentors", 
                        "Mental Health & Counseling"
                      ].map((interest) => (
                        <label key={interest} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer text-xs text-slate-700 dark:text-slate-300 hover:border-teal-500">
                          <input type="checkbox" className="w-4 h-4 rounded text-teal-600 focus:ring-0 accent-teal-600" />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300 mb-1">
                      <Lock size={14} />
                      <span>Privacy Guarantee</span>
                    </div>
                    <p className="text-[0.72rem] text-slate-600 dark:text-slate-300">
                      All classes are 100% free forever. Your information is safe and never shared.
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-editorial btn-editorial-primary text-xs py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-teal-700/20 cursor-pointer"
                  >
                    Submit Registration (Free)
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
