import { Heart } from "lucide-react";

export function Hero() {
  const scrollNext = () => {
    const html = document.documentElement;
    html.style.scrollSnapType = "none";
    html.style.scrollBehavior = "auto";
    const el = document.getElementById("about");
    if (el) {
      html.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      setTimeout(() => {
        html.style.scrollSnapType = "";
        html.style.scrollBehavior = "";
      }, 800);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden snap-start"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/0.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <Heart className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-rose fill-rose mx-auto mb-6 sm:mb-8" />

        <h1
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none"
          style={{ textShadow: "0 0 120px rgba(225, 29, 72, 0.3)" }}
        >
          Hager
        </h1>

        <div className="h-0.5 bg-rose w-24 mx-auto my-4 sm:my-6" />

        <p className="font-display text-base sm:text-xl md:text-2xl text-white/80 italic">
          A love story told just for you
        </p>

        <p className="font-arabic text-sm sm:text-lg md:text-xl text-white/50 mt-2 sm:mt-3">
          قصّة حبّ تُحكى لكِ وحدكِ
        </p>
      </div>

      <button
        onClick={scrollNext}
        className="absolute bottom-6 sm:bottom-10 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase">Begin</span>
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
      </button>
    </section>
  );
}
