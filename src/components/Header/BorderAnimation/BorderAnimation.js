import React, { useEffect, useRef } from "react";

export const BorderAnimation = () => {
  const progressBarRef = useRef(null);
  const animationFrameId = useRef(null);
  const lastProgress = useRef(0);

  const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = Math.max(0, Math.min(window.scrollY, scrollHeight));
    const progress = (scrollPosition / scrollHeight) * 100;
    
    if (progressBarRef.current) {
      const hue = (progress * 3.6) % 360;
      progressBarRef.current.style.width = `${progress}%`;
      progressBarRef.current.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
      progressBarRef.current.style.boxShadow = `0 0 10px hsl(${hue}, 80%, 50%)`;
    }

    lastProgress.current = progress;
    animationFrameId.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-[60px] left-0 h-[4px] z-50 transition-[background,box-shadow] duration-100"
      role="progressbar"
      aria-valuenow={Math.round(lastProgress.current)}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  );
};