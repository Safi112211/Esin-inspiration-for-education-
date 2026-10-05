import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Bot, 
  User, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Globe, 
  ArrowRight,
  ExternalLink,
  Volume2,
  VolumeX,
  Languages
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPT_SUGGESTIONS = [
  {
    category: "Mission & Origin",
    icon: <Sparkles className="w-3.5 h-3.5 text-teal-500" />,
    text: "Can you tell me about the inspiration and story behind ESIN?",
    shortLabel: "Founding Story"
  },
  {
    category: "Safe Enrollment",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />,
    text: "How does confidential enrollment work for a student in Afghanistan?",
    shortLabel: "Confidential Enrollment"
  },
  {
    category: "Digital Hub",
    icon: <BookOpen className="w-3.5 h-3.5 text-indigo-500" />,
    text: "What courses and offline learning tools does ESIN provide in the Learning Hub?",
    shortLabel: "Offline Courses & Tech"
  },
  {
    category: "Economic Livelihood",
    icon: <Globe className="w-3.5 h-3.5 text-amber-500" />,
    text: "How does ESIN empower women through tailoring, embroidery, and remote digital freelancing?",
    shortLabel: "Artisan & Livelihood Tracks"
  },
  {
    category: "Psychosocial Care",
    icon: <Heart className="w-3.5 h-3.5 text-rose-500" />,
    text: "What trauma-informed mental health and psychological healing support does ESIN provide?",
    shortLabel: "Mental Health Circles"
  },
  {
    category: "Language (دری)",
    icon: <Languages className="w-3.5 h-3.5 text-teal-500" />,
    text: "لطفاً درباره سازمان ایسین، اهداف و برنامه‌های آموزشی آن به زبان دری توضیح دهید.",
    shortLabel: "معرفی به زبان دری"
  },
  {
    category: "Language (پښتو)",
    icon: <Languages className="w-3.5 h-3.5 text-amber-500" />,
    text: "مهرباني وکړئ د ایسین موسسې د ښوونیزو پروګرامونو په اړه په پښتو ژبه معلومات راکړئ.",
    shortLabel: "معلومات په پښتو"
  }
];

