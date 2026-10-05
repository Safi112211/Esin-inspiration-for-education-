import { motion } from "motion/react";
import { getImageUrl } from "../assets/images";
import { Link } from "react-router-dom";

const team = [
  { name: "Fatima Karimi", role: "Executive Director", image: getImageUrl("/input_file_13.png") },
  { name: "Zahra Mohammadi", role: "Pedagogical Lead", image: getImageUrl("/input_file_14.png") },
  { name: "Mariam Noori", role: "Safeguarding & M&E Lead", image: getImageUrl("/input_file_15.png") },
  { name: "Roya Ahmadi", role: "Digital Skills Coordinator", image: getImageUrl("/input_file_16.png") },
  { name: "Soraya Hakimi", role: "Artisan Cooperative Lead", image: getImageUrl("/input_file_17.png") },
  { name: "Benafsha Qaderi", role: "Community Wellbeing Officer", image: getImageUrl("/input_file_18.png") }
];

export default function TeamSection() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 border-b border-[#1a1a1a]/10 dark:border-white/10 bg-[#fdfcf9] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="label-badge mb-6">Leadership & Grassroots Team</div>
            <h2 className="font-syne text-4xl sm:text-5xl font-extrabold uppercase text-[#1a1a1a] dark:text-[#fdfcf9] leading-[0.95]">
              Champions for <br />
              <span className="text-[#5a9a8e]">Change, Together</span>
            </h2>
          </div>
          <Link to="/contact">
            <button className="btn-editorial btn-editorial-primary">
              Join Our Network
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border-[0.75px] border-[#1a1a1a] dark:border-white/20">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 border-[0.75px] border-[#1a1a1a] dark:border-white/20 hover:bg-[#5a9a8e]/5 group transition-all duration-200"
            >
              <div className="aspect-[4/5] overflow-hidden border border-[#1a1a1a]/20 dark:border-white/20 mb-4 bg-[#1a1a1a]/5">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-syne text-sm font-bold uppercase text-[#1a1a1a] dark:text-[#fdfcf9] mb-1">
                {member.name}
              </h3>
              <p className="font-mono text-[0.65rem] uppercase text-[#1a1a1a]/60 dark:text-[#fdfcf9]/60">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
