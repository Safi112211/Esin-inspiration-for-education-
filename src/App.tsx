import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LiquidBackground from "./components/LiquidBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import SafeSpace from "./pages/SafeSpace";
import EconomicEmpowerment from "./pages/EconomicEmpowerment";
import LearningHub from "./pages/LearningHub";
import Wellbeing from "./pages/Wellbeing";
import Resources from "./pages/Resources";
import Impact from "./pages/Impact";
import Partnerships from "./pages/Partnerships";
import Enroll from "./pages/Enroll";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AiAssistant from "./pages/AiAssistant";
import EsinChatbot from "./components/EsinChatbot";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import DonationWidget from "./components/DonationWidget";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsDonationOpen(true);
    window.addEventListener("open-donation-modal", handleOpen);
    return () => {
      window.removeEventListener("open-donation-modal", handleOpen);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative selection:bg-brand-accent selection:text-brand-light">
        <LiquidBackground />
        <Navbar />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/safe-space" element={<SafeSpace />} />
              <Route path="/economic-empowerment" element={<EconomicEmpowerment />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/wellbeing" element={<Wellbeing />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/ai-assistant" element={<AiAssistant />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />

        {/* Global Floating ESIN Education & Sanctuary AI Assistant */}
        <EsinChatbot />

        {/* Global Donation Modal Overlay */}
        <AnimatePresence>
          {isDonationOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
              {/* Dark backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDonationOpen(false)}
                className="fixed inset-0 bg-brand-dark/85 dark:bg-black/85 backdrop-blur-md cursor-pointer"
              />
              
              {/* Modal Card wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl z-10 my-8"
              >
                {/* Custom top-right Close button */}
                <button
                  onClick={() => setIsDonationOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-brand-dark/10 dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:hover:bg-brand-accent text-brand-dark/60 dark:text-dark-text/60 rounded-full transition-all z-20 cursor-pointer"
                  aria-label="Close donation modal"
                >
                  <X size={20} />
                </button>
                
                <DonationWidget />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
