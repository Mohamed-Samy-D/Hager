import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { REASONS } from "../../lib/constants";

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-xl p-6 border border-rose/10 hover:border-rose/30 transition-all duration-300 hover:shadow-lg hover:shadow-rose/5 group"
    >
      <span className="text-3xl block mb-3">{reason.emoji}</span>
      <p className="text-charcoal/80 text-sm leading-relaxed font-medium">
        {reason.text}
      </p>
    </motion.div>
  );
}

export function Reasons() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reasons" className="relative py-24 sm:py-32 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-light text-sm font-medium tracking-widest uppercase mb-3">
            From My Heart
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            Why I <span className="text-rose">Love</span> You
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Nine reasons — though I could fill a thousand pages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
