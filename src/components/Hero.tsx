import { useEffect, useRef, useState } from "react";
import { motion, Variants, useAnimation, useViewportScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false);
  const scrollArrowControls = useAnimation();
  const { scrollY } = useViewportScroll();

  // Smooth fade based on scroll
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3,
          onComplete: () => {
            // Once title animation is complete, check if others are done
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.9,
          onComplete: () => setHeroAnimationComplete(true), // trigger arrow after all animations
        }
      );

      gsap.to(".hero-orb-1", { y: -30, x: 20, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-orb-2", { y: 20, x: -30, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll fade effect
  useEffect(() => {
    return scrollY.onChange((y) => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const inView = heroRect.top <= 0 && heroRect.bottom >= 0;
      setScrollOpacity(inView ? 1 : 0);
    });
  }, [scrollY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 1.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background Orbs */}
      <div className="hero-orb-1 pointer-events-none absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
      <div className="hero-orb-2 pointer-events-none absolute bottom-[20%] left-[10%] h-56 w-56 rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        {/* BADGE */}
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

        {/* TITLE */}
        <h1
          ref={titleRef}
          className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I'm{" "}
          <span className="relative inline-block glow-text">
            <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Shreyansh Tripathi
            </span>
            <span className="absolute inset-0 rounded-lg bg-primary/10 backdrop-blur-md" />
          </span>
        </h1>

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          className="mb-6 font-display text-xl font-medium text-muted-foreground opacity-0 sm:text-2xl"
        >
          Aspiring Software Development Engineer
        </p>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg"
        >
          I build scalable, performant, and maintainable web applications,
          focusing on clean architecture and real-world impact.
        </p>

        {/* CTA BUTTONS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            variants={itemVariants}
            href="#projects"
            className="cyber-btn cyber-btn-primary flex items-center gap-2"
            whileTap={{ scale: 0.96 }}
          >
            View Projects
            <ArrowDown className="h-4 w-4" />
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn cyber-btn-outline flex items-center gap-2"
            whileTap={{ scale: 0.96 }}
          >
            <FileText className="h-4 w-4 text-primary drop-shadow-[0_0_6px_rgba(255,46,46,0.9)]" />
            Resume
          </motion.a>
        </motion.div>

        {/* SOCIAL ICONS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                variants={itemVariants}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-card hover:bg-primary/10 transition-all"
              >
                <social.icon className="h-5 w-5 text-foreground drop-shadow-[0_0_6px_rgba(255,46,46,0.8)]" />
              </motion.a>
            ))}
          </div>

          {/* SCROLL INDICATOR */}
          {heroAnimationComplete && (
            <motion.div
              className="mt-6 flex flex-col items-center justify-center"
              animate={{ y: [0, 12, 0], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ opacity: scrollOpacity }}
            >
              <ArrowDown className="h-6 w-6 text-primary" />
              <span className="mt-1 text-sm text-muted-foreground">Scroll</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
