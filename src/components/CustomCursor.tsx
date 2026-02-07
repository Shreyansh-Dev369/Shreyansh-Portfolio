import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  disableOnInputs?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ disableOnInputs = true }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // 🔴 ONLY FIX: remove ALL native cursors
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important;
      }

      input,
      textarea,
      [contenteditable="true"] {
        cursor: text !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        disableOnInputs &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        setIsHidden(true);
        return;
      }

      if (target.closest("a, button, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        disableOnInputs &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        setIsHidden(false);
      }

      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, disableOnInputs]);

  const safeHSL = (variable: string, fallback: string) =>
    `hsl(var(${variable}, ${fallback}))`;

  if (isHidden) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovering ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
        >
          {/* EVERYTHING BELOW IS UNTOUCHED */}

          <motion.circle
            cx={24}
            cy={24}
            r={22}
            fill="none"
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.4}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />

          <motion.path
            d="M24 4 L40 12 L40 28 L24 36 L8 28 L8 12 Z"
            fill={`${safeHSL("--primary", "200,100%,50%")}/0.1`}
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={1.5}
            animate={{ strokeOpacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <rect
            x={14}
            y={10}
            width={20}
            height={18}
            rx={3}
            fill={safeHSL("--card", "0,0%,90%")}
            stroke={safeHSL("--primary", "200,100%,50%")}
            strokeWidth={2}
          />

          <motion.rect
            x={16}
            y={14}
            width={16}
            height={6}
            rx={1}
            fill={safeHSL("--primary", "200,100%,50%")}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />

          <motion.circle
            cx={20}
            cy={17}
            r={2}
            fill={safeHSL("--background", "0,0%,100%")}
            animate={{ x: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx={28}
            cy={17}
            r={2}
            fill={safeHSL("--background", "0,0%,100%")}
            animate={{ x: [1, -1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {isHovering && (
            <motion.circle
              cx={24}
              cy={24}
              r={18}
              fill="none"
              stroke={safeHSL("--destructive", "0,100%,50%")}
              strokeWidth={1}
              strokeDasharray="8 4"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
