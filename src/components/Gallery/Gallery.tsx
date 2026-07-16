import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const PHOTOS = [
  { id: 1, src: `${BASE}photos/hager-2.jpeg`, alt: "Hager" },
  { id: 2, src: `${BASE}photos/hager-3.png`, alt: "Hager" },
  { id: 3, src: `${BASE}photos/hager-4.png`, alt: "Hager" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % PHOTOS.length : null));

  return (
    <section id="gallery" className="relative min-h-screen flex items-center overflow-hidden snap-start">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={`${BASE}2.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-rose">Gallery</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className="group cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/15 transition-transform duration-300 group-hover:scale-[1.02] shadow-lg shadow-black/30">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-6 text-white/70 hover:text-white text-3xl sm:text-5xl p-2"
            >
              ‹
            </button>

            <div
              className="max-w-lg sm:max-w-2xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[lightboxIndex].src}
                alt={PHOTOS[lightboxIndex].alt}
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-6 text-white/70 hover:text-white text-3xl sm:text-5xl p-2"
            >
              ›
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
