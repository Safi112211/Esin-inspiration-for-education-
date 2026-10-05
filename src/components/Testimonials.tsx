import { motion } from "motion/react";

const testimonials = [
  {
    quote: "With every lesson, I found new confidence. The support here helped me learn, grow, and provide for my loved ones. I'm thankful for the encouragement that helped me believe in my future.",
    author: "Taylor Morgan",
    role: "Vocational Skills Graduate"
  },
  {
    quote: "Being part of this community inspired me to keep learning. The mentors encouraged me to dream bigger and work harder. Now, I feel ready to shape a brighter path for myself and others.",
    author: "Jordan Ellis",
    role: "Education Program Member"
  },
  {
    quote: "Workshops and guidance helped me discover my strengths and build lasting friendships. The sense of belonging and purpose I found here is truly life-changing.",
    author: "Alex Kim",
    role: "Workshop Participant"
  },
  {
    quote: "We connect women with mentors, resources, and—most importantly—a caring community. No one has to walk this path alone. Together, we are building a legacy of hope.",
    author: "Morgan Lee",
    role: "Community Member"
  }
];

export default function Testimonials() {
  return (
    <section id="stories" className="section-padding bg-brand-accent/95 text-brand-light relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark/20 blur-3xl -z-10" />
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-6">Real voices, real transformation</h2>
        <p className="text-brand-light/60 max-w-2xl mx-auto">
          Hear from the women and girls whose lives have been changed through our programs and community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 p-10 border border-white/10 flex flex-col justify-between rounded-2xl"
          >
            <p className="text-xl font-serif italic mb-8 leading-relaxed">"{t.quote}"</p>
            <div>
              <div className="font-bold text-lg">{t.author}</div>
              <div className="text-sm opacity-60 uppercase tracking-widest">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
