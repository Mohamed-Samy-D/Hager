import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Heart } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const inView = useInView(ref, { once: true });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const hearts: { x: number; y: number; size: number; speed: number; wobble: number }[] = [];
    for (let i = 0; i < 20; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: 6 + Math.random() * 10,
        speed: 0.3 + Math.random() * 0.7,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const h of hearts) {
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = "#E11D48";
        ctx.translate(h.x, h.y);
        ctx.beginPath();
        ctx.moveTo(0, h.size * 0.3);
        ctx.bezierCurveTo(-h.size, -h.size * 0.3, -h.size * 0.5, -h.size, 0, -h.size * 0.5);
        ctx.bezierCurveTo(h.size * 0.5, -h.size, h.size, -h.size * 0.3, 0, h.size * 0.3);
        ctx.fill();
        ctx.restore();

        h.y -= h.speed;
        h.x += Math.sin(h.wobble) * 0.3;
        h.wobble += 0.02;

        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <footer
      ref={ref}
      className="relative bg-charcoal text-white py-12 sm:py-20 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose fill-rose mx-auto mb-4 sm:mb-6" />

          <p className="font-display text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3">
            Made with all my love
          </p>
          <p className="font-display text-base sm:text-xl text-white/50 italic">
            for the most beautiful Hager
          </p>
          <p className="font-arabic text-sm sm:text-lg text-white/30 mt-2 sm:mt-3">
            صُنع بكل حبي لـ هاجر الجميلة
          </p>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
            <p className="text-white/30 text-xs sm:text-sm tracking-[0.3em] uppercase">
              Forever & Always
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
