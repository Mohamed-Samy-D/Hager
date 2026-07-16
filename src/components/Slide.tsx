import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "motion/react";

export function Slide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"before" | "active" | "after">("before");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const vh = window.innerHeight;

        if (rect.top < vh * 0.1 && rect.bottom > vh * 0.1) {
          setState("active");
        } else if (rect.top >= vh * 0.1) {
          setState("before");
        } else {
          setState("after");
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="slide"
      animate={{
        opacity: state === "active" ? 1 : 0,
        scale: state === "active" ? 1 : 0.92,
        filter: state === "active" ? "blur(0px)" : "blur(4px)",
      }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
