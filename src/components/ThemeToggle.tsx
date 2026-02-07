import { useEffect } from "react";
import { Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  useEffect(() => {
    // 🔒 Force dark mode only
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/80 text-primary backdrop-blur-sm"
      aria-label="Dark mode enabled"
    >
      <Moon className="h-5 w-5" />
    </motion.button>
  );
};

export default ThemeToggle;
