import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [scrollYShift, setScrollYShift] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
      );

      gsap.to(".hero-orb-1", {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        y: 20,
        x: -30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll indicator fade-in after social icons animation
      gsap.to(".scroll-indicator", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: 2.2, // social icons finish
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Handle fade on scroll
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const aboutTop = aboutSection.getBoundingClientRect().top;

      const opacity = Math.max(0, Math.min(1, aboutTop / heroHeight));
      setScrollOpacity(opacity);

      const shift = Math.max(0, 20 * (1 - opacity));
      setScrollYShift(-shift);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 1.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Shreyansh-Dev369", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/shreyansh369", label: "LinkedIn" },
    { icon: Mail, href: "mailto:dev.shreyansh369@gmail.com", label: "Email" },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      <div className="hero-orb-1 pointer-events-none absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
      <div className="hero-orb-2 pointer-events-none absolute bottom-[20%] left-[10%] h-56 w-56 rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            Available for opportunities
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I'm{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shreyansh Tripathi
            </span>
            <motion.span
              className="absolute -inset-1 -z-10 block rounded-lg bg-primary/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mb-6 font-display text-xl font-medium text-muted-foreground opacity-0 sm:text-2xl"
        >
          Aspiring Software Development Engineer
        </p>

        <p
          ref={descRef}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
        >
          I build scalable, performant, and maintainable web applications,
          focusing on clean architecture, efficient problem-solving, and
          real-world impact.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            variants={itemVariants}
            href="#projects"
            aria-label="View my projects"
            className="btn-primary group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF"
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="h-4 w-4" />
            Resume
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              variants={itemVariants}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon group"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5 transition-colors group-hover:text-primary" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* SCROLL INDICATOR – initially hidden, fades in after icons */}
      <motion.div
        className="scroll-indicator absolute bottom-8 left-[48.5%] -translate-x-1/2"
        style={{ opacity: scrollOpacity, y: scrollYShift }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
