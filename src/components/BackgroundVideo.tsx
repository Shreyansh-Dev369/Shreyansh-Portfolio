import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
}

const VideoBackground = ({ videoSrc }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Pause video when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Disable video on mobile for battery/data
  if (isMobile) {
    return (
      <div 
        className="fixed inset-0 -z-10 bg-background"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {isVisible && (
        <video
          ref={videoRef}
          className="video-bg will-change-transform"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onError={() => setIsVisible(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="video-overlay" aria-hidden="true" />
    </>
  );
};

export default VideoBackground;
