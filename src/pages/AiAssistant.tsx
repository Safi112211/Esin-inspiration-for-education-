import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Globe, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowRight, 
  MessageSquare,
  Lock,
  GraduationCap,
  Download,
  Languages
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const DISCOVERY_PROMPTS = [
  {
    title: "How ESIN Started",
    prompt: "What is the story behind ESIN and how did it start?",
    desc: "How ESIN began helping girls learn after schools were closed.",
    icon: <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
  },
  {
    title: "How to Join Free Classes",
    prompt: "How can an Afghan girl sign up for free online classes safely?",
    desc: "Easy step-by-step guide to signing up with any nickname.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
  },
  {
    title: "Online Courses & Lessons",
    prompt: "What subjects and courses can I learn in the Learning Hub?",
    desc: "English, Computer skills, Coding, High School subjects, and Art.",
    icon: <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
  },
  {
    title: "Tailoring & Earning from Home",
    prompt: "How can women learn tailoring and crafts to earn money from home?",
    desc: "Sewing machines, embroidery training, and selling items safely.",
    icon: <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />
  },
  {
    title: "Free Mental Health & Counseling",
    prompt: "What free counseling and mental health support is available in Dari and Pashto?",
    desc: "Talk with friendly female Afghan counselors for free.",
    icon: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
  },
  {
    title: "معرفی سازمان ایسین به دری",
    prompt: "لطفاً درباره سازمان ایسین، اهداف و برنامه‌های آموزشی آن به زبان دری توضیح دهید.",
    desc: "توضیح ساده در مورد صنف‌های آنلاین رایگان و آموزش‌های مسلکی.",
    icon: <Languages className="w-5 h-5 text-teal-600 dark:text-teal-400" />
  }
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-full",
      role: "assistant",
      content: `### Welcome to the ESIN Helper ✨
*(معین و راهنمای آموزشی سازمان ایسین)*

Hello! I am here to help answer all your questions about **ESIN** in simple, clear words.

Whether you are a **student who wants to study for free**, a **parent**, an **artisan who wants to sew and earn**, or a **supporter**, I am here for you!

**You can ask me about:**
* 📚 **Free Online Classes:** High school subjects, English, and computer basics
* 🔒 **Staying Safe & Private:** How to sign up with a nickname without worry
* ✂️ **Home Jobs & Crafts:** Tailoring, sewing, embroidery, and earning money
* 💚 **Free Counseling:** Friendly psychologists ready to listen in Dari and Pashto
* 🤝 **Donating or Partnering:** How you can help support Afghan girls' education

*What would you like to know or learn today?*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: "usr-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            text: m.content
          })),
          userMessage: query
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const replyMsg: Message = {
        id: "ast-" + Date.now(),
        role: "assistant",
        content: data.reply || "Thank you for inquiring with ESIN. How can we further guide you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, replyMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        role: "assistant",
        content: `I apologize for the delay. We are connecting to the ESIN knowledge base.

You can also explore our core portals directly:
* **[Confidential Student Enrollment](/enroll)**
* **[Digital Learning Hub & Courses](/learning-hub)**
* **[Economic Autonomy & Enterprise](/economic-empowerment)**
* **[Psychosocial Wellbeing](/wellbeing)**
* **[Impact Reports & Evidence](/impact)**`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`~\[\]\(\)]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-24 bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg min-h-screen"
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="label-badge mb-3">Interactive Knowledge Sanctuary</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                ESIN Education & <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Inspiration AI Assistant</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-3 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">Grounded in ESIN Data</span>
              </div>
              <Link to="/enroll">
                <button className="btn-editorial btn-editorial-primary text-xs py-2.5 px-4 rounded-xl font-semibold">
                  Confidential Enroll
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Discovery Cards & Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Discovery Sidebar */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Explore Core Topics</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Click any inquiry below to start an interactive deep-dive:
              </p>

              <div className="space-y-2.5">
                {DISCOVERY_PROMPTS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSendMessage(item.prompt)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-teal-50/80 dark:hover:bg-teal-950/40 border border-slate-200/80 dark:border-slate-700/80 transition-all group cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300">
                          {item.title}
                        </div>
                        <div className="text-[0.68rem] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-950 text-white shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2 flex items-center gap-2">
                <Lock size={14} />
                <span>Zero-Knowledge Security</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Our chatbot sessions are strictly confidential and ephemeral. No personal identifying information is stored or transmitted.
              </p>
              <div className="flex flex-col gap-2 text-xs">
                <Link to="/learning-hub" className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Digital Learning Hub</span>
                  <ArrowRight size={13} />
                </Link>
                <Link to="/resources" className="flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Download Curriculum Packs</span>
                  <Download size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Main Chat Frame */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[700px]">
              {/* Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                    <Bot size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-base text-white">
                        ESIN Sanctuary AI Guide
                      </h2>
                      <span className="text-[0.65rem] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-900/80 text-teal-300 border border-teal-700">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Empowerment & Safe Interaction Network Assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMessages([messages[0]])}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="Clear Chat"
                >
                  <RotateCcw size={15} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#faf8f5]/60 dark:bg-[#090d16]/80 subtle-mesh-bg">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-9 h-9 rounded-xl bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-1 shadow-md">
                          <Bot size={18} />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-[#0d9488] text-white rounded-tr-none"
                            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none"
                        }`}
                      >
                        {isUser ? (
                          <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                        ) : (
                          <div className="markdown-body prose prose-sm dark:prose-invert max-w-none space-y-3 prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-[#0d9488] dark:prose-a:text-[#2dd4bf] prose-a:font-semibold hover:prose-a:underline">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}

                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-[0.7rem] text-slate-400">
                          <span>{msg.timestamp}</span>

                          {!isUser && (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleSpeak(msg.id, msg.content)}
                                className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {speakingId === msg.id ? (
                                  <>
                                    <VolumeX size={14} className="text-teal-600 dark:text-teal-400 animate-pulse" />
                                    <span className="text-teal-600 font-semibold">Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 size={14} />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleCopy(msg.id, msg.content)}
                                className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check size={14} className="text-emerald-500" />
                                    <span className="text-emerald-500 font-semibold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-1">
                          <User size={18} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3.5 justify-start"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0">
                      <Sparkles size={18} className="animate-spin" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl rounded-tl-none p-4 flex items-center gap-3 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Consulting ESIN Sanctuary Knowledge Base...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-end gap-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about ESIN inspiration, courses, safe enrollment, artisan livelihoods, mental health..."
                    rows={2}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none py-1.5 px-3"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="btn-editorial btn-editorial-primary text-xs py-3 px-5 rounded-xl font-semibold shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Send Query</span>
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
