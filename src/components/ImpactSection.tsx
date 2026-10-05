import { motion } from "motion/react";

const stats = [
  { label: "More girls gaining access to school", value: "40%" },
  { label: "Women reached with vital support", value: "10K" },
  { label: "Vocational trainings offered each year", value: "23+" },
  { label: "Graduates thriving in new careers", value: "100%" }
];

export default function ImpactSection() {
  return (
    <section className="section-padding bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Impact by the numbers</h2>
          <p className="text-brand-dark/70 mb-12 text-lg">
            Our data-driven approach ensures that every contribution makes a tangible difference in the lives of Afghan women and girls.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-brand-dark pl-6"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-brand-dark/60 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square">
          <img 
            src="https://picsum.photos/seed/impact/1000/1000" 
            alt="Impact visual" 
            className="w-full h-full object-cover rounded-2xl grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 -left-10 bg-brand-dark text-brand-light p-10 max-w-xs hidden md:block rounded-2xl">
            <p className="font-serif italic text-xl">"I never imagined I could achieve so much. With new skills and a caring community, I feel confident and ready to shape my own future."</p>
            <p className="mt-4 text-sm opacity-60">— Taylor Morgan, Vocational Skills Graduate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
