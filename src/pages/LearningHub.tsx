import { motion } from "motion/react";
import { BookOpen, Download, Laptop, Award, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../assets/images";
import FieldGallery from "../components/FieldGallery";

export default function LearningHub() {
  const courses = [
    { title: "English for Academic & Career Purposes", level: "Beginner to Advanced", duration: "12 Weeks", enrolled: "3,400+ Students", desc: "Grammar, spoken fluency, professional correspondence, and academic essay composition." },
    { title: "Digital Literacy & Cyber Hygiene", level: "All Levels", duration: "6 Weeks", enrolled: "4,100+ Students", desc: "Anti-surveillance protocols, encrypted browsing, safe digital transactions, and hardware basics." },
    { title: "Python & Web Basics for Remote Work", level: "Intermediate", duration: "16 Weeks", enrolled: "1,250+ Students", desc: "Fundamentals of coding, modern HTML/CSS/JavaScript, and foundational Python automation." },
    { title: "Graphic Design & Digital Illustration", level: "All Levels", duration: "8 Weeks", enrolled: "2,100+ Students", desc: "Visual storytelling, layout principles, Canva, Figma, and freelance client communication." },
    { title: "Foundations of Generative AI & Data", level: "Introductory", duration: "4 Weeks", enrolled: "1,850+ Students", desc: "Effective prompting, research synthesis, and ethical AI utilization for remote work." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 pb-24 bg-[#faf8f5] dark:bg-[#090d16] subtle-mesh-bg"
    >
      <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="label-badge mb-4">Remote Academic Gateway</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                ESIN Digital <br />
                <span className="text-[#0d9488] dark:text-[#2dd4bf]">Learning Hub</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Empowering Afghan girls with continuous, certified education through low-bandwidth offline modules, live encrypted webinars, free textbooks, and dedicated female teachers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/enroll">
                  <button className="btn-editorial btn-editorial-primary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <span>Enroll as Student</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link to="/resources">
                  <button className="btn-editorial btn-editorial-secondary text-xs py-3 px-6 rounded-xl font-semibold inline-flex items-center gap-2">
                    <Download size={14} />
                    <span>Download Offline Bundles</span>
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 aspect-[4/3] relative group">
                <img 
                  src={getImageUrl("field_photo_2")} 
                  alt="Young Afghan students actively participating in safe classroom" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-[0.72rem] border border-white/10">
                  <div className="font-bold text-teal-300">Live Active Classes</div>
                  <div className="text-white/80 text-[0.68rem]">Teacher-led math, science and language learning</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="modern-card p-8">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                <Laptop size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Offline-First Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Compressed audio-visual lessons, interactive worksheets, and flashcards optimized for intermittent 2G/3G mobile networks.
              </p>
            </div>

            <div className="modern-card p-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Award size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Verifiable Certification
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Digital diplomas and outcome-verified transcripts to support students applying for international university scholarships.
              </p>
            </div>

            <div className="modern-card p-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Confidential Attendance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Encrypted student IDs ensure zero risk of institutional tracing, safeguarding every learner and her household.
              </p>
            </div>
          </div>

          {/* Course Catalog */}
          <div className="mb-20">
            <div className="mb-10">
              <div className="label-badge mb-3">Curriculum Tracks</div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Courses & Skill Tracks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.title} className="modern-card p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[0.7rem] text-slate-500 dark:text-slate-400 font-semibold mb-3">
                      <span>{course.level}</span>
                      <span className="text-[#0d9488] dark:text-[#2dd4bf]">{course.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {course.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[0.7rem] font-semibold text-slate-500">{course.enrolled}</span>
                    <Link to="/enroll" className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf] hover:underline">
                      Enroll Free →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Field Gallery on Learning Hub */}
      <FieldGallery 
        title="Classrooms & Textbooks in Afghanistan"
        subtitle="See our micro-school pods, textbook distributions, and eager students participating in live lessons."
        initialCategory="education"
      />
    </motion.div>
  );
}
