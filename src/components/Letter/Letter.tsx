import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Heart, Mail } from "lucide-react";
import { LETTER_TEXT } from "../../lib/constants";

export function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const revealWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  const paragraphs = LETTER_TEXT.split("\n\n").filter(Boolean);

  return (
    <section id="letter" className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/3 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-rose-light text-sm font-medium tracking-widest uppercase mb-3">
            Words From My Soul
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            A <span className="text-rose">Letter</span> to You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative bg-white rounded-2xl p-8 sm:p-12 border border-rose/10 shadow-lg shadow-rose/5"
        >
          {/* Seal */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>

          {/* Letter icon */}
          <div className="flex justify-center mb-6 pt-2">
            <Mail className="w-6 h-6 text-rose-light/60" />
          </div>

          {/* Letter content with typewriter reveal */}
          <div className="relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cream z-10"
              style={{ width: revealWidth, right: 0, left: "auto" }}
            />
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`font-display text-base sm:text-lg leading-relaxed ${
                    i === 0
                      ? "text-charcoal font-semibold text-xl"
                      : "text-charcoal/80"
                  } ${para.startsWith("Forever") ? "text-rose font-semibold italic" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute bottom-4 right-4 opacity-10">
            <Heart className="w-24 h-24 text-rose fill-rose" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
