import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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

  /* ================= LOGO MOTION ================= */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(dx * 8);
    y.set(dy * -8);
  };

  /* ================= SCROLL ACTIVE ================= */
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
      animate={{ height: isScrolled ? 52 : 64 }}
      transition={{ duration: 0.3 }}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-background/70 backdrop-blur-xl
        border-b border-border/40
        px-4 md:px-6
        flex items-center
      "
    >
      {/* ================= LOGO ================= */}
      <motion.div
        className="flex items-center justify-center"
        style={{ perspective: 1200 }}
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        animate={{ scale: isScrolled ? 0.85 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* GLOWING CIRCLE */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 8px rgba(255,46,46,0.4)",
              "0 0 18px rgba(255,46,46,0.9)",
              "0 0 8px rgba(255,46,46,0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex items-center justify-center
            rounded-full
            border border-red-500/60
            w-10 h-10 md:w-11 md:h-11
          "
        >
          {/* LOGO IMAGE (BIGGER SKULL) */}
          <motion.img
            src="shreyansh.png"
            alt="Logo"
            draggable={false}
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="
              w-8 h-8 md:w-9 md:h-9
              object-contain
              select-none
              pointer-events-none
              bg-transparent
            "
          />
        </motion.div>
      </motion.div>

      {/* ================= NAV ================= */}
      <nav className="ml-auto flex items-center">
        <ul className="flex gap-6 md:gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
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
                      absolute -bottom-2 left-0
                      h-[2px] w-full
                      bg-primary rounded-full
                    "
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
