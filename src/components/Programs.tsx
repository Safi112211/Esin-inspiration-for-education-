import { motion } from "motion/react";
import { BookOpen, Briefcase, Heart, Users } from "lucide-react";
import { getImageUrl } from "../assets/images";

const programs = [
  {
    title: "Education Programs",
    description: "Discover our comprehensive educational initiatives designed to foster learning and growth.",
    icon: <BookOpen className="w-6 h-6" />,
    image: getImageUrl("/input_file_12.png"),
    size: "large"
  },
  {
    title: "Vocational Training",
    description: "Explore our vocational training programs that equip women with essential skills for the workforce.",
    icon: <Briefcase className="w-6 h-6" />,
    image: getImageUrl("/input_file_3.png"),
    size: "small"
  },
  {
    title: "Holistic Support",
    description: "Learn about our holistic support services that nurture well-being and resilience.",
    icon: <Heart className="w-6 h-6" />,
    image: getImageUrl("/input_file_11.png"),
    size: "small"
  },
  {
    title: "Community Outreach",
    description: "Engaging with local communities to build a stronger network of support and awareness.",
    icon: <Users className="w-6 h-6" />,
    image: getImageUrl("/input_file_2.png"),
    size: "medium"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="section-padding bg-brand-dark/95 text-brand-light relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-accent/10 blur-3xl -z-10" />
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl mb-6">Our Programs</h2>
        <p className="text-brand-light/60 max-w-xl">
          We provide a range of services designed to empower Afghan women and girls at every stage of their journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative group overflow-hidden rounded-2xl min-h-[400px] ${
              program.size === "large" ? "md:col-span-2 md:row-span-2" : 
              program.size === "medium" ? "md:col-span-2" : ""
            }`}
          >
            <img 
              src={program.image} 
              alt={program.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="mb-4 p-3 bg-brand-light/10 backdrop-blur-sm w-fit rounded-2xl">
                {program.icon}
              </div>
              <h3 className="text-2xl mb-2">{program.title}</h3>
              <p className="text-brand-light/70 max-w-sm mb-6">{program.description}</p>
              <button className="text-sm font-medium underline underline-offset-4 hover:text-brand-light/100 transition-colors">
                Learn more
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
