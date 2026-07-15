import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-light text-sm font-medium tracking-widest uppercase mb-3">
            The One I Love
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            About <span className="text-rose">Hager</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-blush via-surface to-rose/10 border border-rose/10 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <Heart className="w-16 h-16 text-rose-light/40 mx-auto mb-4" />
                <p className="text-muted text-sm">Your photo here</p>
                <p className="text-muted/60 text-xs mt-1">Replace with Hager's photo</p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-rose/5 border border-rose/10 -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-charcoal/80 leading-relaxed">
              She is the kind of person who makes the world a better place just by being in it.
              Her smile can end wars, and her voice can calm storms.
            </p>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Hager is not just beautiful on the outside — she is grace, intelligence,
              and kindness wrapped in the most gorgeous soul I have ever known.
            </p>
            <p className="text-lg text-charcoal/80 leading-relaxed">
              Every moment with her feels like a gift I never knew I deserved.
              She is my best friend, my safe place, and the love of my life.
            </p>
            <div className="pt-4">
              <span className="font-arabic text-xl text-rose-light/80 block text-right leading-loose">
                هي أجمل ما في حياتي<br />
                هي الدفء الذي يملأ قلبي<br />
                هي السبب الذي يجعلني أبتسم كل يوم
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
