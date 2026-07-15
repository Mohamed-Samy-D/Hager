import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  MessageCircle,
  Heart,
  Sparkle,
  Infinity,
} from "lucide-react";
import { STORY_MILESTONES } from "../../lib/constants";

const ICONS = {
  sparkles: Sparkles,
  "message-circle": MessageCircle,
  heart: Heart,
  sparkle: Sparkle,
  infinity: Infinity,
} as const;

function TimelineNode({
  milestone,
  index,
}: {
  milestone: (typeof STORY_MILESTONES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const Icon = ICONS[milestone.icon];

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
      {/* Left content */}
      <div className={`${isLeft ? "text-right" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-5 border border-rose/10 shadow-sm"
          >
            <span className="text-xs font-medium text-rose-light tracking-wider uppercase">
              {milestone.date}
            </span>
            <h3 className="font-display text-xl font-semibold text-charcoal mt-1">
              {milestone.title}
            </h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              {milestone.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center line + icon */}
      <div className="flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="w-12 h-12 rounded-full bg-rose flex items-center justify-center z-10 shadow-lg shadow-rose/20"
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Right content */}
      <div>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-5 border border-rose/10 shadow-sm"
          >
            <span className="text-xs font-medium text-rose-light tracking-wider uppercase">
              {milestone.date}
            </span>
            <h3 className="font-display text-xl font-semibold text-charcoal mt-1">
              {milestone.title}
            </h3>
            <p className="text-muted text-sm mt-2 leading-relaxed">
              {milestone.description}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function LoveStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative py-24 sm:py-32 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-light text-sm font-medium tracking-widest uppercase mb-3">
            Journey of Love
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            Our <span className="text-rose">Story</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose/20 via-rose/40 to-rose/20" />

          <div className="space-y-12">
            {STORY_MILESTONES.map((milestone, i) => (
              <TimelineNode key={i} milestone={milestone} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile: simplified list */}
        <div className="md:hidden mt-12 space-y-6">
          {STORY_MILESTONES.map((milestone, i) => {
            const Icon = ICONS[milestone.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-xs font-medium text-rose-light tracking-wider uppercase">
                    {milestone.date}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {milestone.title}
                  </h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
