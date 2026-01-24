import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Header = () => {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  /* ================= Logo Motion ================= */
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const rX = useSpring(logoY, { stiffness: 120, damping: 18 });
  const rY = useSpring(logoX, { stiffness: 120, damping: 18 });

  const handleLogoMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    logoX.set(x * 8);
    logoY.set(y * -8);
  };

  /* ================= Active Section ================= */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 160) {
          setActive(link.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ height: isScrolled ? 64 : 88 }}
      transition={{ duration: 0.35 }}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-background/70 backdrop-blur-xl
        border-b border-border/40
        pl-1 pr-6
        flex items-center justify-between
      "
    >
      {/* ================= LOGO (BIG + MORE LEFT) ================= */}
      <motion.div
        animate={{ scale: isScrolled ? 0.9 : 1 }}
        transition={{ duration: 0.3 }}
        className="
          w-[112px] h-[112px]
          md:w-[128px] md:h-[128px]
          flex items-center justify-center
          -ml-2 md:-ml-4
        "
        style={{ perspective: 1000 }}
        onMouseMove={handleLogoMove}
        onMouseLeave={() => {
          logoX.set(0);
          logoY.set(0);
        }}
      >
        <motion.img
          src="shreyansh.png"
          alt="Logo"
          draggable={false}
          style={{
            rotateX: rX,
            rotateY: rY,
          }}
          animate={{
            boxShadow: [
              `0 0 28px rgba(var(--accent-glow), 0.4)`,
              `0 0 52px rgba(var(--accent-glow), 0.75)`,
              `0 0 28px rgba(var(--accent-glow), 0.4)`,
            ],
            y: [0, -3, 0],
          }}
          transition={{
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-full h-full object-contain rounded-2xl select-none"
        />
      </motion.div>

      {/* ================= NAV ================= */}
      <nav className="flex items-center gap-10">
        <ul className="flex gap-10">
          {navLinks.map((link, i) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  x.set((e.clientX - r.left - r.width / 2) * 0.15);
                  y.set((e.clientY - r.top - r.height / 2) * 0.15);
                }}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ x, y }}
              >
                <a
                  href={`#${link.id}`}
                  className={`relative text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}

                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="
                        absolute -bottom-2 left-0 h-[2px] w-full
                        bg-primary rounded-full
                      "
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="ml-6">
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
