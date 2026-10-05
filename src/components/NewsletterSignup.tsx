import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send, BellRing, ArrowRight, BookOpen, HeartHandshake, Award } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "card" | "compact" | "banner";
  className?: string;
  defaultTopic?: string;
}

export default function NewsletterSignup({
  variant = "card",
  className = "",
  defaultTopic
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Impact & Field Briefs",
    "Upcoming Programs & Webinars"
  ]);
  const [frequency, setFrequency] = useState<"monthly" | "quarterly">("monthly");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed locally
    const stored = localStorage.getItem("esin_newsletter_subscribed");
    if (stored) {
      setIsSaved(true);
    }
  }, []);

  const availableTopics = [
    { id: "Impact & Field Briefs", label: "Impact & Field Briefs", desc: "Audited metrics and stories from Afghanistan" },
    { id: "Upcoming Programs & Webinars", label: "Upcoming Programs & Webinars", desc: "Curriculum launches and community events" },
    { id: "Artisan & Economic Dispatches", label: "Artisan & Economic Dispatches", desc: "Ethical textile collections and enterprise updates" },
    { id: "Open Educational Toolkits", label: "Open Educational Toolkits", desc: "Newly released offline-first teaching kits" }
  ];

  const handleTopicToggle = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topicId));
      }
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    // Simulate reliable subscription processing
    setTimeout(() => {
      setStatus("success");
      setIsSaved(true);
      try {
        localStorage.setItem("esin_newsletter_subscribed", JSON.stringify({
          email,
          name: name.trim() || "Anonymous Supporter",
          topics: selectedTopics,
          frequency,
          date: new Date().toISOString()
        }));
      } catch (err) {
        // Safe localstorage fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setStatus("idle");
  };

  // Compact variant (e.g. for footers, sidebars or small cards)
  if (variant === "compact") {
    return (
      <div className={`w-full ${className}`}>
        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-slate-900 dark:text-white"
          >
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold mb-1">
              <CheckCircle2 size={16} />
              <span>Subscribed to Monthly Updates</span>
            </div>
            <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
              Check your inbox for our monthly dispatch & welcome brief.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-editorial btn-editorial-primary text-xs py-2.5 px-4 rounded-xl font-bold shrink-0 disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {errorMessage && (
              <p className="text-[0.7rem] text-rose-500 font-medium">{errorMessage}</p>
            )}
            <div className="flex items-center gap-1.5 text-[0.68rem] text-slate-500 dark:text-slate-400">
              <ShieldCheck size={12} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span>Monthly dispatch • Zero spam • Unsubscribe anytime</span>
            </div>
          </form>
        )}
      </div>
    );
  }

  // Banner variant (e.g. horizontal band across pages)
  if (variant === "banner") {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden ${className}`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[0.7rem] font-bold uppercase tracking-wider mb-3">
              <BellRing size={12} />
              Monthly Impact Dispatch
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Stay Informed on ESIN's Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Receive verified dispatches detailing student graduations, open toolkit updates, and emerging educational initiatives across Afghanistan.
            </p>
          </div>

          <div className="lg:col-span-6">
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-teal-950/60 border border-teal-500/30 text-teal-200"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <CheckCircle2 size={18} className="text-teal-400" />
                  <span>Welcome to our monthly updates community</span>
                </div>
                <p className="text-xs text-slate-300">
                  You'll receive our monthly impact report and upcoming program announcements directly in your inbox.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-lg shadow-teal-500/20"
                  >
                    {status === "loading" ? "Subscribing..." : "Get Monthly Updates"}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-xs text-rose-400">{errorMessage}</p>
                )}
                <div className="flex items-center gap-2 text-[0.7rem] text-slate-400">
                  <ShieldCheck size={13} className="text-teal-400" />
                  <span>Encrypted newsletter transmission • Strictly confidential • 1-click unsubscribe</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default "card" variant: Rich, interactive, customizable topic preferences
  return (
    <div className={`modern-card p-6 sm:p-8 md:p-10 ${className}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6 sm:py-8"
          >
            <div className="w-16 h-16 bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center rounded-2xl mx-auto mb-5">
              <CheckCircle2 size={36} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[0.7rem] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-3">
              <Sparkles size={13} />
              Subscription Active
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Thank You for Staying Connected
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6">
              A confirmation has been sent to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>. You will receive monthly updates on ESIN's educational milestones, artisan dispatches, and upcoming programs.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 max-w-md mx-auto mb-8 text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Your Preferences
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedTopics.map((topic) => (
                  <span key={topic} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[0.7rem] font-medium text-slate-800 dark:text-slate-200">
                    ✓ {topic}
                  </span>
                ))}
              </div>
              <div className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                Frequency: <span className="font-semibold text-teal-600 dark:text-teal-400 capitalize">{frequency} Digest</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="btn-editorial btn-editorial-secondary text-xs py-2.5 px-5 rounded-xl font-semibold"
              >
                Subscribe Another Email
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
              <div>
                <div className="label-badge mb-3">Stay Informed</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  ESIN Monthly Impact <br className="hidden sm:inline" />
                  <span className="text-[#0d9488] dark:text-[#2dd4bf]">& Program Updates</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
                Join our global community of supporters receiving monthly field summaries, audited student impact metrics, and previews of upcoming educational tracks.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name or Preferred Alias <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Soraya or Supporter"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-teal-600 dark:text-teal-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@organization.org"
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Topics Selection */}
              <div>
                <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Select Updates You Wish to Receive
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableTopics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                      <div
                        key={topic.id}
                        onClick={() => handleTopicToggle(topic.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none flex items-start gap-3 ${
                          isSelected
                            ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500/60 dark:border-teal-500/60 shadow-xs"
                            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // handled by parent div click
                          className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-0 accent-teal-600 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {topic.label}
                          </div>
                          <div className="text-[0.68rem] text-slate-500 dark:text-slate-400 mt-0.5">
                            {topic.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Frequency options */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Dispatch Frequency:
                  </span>
                  <div className="inline-flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setFrequency("monthly")}
                      className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        frequency === "monthly"
                          ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("quarterly")}
                      className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        frequency === "quarterly"
                          ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      Quarterly Executive
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-500 dark:text-slate-400">
                  <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
                  <span>Encrypted • No Ads • Zero Third-Party Sharing</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto btn-editorial btn-editorial-primary text-xs py-3.5 px-8 rounded-xl font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 cursor-pointer disabled:opacity-60"
                >
                  <Send size={14} />
                  <span>{status === "loading" ? "Activating Subscription..." : "Subscribe to Monthly Updates"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
