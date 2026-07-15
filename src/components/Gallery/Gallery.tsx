import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { X, Heart } from "lucide-react";
import { GALLERY_IMAGES } from "../../lib/constants";

function GalleryCard({
  image,
  index,
  onOpen,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  index: number;
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(index);
        }
      }}
      aria-label={`View ${image.alt}`}
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-rose/10 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-rose/10">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: image.color }}
        >
          <Heart className="w-10 h-10 text-white/50 group-hover:text-white/80 transition-colors" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm font-medium">{image.alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null));

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-rose-light text-sm font-medium tracking-widest uppercase mb-3">
            Captured Moments
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            Our <span className="text-rose">Gallery</span>
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Every photo tells a story. Every story is about you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((image, i) => (
            <GalleryCard key={image.id} image={image} index={i} onOpen={setLightboxIndex} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-label="Photo lightbox"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 text-white/70 hover:text-white text-4xl p-2"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl w-full aspect-[4/5] rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: GALLERY_IMAGES[lightboxIndex].color }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <Heart className="w-20 h-20 text-white/40 mx-auto mb-4" />
                <p className="text-white/80 text-lg font-medium">
                  {GALLERY_IMAGES[lightboxIndex].alt}
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Replace with actual photo
                </p>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 text-white/70 hover:text-white text-4xl p-2"
              aria-label="Next photo"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
