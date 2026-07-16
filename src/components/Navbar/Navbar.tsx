import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { NAV_LINKS } from "../../lib/constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id), 80);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const html = document.documentElement;
        html.style.scrollSnapType = "none";
        html.style.scrollBehavior = "auto";
        html.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        setTimeout(() => {
          html.style.scrollSnapType = "";
          html.style.scrollBehavior = "";
        }, 800);
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-lg border-b border-white/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <button
              onClick={() => handleClick("hero")}
              className="flex items-center gap-1.5 text-rose font-display font-semibold text-lg"
            >
              <Heart className="w-4 h-4 fill-rose" />
              Hager
            </button>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeId === link.id
                      ? "bg-rose text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white origin-center"
              />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden bg-charcoal/95 backdrop-blur-lg border-b border-white/10"
              >
                <div className="px-4 py-3 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleClick(link.id)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeId === link.id
                          ? "bg-rose text-white"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