const INITIAL_GREETING: ChatMessage = {
  id: "initial-greeting",
  role: "assistant",
  content: `### Welcome to the ESIN Knowledge & Education Sanctuary ✨
*(معین دانایی و امید / مشاور آموزشی ایسین)*

I am your dedicated guide to **ESIN** (*Empowerment & Safe Interaction Network*). I can provide comprehensive answers about:

* 📚 **Education Continuity & Digital Learning Hub**: Offline-first curricula, secondary tracks, coding, English, and university prep.
* 🛡️ **Sanctuary & Anonymity**: Zero-knowledge encryption, pseudonymous student profiles, and PSEA safeguarding.
* 🧵 **Economic Autonomy & Enterprise**: Home-based artisan tailoring, embroidery, remote freelancing, and fair-trade exports.
* 🌿 **Mental Health & Resilience**: Culturally nuanced trauma recovery circles in Dari and Pashto.
* ✍️ **Confidential Enrollment & Open Toolkits**: How to join safely or download curriculum packs.

*How can I assist your educational journey or inquiry today? Feel free to ask in English, دری (Dari), or پښتو (Pashto).*`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export default function EsinChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotice(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages, isLoading]);

  // Handle open event from anywhere in app
  useEffect(() => {
    const handleOpenChat = (e: any) => {
      setIsOpen(true);
      if (e?.detail?.prompt) {
        handleSendMessage(e.detail.prompt);
      }
    };
    window.addEventListener("open-esin-chat", handleOpenChat);
    return () => window.removeEventListener("open-esin-chat", handleOpenChat);
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      // Format messages history for server endpoint
      const formattedHistory = newHistory.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: formattedHistory,
          userMessage: query
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyContent = data.reply || "Thank you for contacting ESIN. How else can we assist your learning path?";

      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content: `I apologize, I encountered a temporary connection issue. 

**ESIN Quick Access Guide:**
* 📖 **Educational Hub**: Explore offline curriculum tracks at [/learning-hub](/learning-hub).
* 📝 **Confidential Enrollment**: Register safely with zero ID trace at [/enroll](/enroll).
* 💬 **Field Inquiries**: Connect with our coordinators securely at [/contact](/contact).

Please click below to try sending your question again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
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
    // Clean markdown syntax for speech
    const cleanText = text
      .replace(/[*#_`~\[\]\(\)]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([INITIAL_GREETING]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <aside aria-label="ESIN AI Chatbot Assistant" className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          {/* Pulsing beacon if unread */}
          {hasUnreadNotice && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 border-2 border-white dark:border-slate-900"></span>
            </span>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex items-center gap-3 bg-[#0d9488] hover:bg-[#0f766e] dark:bg-[#14b8a6] dark:hover:bg-[#2dd4bf] text-white dark:text-slate-950 font-semibold px-4 py-3.5 rounded-full shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            aria-label="Open ESIN Education Sanctuary AI Chatbot"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 animate-spin-slow group-hover:rotate-12 transition-transform" />
            </div>
            <span className="hidden sm:inline text-xs font-bold tracking-wide">
              {isOpen ? "Close Sanctuary AI" : "Ask ESIN Sanctuary AI"}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
              {isOpen ? <X size={14} /> : <MessageSquare size={14} />}
            </div>
          </button>
        </motion.div>
      </aside>

      {/* Slide-out & Floating Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <aside aria-label="ESIN AI Chat Window" className="fixed bottom-24 right-4 sm:right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isExpanded 
                  ? "w-[94vw] sm:w-[680px] md:w-[780px] h-[86vh] max-h-[850px]" 
                  : "w-[94vw] sm:w-[420px] md:w-[460px] h-[580px] max-h-[82vh]"
              }`}
            >
              {/* Header */}
              <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                      <Sparkles size={18} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white tracking-tight">
                        ESIN Sanctuary AI
                      </h3>
                      <span className="text-[0.62rem] font-semibold uppercase px-1.5 py-0.5 rounded bg-teal-900/60 text-teal-300 border border-teal-700/50">
                        Online
                      </span>
                    </div>
                    <p className="text-[0.68rem] text-slate-400 line-clamp-1">
                      Inspiration for Afghan Education & Empowerment
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    onClick={handleResetChat}
                    title="Clear Conversation"
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    aria-label="Restart Conversation"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Collapse View" : "Expand View"}
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer hidden sm:flex"
                    aria-label={isExpanded ? "Collapse View" : "Expand View"}
                  >
                    {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Chat"
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    aria-label="Close Chat"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Sub-header Banner / Language notice */}
              <div className="px-4 py-1.5 bg-teal-50/70 dark:bg-teal-950/40 border-b border-teal-100 dark:border-teal-900/40 flex items-center justify-between text-[0.7rem] text-teal-800 dark:text-teal-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={13} className="text-teal-600 dark:text-teal-400" />
                  <span>Confidential & Ephemeral Session • Zero Data Logs</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                  <span>EN • دری • پښتو</span>
                </div>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf8f5]/60 dark:bg-[#090d16]/80 subtle-mesh-bg">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Bot size={15} />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-[#0d9488] text-white rounded-tr-none"
                            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none"
                        }`}
                      >
                        {isUser ? (
                          <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                        ) : (
                          <div className="markdown-body prose prose-sm dark:prose-invert max-w-none space-y-2 prose-p:leading-relaxed prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-[#0d9488] dark:prose-a:text-[#2dd4bf] prose-a:font-semibold prose-a:underline hover:prose-a:text-teal-700">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}

                        {/* Footer info & copy/listen buttons on assistant message */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-[0.68rem] text-slate-400">
                          <span>{msg.timestamp}</span>

                          {!isUser && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSpeak(msg.id, msg.content)}
                                title={speakingId === msg.id ? "Stop voice" : "Listen to answer"}
                                className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors p-0.5 cursor-pointer"
                              >
                                {speakingId === msg.id ? (
                                  <VolumeX size={13} className="text-teal-600 dark:text-teal-400 animate-pulse" />
                                ) : (
                                  <Volume2 size={13} />
                                )}
                              </button>
                              <button
                                onClick={() => handleCopy(msg.id, msg.content)}
                                title="Copy answer"
                                className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1 p-0.5 cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check size={12} className="text-emerald-500" />
                                    <span className="text-emerald-500 font-semibold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={12} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                          <User size={14} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 justify-start"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center justify-center shrink-0">
                      <Sparkles size={14} className="animate-spin" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Formulating answer from ESIN Knowledge...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Topic Chips Slider */}
              <div className="px-3 py-2 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max pb-1">
                  {QUICK_PROMPT_SUGGESTIONS.map((item) => (
                    <button
                      key={item.category}
                      onClick={() => handleSendMessage(item.text)}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700/80 px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-2xs hover:shadow-xs"
                    >
                      {item.icon}
                      <span>{item.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
                <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-1.5 border border-slate-200 dark:border-slate-700 focus-within:border-[#0d9488] focus-within:ring-2 focus-within:ring-[#0d9488]/20 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about ESIN's education inspiration, courses, enrollment..."
                    rows={1}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none max-h-28 py-1.5 px-2"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-[#0d9488] hover:bg-[#0f766e] disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white p-2 rounded-lg transition-colors shrink-0 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                    aria-label="Send query"
                  >
                    <Send size={15} />
                  </button>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[0.65rem] text-slate-400 px-1">
                  <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[0.6rem] font-mono">Enter</kbd> to send</span>
                  <div className="flex items-center gap-2">
                    <Link to="/enroll" onClick={() => setIsOpen(false)} className="hover:text-teal-600 dark:hover:text-teal-400 underline">
                      Confidential Enroll
                    </Link>
                    <span>•</span>
                    <Link to="/resources" onClick={() => setIsOpen(false)} className="hover:text-teal-600 dark:hover:text-teal-400 underline">
                      Offline Toolkits
                    </Link>
                  </div>
                </div>
              </form>
            </motion.div>
          </aside>
        )}
      </AnimatePresence>
    </>
  );
}
