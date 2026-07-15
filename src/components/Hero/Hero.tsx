import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

function HeartParticle({ delay }: { delay: number }) {
  const size = 8 + Math.random() * 16;
  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 12;

  return (
    <motion.div
      className="absolute text-rose/20 pointer-events-none"
      style={{ left: `${left}%`, fontSize: size }}
      initial={{ bottom: -20, opacity: 0 }}
      animate={{
        bottom: "110%",
        opacity: [0, 0.6, 0.6, 0],
        x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ♥
    </motion.div>
  );
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.3 - 0.1,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${p.a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    drawParticles();
    const handleResize = () => drawParticles();
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawParticles]);

  const scrollToContent = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-blush to-cream"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <HeartParticle key={i} delay={i * 0.8} />
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rose/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rose-light/5 blur-3xl" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <span className="text-6xl" role="img" aria-label="heart">♥</span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-display text-7xl sm:text-8xl md:text-9xl font-bold text-rose tracking-tight"
          style={{ textShadow: "0 0 80px rgba(225, 29, 72, 0.15)" }}
        >
          Hager
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="mt-4 font-display text-xl sm:text-2xl text-muted italic max-w-md mx-auto"
        >
          My heart belongs to you, always and forever
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
          className="mt-2 font-arabic text-lg sm:text-xl text-rose-light/80"
        >
          قلبي لكِ دائماً وأبداً
        </motion.p>
      </div>

      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-rose-light hover:text-rose transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
