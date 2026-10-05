import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { getImageUrl } from '../assets/images';

export interface FieldPhoto {
  id: string;
  imageKey: string;
  fallbackUrl: string;
  title: string;
  titleDari?: string;
  tag: string;
  category: 'education' | 'community' | 'wellbeing' | 'leadership';
  location: string;
  description: string;
  details: string;
  stats?: string;
}

export const FIELD_PHOTOS: FieldPhoto[] = [
  {
    id: "photo-1",
    imageKey: "field_photo_1",
    fallbackUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    title: "Proud to Learn: Safe Classroom Textbooks",
    titleDari: "افتخار به آموزش و کتب درسی",
    tag: "Free Schooling",
    category: "education",
    location: "Kabul Micro-School Node",
    description: "Young Afghan schoolgirls proudly holding up their textbooks and notebooks in a safe classroom, learning with their female teacher.",
    details: "When formal schools closed, ESIN established home-based micro-learning pods where students receive free schoolbooks, notebooks, and pencils while keeping their identities completely safe.",
    stats: "15,200+ Girls Learning"
  },
  {
    id: "photo-2",
    imageKey: "field_photo_2",
    fallbackUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    title: "Eager Hands: Active Classroom Learning",
    titleDari: "مشارکت فعال شاگردان در صنف",
    tag: "Live Classes",
    category: "education",
    location: "Herat Learning Center",
    description: "Dozens of Afghan girls and young women enthusiastically raising their hands to participate during an interactive lesson.",
    details: "Classes in science, mathematics, literature, and English run daily with qualified Afghan female teachers providing personal attention and encouragement to every student.",
    stats: "82% Course Completion"
  },
  {
    id: "photo-3",
    imageKey: "field_photo_3",
    fallbackUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    title: "Dreams of Freedom (صلح و آزادی): Art & Laptops",
    titleDari: "هنر، صلح و آزادی در کنار آموزش دیجیتال",
    tag: "Digital & Art",
    category: "community",
    location: "Digital Learning Track",
    description: "A student's hand-drawn art journal resting on a MacBook laptop, illustrating messages of Peace (صلح) and Freedom (آزادی).",
    details: "Combining creative expression with modern digital literacy. Students learn computer basics, typing, and safe research tools while expressing their hopes through art and poetry.",
    stats: "Low-Bandwidth Toolkits"
  },
  {
    id: "photo-4",
    imageKey: "field_photo_4",
    fallbackUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    title: "Ray of Light: High-Capacity Study Hall",
    titleDari: "نور امید در صنف‌های پر از شوق دانش",
    tag: "Expanding Nodes",
    category: "community",
    location: "Balkh Community Hub",
    description: "Sunlight floods a packed classroom of female students seated together on carpets, eager for daily academic instruction.",
    details: "ESIN's community network has scaled from 12 initial safe pods to over 50 regional nodes across Afghanistan, fulfilling the massive demand for education among girls.",
    stats: "50+ Safe Nodes"
  },
  {
    id: "photo-5",
    imageKey: "field_photo_5",
    fallbackUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
    title: "The Learning Circle: Sisterhood & Wall Art",
    titleDari: "حلقه همبستگی، هنر و آموزش خواهرانه",
    tag: "Peer Community",
    category: "community",
    location: "Safe Space Community Pod",
    description: "Students seated in a warm circle on traditional carpets surrounded by student drawings and poetry displayed on the walls.",
    details: "In our Safe Space circles, girls find emotional safety, make lasting friendships, share their daily struggles, and build mutual resilience in a supportive women-only haven.",
    stats: "100% Safe & Private"
  },
  {
    id: "photo-6",
    imageKey: "field_photo_6",
    fallbackUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    title: "The Hope Wall: Dreams & Mental Wellbeing",
    titleDari: "دیوار امید - آرزوها و سلامت روان",
    tag: "Mental Health",
    category: "wellbeing",
    location: "Wellness & Counseling Pod",
    description: "Students gather before 'The hope walls' filled with colorful sticky notes expressing dreams, gratitude, and mutual strength.",
    details: "Part of our trauma-informed psychological care program led by Afghan female therapists. Simple activities like writing affirmations help students process grief and reclaim hope.",
    stats: "Free Counseling Circles"
  },
  {
    id: "photo-7",
    imageKey: "field_photo_7",
    fallbackUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    title: "Reaching Every Woman: Community Literacy",
    titleDari: "آموزش سواد و مهارت برای تمام زنان",
    tag: "Literacy & Skills",
    category: "leadership",
    location: "Neighborhood Literacy Node",
    description: "A female educator in traditional chadori teaching literacy, basic arithmetic, and practical skills on a whiteboard.",
    details: "ESIN welcomes women of all ages—including mothers and older sisters—teaching foundational reading, tailoring calculations, and household financial management.",
    stats: "2,450 Women Earning"
  },
  {
    id: "photo-8",
    imageKey: "field_photo_8",
    fallbackUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1200&auto=format&fit=crop",
    title: "Dedicated Female Educators: Courage in Action",
    titleDari: "معلمان شجاع و متعهد در سنگر دانایی",
    tag: "Female Teachers",
    category: "leadership",
    location: "Community Teacher Network",
    description: "Local Afghan female teachers leading lessons with deep dedication, ensuring education never ceases for future generations.",
    details: "Over 500 Afghan female educators and diaspora mentors are supported with monthly stipends and teaching kits to lead safe local classes and virtual tutoring.",
    stats: "500+ Teachers & Mentors"
  }
];

