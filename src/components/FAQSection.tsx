import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I get started?",
    answer: "Just complete our simple online application. After you apply, our team will connect with you to guide you every step of the way."
  },
  {
    question: "Who can benefit from your support?",
    answer: "Our programs are open to Afghan women and girls from all walks of life, whether you're seeking education, new skills, or a supportive community."
  },
  {
    question: "What kinds of help are available?",
    answer: "We provide more than education—enjoy mentorship, counseling, and a caring community to help you grow and succeed."
  },
  {
    question: "How can I help or contribute?",
    answer: "You can get involved by donating, volunteering your skills as a mentor, or spreading awareness about our mission."
  },
  {
    question: "Where do your programs take place?",
    answer: "We offer both in-person sessions at our community centers and online learning opportunities for those who cannot attend in person."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="help" className="section-padding bg-brand-dark/95 text-brand-light relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-accent/10 blur-3xl -z-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Empowering answers, uplifting futures</h2>
          <p className="text-brand-light/60 text-lg mb-12">
            Explore how we uplift Afghan women and girls through education, skills, and support. Your journey starts here—find answers to your most important questions.
          </p>
          <div className="aspect-video overflow-hidden rounded-2xl">
            <img 
              src="https://picsum.photos/seed/faq/800/450" 
              alt="Community gathering" 
              className="w-full h-full object-cover grayscale brightness-75"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-brand-light/80 transition-colors"
              >
                <span className="text-xl font-serif">{faq.question}</span>
                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-brand-light/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <div className="mt-8 p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl mb-2">Still have questions?</h3>
            <p className="text-brand-light/60 mb-6 text-sm">Our team is here to help you find your path and connect with the resources you need.</p>
            <button className="bg-brand-light text-brand-dark px-6 py-2 text-sm font-medium hover:bg-brand-light/90 transition-all">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
