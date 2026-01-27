import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "你好", lang: "Chinese" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Ciao", lang: "Italian" },
  { text: "Olá", lang: "Portuguese" },
  { text: "Привет", lang: "Russian" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "Hallo", lang: "German" },
];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();

  const completeRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Accessibility: skip animations if reduced motion is enabled
    if (reducedMotion) {
      onComplete();
      return;
    }

    if (index < greetings.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setIndex((i) => i + 1);
      }, 200);
    } else {
      timerRef.current = window.setTimeout(() => {
        if (!completeRef.current) {
          completeRef.current = true;
          setDone(true);
          onComplete();
        }
      }, 500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index, onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="status"
          aria-label="Loading"
        >
          <div className="relative flex flex-col items-center gap-10">
            {/* Greeting */}
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-display font-bold text-red-500 glow-text"
            >
              {greetings[index].text}
            </motion.span>

            {/* Progress bar */}
            <div className="w-48 h-1 rounded-full bg-neutral-800 overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${((index + 1) / greetings.length) * 100}%`,
                }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
