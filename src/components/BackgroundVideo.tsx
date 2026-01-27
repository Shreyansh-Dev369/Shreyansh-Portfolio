import { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  videoSrc?: string;
}

const BackgroundVideo = ({
  videoSrc = "/background.mp4",
}: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile once
    const mobile =
      window.matchMedia("(max-width: 767px)").matches ||
      "ontouchstart" in window;
    setIsMobile(mobile);

    // Visibility handling (safe autoplay)
    const handleVisibility = async () => {
      if (!videoRef.current) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else {
        try {
          await videoRef.current.play();
        } catch {
          // Autoplay blocked → disable video gracefully
          setEnabled(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Disable video on mobile or autoplay failure
  if (isMobile || !enabled) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-background"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onError={() => setEnabled(false)}
      />

      {/* Overlay for contrast */}
      <div
        className="fixed inset-0 -z-10 bg-black/60"
        aria-hidden="true"
      />
    </>
  );
};

export default BackgroundVideo;
