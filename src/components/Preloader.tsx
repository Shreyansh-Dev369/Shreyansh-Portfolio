import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Привет', lang: 'Russian' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'Hallo', lang: 'German' },
];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < greetings.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          role="status"
          aria-label="Loading"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="text-center"
          >
            <span className="text-5xl md:text-7xl font-display font-bold gradient-text glow-text">
              {greetings[currentIndex].text}
            </span>
          </motion.div>
          
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-muted rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
