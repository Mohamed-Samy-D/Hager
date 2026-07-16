const BASE = import.meta.env.BASE_URL;

export function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${BASE}1.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none mx-auto md:mx-0">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40">
              <img
                src={`${BASE}photos/hager-1.jpeg`}
                alt="Hager"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-rose/20 -z-10" />
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              About <span className="text-rose">Hager</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              She is grace, intelligence, and kindness wrapped in the most gorgeous soul I have ever known.
            </p>
            <p className="font-arabic text-sm sm:text-base text-white/40 leading-loose">
              هي أجمل ما في حياتي<br />
              هي السبب الذي يجعلني أبتسم كل يوم
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
