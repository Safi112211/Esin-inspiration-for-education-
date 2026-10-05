import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Sun, Moon, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { 
      name: "Programs", 
      href: "/programs",
      submenu: [
        { name: "Online Classes", href: "/learning-hub", desc: "Free school lessons, English & computer skills" },
        { name: "Home Jobs & Crafts", href: "/economic-empowerment", desc: "Tailoring, embroidery & remote freelancing" },
        { name: "Safe Student Community", href: "/safe-space", desc: "Private, anonymous girls-only support group" },
        { name: "Mental Health Support", href: "/wellbeing", desc: "Free counseling, stress relief & care" },
      ]
    },
    { name: "Free Study Materials", href: "/resources" },
    { name: "Our Results", href: "/impact" },
    { name: "Ask AI Helper", href: "/ai-assistant" },
    { name: "Partner With Us", href: "/partnerships" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#faf8f5]/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] dark:from-[#14b8a6] dark:to-[#0d9488] flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#14b8a6] transition-colors">
              ESIN
            </span>
            <span className="hidden sm:inline-block ml-2 text-[0.65rem] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              Grassroots
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.href}
                className={`px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-all duration-200 flex items-center gap-1 ${
                  isActive(link.href)
                    ? "bg-white dark:bg-slate-900 text-[#0d9488] dark:text-[#14b8a6] shadow-sm font-semibold" 
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/60"
                }`}
              >
                {link.name}
                {link.submenu && <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform" />}
              </Link>
              
              {link.submenu && (
                <div className="absolute top-full left-0 pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-teal-50/70 dark:hover:bg-teal-950/40 group/item transition-colors"
                      >
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-[#0d9488] dark:group-hover/item:text-[#14b8a6]">
                          {sub.name}
                        </div>
                        <div className="text-[0.7rem] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {sub.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
          
          <Link 
            to="/enroll" 
            className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0d9488] dark:hover:text-[#14b8a6] px-3.5 py-2 rounded-xl transition-colors"
          >
            Join Free
          </Link>
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("open-donation-modal"))}
            className="btn-editorial btn-editorial-primary text-xs py-2 px-4.5 rounded-xl font-semibold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Heart size={14} className="fill-current text-white/90" />
            <span>Donate</span>
          </button>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/98 dark:bg-[#090d16]/98 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-6 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-1.5">
                <Link
                  to={link.href}
                  className={`text-base font-semibold py-1.5 px-3 rounded-lg ${
                    isActive(link.href) 
                      ? "text-[#0d9488] dark:text-[#14b8a6] bg-teal-50 dark:bg-teal-950/40" 
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 ml-3 border-l-2 border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0d9488] py-1.5"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <Link 
                to="/enroll" 
                className="btn-editorial btn-editorial-secondary w-full text-center text-xs py-3"
                onClick={() => setIsOpen(false)}
              >
                Enroll as Student
              </Link>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent("open-donation-modal"));
                }}
                className="btn-editorial btn-editorial-primary w-full text-xs py-3"
              >
                Make a Donation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
