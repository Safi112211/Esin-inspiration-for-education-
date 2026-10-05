import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Mail, MapPin, Globe, ArrowRight } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-16 px-6 md:px-12 lg:px-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
        {/* Brand Col */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-extrabold text-base">
              E
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              ESIN Organization
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            A non-profit community empowering Afghan women and girls through free online schooling, job skills, home crafts, and safe emotional support.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[0.75rem] text-teal-400 font-medium">
            <ShieldCheck size={14} />
            <span>100% Free & Safe for Girls</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Our Programs
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
            <li><Link to="/learning-hub" className="hover:text-teal-400 transition-colors">Online Classes</Link></li>
            <li><Link to="/economic-empowerment" className="hover:text-teal-400 transition-colors">Home Jobs & Crafts</Link></li>
            <li><Link to="/safe-space" className="hover:text-teal-400 transition-colors">Safe Student Community</Link></li>
            <li><Link to="/wellbeing" className="hover:text-teal-400 transition-colors">Mental Health & Care</Link></li>
            <li><Link to="/programs" className="hover:text-teal-400 transition-colors">All Programs</Link></li>
          </ul>
        </div>

        {/* Institutional */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            About ESIN
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-300">
            <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Our Story</Link></li>
            <li><Link to="/impact" className="hover:text-teal-400 transition-colors">Our Results</Link></li>
            <li><Link to="/partnerships" className="hover:text-teal-400 transition-colors">Partner With Us</Link></li>
            <li><Link to="/resources" className="hover:text-teal-400 transition-colors">Free Study Materials</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-teal-400 transition-colors">Ask AI Helper</Link></li>
            <li><Link to="/enroll" className="hover:text-teal-400 transition-colors">Join as Student</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Monthly Newsletter
          </h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Get inspiring student stories, new course alerts, and project updates straight to your inbox once a month.
          </p>
          <NewsletterSignup variant="compact" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 ESIN Organization. Empowering Afghan girls and women through safe education and hope.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy & Safety Policy</Link>
          <Link to="/contact" className="hover:text-slate-400 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
