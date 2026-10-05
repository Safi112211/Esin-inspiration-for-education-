import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

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
              <div className="label-badge mb-4">Field Coordination</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                Contact <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">ESIN Organization</span>
              </h1>
              
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                Whether you represent an international humanitarian agency, academic institution, or are an Afghan woman seeking support, our coordination team is ready to connect securely.
              </p>
              
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Institutional Inquiries</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">coordination@esin.org</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Confidential Signal Channel</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">@esin_sanctuary.01</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Global Liaison Office</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Geneva & San Francisco</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 flex items-start gap-3.5">
                <ShieldCheck className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  All messages sent via this portal are transmitted via encrypted pipelines. Inquiries from inside Afghanistan are routed to specialized female caseworkers.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="modern-card p-8 md:p-10 shadow-xl">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center rounded-2xl mx-auto mb-6">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Message Dispatched Securely
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-6">
                      Thank you for contacting ESIN. Our coordination team will follow up via your preferred secure communication channel.
                    </p>
                    <button 
                      onClick={() => setSent(false)}
                      className="btn-editorial btn-editorial-secondary text-xs py-2.5 px-5 rounded-xl font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                          Your Name or Organization *
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Dr. Soraya or Partner Institution"
                          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                          Email or Signal ID *
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="contact@institution.org or +1..."
                          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Inquiry Category
                      </label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500">
                        <option>Academic & University Partnership</option>
                        <option>Philanthropic Grant or Donor Inquiry</option>
                        <option>Artisan Procurement & Fair Trade</option>
                        <option>Media & Press Inquiry</option>
                        <option>General Support or Student Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Message or Partnership Proposal *
                      </label>
                      <textarea 
                        rows={5} 
                        required 
                        placeholder="Please describe how we can collaborate or how our team can assist you..."
                        className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full btn-editorial btn-editorial-primary text-xs py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20"
                    >
                      <Send size={14} />
                      <span>Transmit Secure Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
