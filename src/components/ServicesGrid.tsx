import { motion } from "motion/react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Education Access",
    description: "Structured home-based learning and online classes following a standardized curriculum.",
    link: "/learning-hub"
  },
  {
    title: "Digital Literacy",
    description: "From computer fundamentals to AI literacy, ensuring women are secure and capable in the digital world.",
    link: "/learning-hub"
  },
  {
    title: "Income Generation",
    description: "Practical training in digital freelancing, design, and traditional crafts for economic independence.",
    link: "/economic-empowerment"
  },
  {
    title: "Safe Community",
    description: "A women-only digital space for expression, peer support, and mentorship with anonymous options.",
    link: "/safe-space"
  },
  {
    title: "Mental Wellbeing",
    description: "Trauma-informed workshops and group support aligned with international safeguarding standards.",
    link: "/wellbeing"
  },
  {
    title: "Secure Access",
    description: "Encrypted communication and data minimization policies to ensure foundational safety.",
    link: "/safe-space"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-[#1a1a1a]/10 dark:border-white/10 bg-[#fdfcf9] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="label-badge mb-4">Ecosystem Pillars</div>
          <h2 className="font-syne text-4xl md:text-5xl font-extrabold uppercase text-[#1a1a1a] dark:text-[#fdfcf9]">
            What <span className="text-[#5a9a8e]">ESIN Provides</span>
          </h2>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-[0.75px] border-[#1a1a1a] dark:border-white/20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-10 border-[0.75px] border-[#1a1a1a] dark:border-white/20 hover:bg-[#5a9a8e] hover:text-white dark:hover:bg-[#5a9a8e] group transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-syne text-xl md:text-2xl font-extrabold uppercase mb-4 text-[#1a1a1a] dark:text-[#fdfcf9] group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-[#fdfcf9]/70 text-sm leading-relaxed mb-8 group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>
              </div>
              <Link 
                to={service.link}
                className="font-mono text-[0.7rem] uppercase font-bold text-[#1a1a1a] dark:text-[#fdfcf9] group-hover:text-white transition-colors flex items-center gap-2"
              >
                Explore Pillar &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

