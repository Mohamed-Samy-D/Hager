import { REASONS } from "../../lib/constants";

const BASE = import.meta.env.BASE_URL;

function ReasonCard({
  reason,
}: {
  reason: (typeof REASONS)[number];
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/15 hover:border-rose/40 transition-all duration-300">
      <span className="text-2xl block mb-2">{reason.emoji}</span>
      <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-medium">
        {reason.text}
      </p>
    </div>
  );
}

export function Reasons() {
  return (
    <section id="reasons" className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-wine/30 to-charcoal" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-12 items-center">
          {/* Photo */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none mx-auto lg:mx-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40">
              <img
                src={`${BASE}photos/hager-5.png`}
                alt="Hager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title + Cards */}
          <div>
            <div className="text-center lg:text-left mb-8 sm:mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Why I <span className="text-rose">Love</span> You
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {REASONS.map((reason, i) => (
                <ReasonCard key={i} reason={reason} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