interface FieldGalleryProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  initialCategory?: string;
  showFilters?: boolean;
}

export default function FieldGallery({
  title = "Real Field Photos: Our Work in Afghanistan",
  subtitle = "Authentic glimpses into our active classrooms, creative student projects, hope circles, and dedicated female teachers across Afghanistan.",
  limit,
  initialCategory = "all",
  showFilters = true
}: FieldGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All 8 Field Photos" },
    { id: "education", label: "Classrooms & Textbooks" },
    { id: "community", label: "Art & Sisterhood" },
    { id: "wellbeing", label: "The Hope Wall & Care" },
    { id: "leadership", label: "Female Teachers & Literacy" }
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? FIELD_PHOTOS 
    : FIELD_PHOTOS.filter(p => p.category === selectedCategory);

  const displayedPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos;

  const currentPhoto = activePhotoIndex !== null ? FIELD_PHOTOS[activePhotoIndex] : null;

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % FIELD_PHOTOS.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + FIELD_PHOTOS.length) % FIELD_PHOTOS.length);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-xs font-bold text-teal-800 dark:text-teal-300 mb-4">
              <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Real Field Operations & Evidence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-4 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#0d9488] text-white shadow-md shadow-teal-700/20"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-500"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPhotos.map((photo) => {
            const globalIndex = FIELD_PHOTOS.findIndex(p => p.id === photo.id);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActivePhotoIndex(globalIndex)}
                className="group modern-card overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo Preview Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={getImageUrl(photo.imageKey) || photo.fallbackUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[0.68rem] font-bold text-teal-300">
                    <CheckCircle2 size={12} className="text-teal-400" />
                    <span>{photo.tag}</span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} />
                  </div>

                  {/* Bottom Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[0.72rem]">
                    <div className="flex items-center gap-1 font-medium text-white/90 truncate">
                      <MapPin size={12} className="text-teal-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    {photo.stats && (
                      <span className="font-bold text-teal-300 text-[0.68rem] shrink-0 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                        {photo.stats}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#0d9488] dark:group-hover:text-[#2dd4bf] transition-colors mb-1.5">
                      {photo.title}
                    </h3>
                    {photo.titleDari && (
                      <p className="text-[0.72rem] text-teal-700 dark:text-teal-400 font-medium mb-2" dir="rtl">
                        {photo.titleDari}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[0.72rem] text-slate-500 dark:text-slate-400 font-semibold">
                    <span>Click to view story</span>
                    <span className="text-[#0d9488] dark:text-[#2dd4bf] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox / Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Left Image View */}
              <div className="md:w-3/5 bg-slate-950 relative flex items-center justify-center min-h-[300px] md:min-h-[460px]">
                <img
                  src={getImageUrl(currentPhoto.imageKey) || currentPhoto.fallbackUrl}
                  alt={currentPhoto.title}
                  className="w-full h-full object-contain max-h-[60vh] md:max-h-[85vh]"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Navigation buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 left-4 text-white/70 text-xs font-mono">
                  Photo {activePhotoIndex + 1} of {FIELD_PHOTOS.length}
                </div>
              </div>

              {/* Right Story Panel */}
              <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-slate-50 dark:bg-slate-900">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
                      {currentPhoto.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <MapPin size={12} className="text-teal-600 dark:text-teal-400" />
                      {currentPhoto.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">
                    {currentPhoto.title}
                  </h3>
                  {currentPhoto.titleDari && (
                    <p className="text-xs text-teal-700 dark:text-teal-400 font-medium mb-4" dir="rtl">
                      {currentPhoto.titleDari}
                    </p>
                  )}

                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {currentPhoto.description}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      {currentPhoto.details}
                    </p>
                  </div>

                  {currentPhoto.stats && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between mb-6">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Key Milestone:</span>
                      <span className="text-xs font-bold text-[#0d9488] dark:text-[#2dd4bf]">
                        {currentPhoto.stats}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                    Protected by 100% Student Privacy Guarantee
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 py-1.5 rounded-lg bg-[#0d9488] text-white text-xs font-semibold hover:bg-teal-700 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
