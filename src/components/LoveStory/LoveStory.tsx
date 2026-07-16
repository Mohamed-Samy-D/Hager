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

function MilestoneCard({
  milestone,
}: {
  milestone: (typeof STORY_MILESTONES)[number];
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/15">
      <span className="text-xs font-medium text-rose tracking-wider uppercase">
        {milestone.date}
      </span>
      <h3 className="font-display text-base sm:text-lg font-semibold text-white mt-1">
        {milestone.title}
      </h3>
      <p className="text-white/60 text-xs sm:text-sm mt-1 leading-relaxed">
        {milestone.description}
      </p>
    </div>
  );
}

export function LoveStory() {
  return (
    <section id="story" className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-charcoal/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-rose">Story</span>
          </h2>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose/40 via-rose/60 to-rose/40" />
          <div className="space-y-10">
            {STORY_MILESTONES.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              const Icon = ICONS[milestone.icon];
              return (
                <div key={i} className="relative grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center">
                  <div className={isLeft ? "text-right" : ""}>
                    {isLeft && <MilestoneCard milestone={milestone} />}
                  </div>
                  <div className="flex flex-col items-center relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose flex items-center justify-center z-10 shadow-lg shadow-rose/30">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    {!isLeft && <MilestoneCard milestone={milestone} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose/40 via-rose/60 to-rose/40" />
          <div className="space-y-5">
            {STORY_MILESTONES.map((milestone, i) => {
              const Icon = ICONS[milestone.icon];
              return (
                <div key={i} className="relative">
                  <div className="absolute -left-8 w-8 h-8 rounded-full bg-rose flex items-center justify-center z-10 shadow-lg shadow-rose/30">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <MilestoneCard milestone={milestone} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
