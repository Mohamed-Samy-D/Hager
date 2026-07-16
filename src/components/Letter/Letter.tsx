import { Heart } from "lucide-react";
import { LETTER_TEXT, LETTER_POETRY } from "../../lib/constants";

const BASE = import.meta.env.BASE_URL;

export function Letter() {
  const paragraphs = LETTER_TEXT.split("\n\n").filter(Boolean);

  return (
    <section id="letter" className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${BASE}last.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            A <span className="text-rose">Letter</span> to You
          </h2>
        </div>

        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-white/15">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-rose flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>

          <div className="space-y-4 pt-2">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`font-display text-sm sm:text-base md:text-lg leading-relaxed ${
                  i === 0 ? "text-white font-semibold text-base sm:text-lg md:text-xl" : "text-white/70"
                } ${para.startsWith("Forever") ? "text-rose font-semibold italic" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
          {LETTER_POETRY.split("\n\n").map((verse, i) => (
            <p
              key={i}
              className="font-arabic text-sm sm:text-base md:text-lg leading-loose text-center text-white/50"
            >
              {verse}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
