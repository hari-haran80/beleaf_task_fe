import React, { useState, useEffect } from 'react';
import useCanvasCursor from './useCanvasCursor';

const CanvasCursor = () => {
  const [isCursorEnabled, setIsCursorEnabled] = useState(window.innerWidth > 768); // Tablet breakpoint
  const canvasRef = useCanvasCursor(isCursorEnabled); // Pass isCursorEnabled to the hook

  useEffect(() => {
    const handleResize = () => {
      setIsCursorEnabled(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isCursorEnabled) return null; // Do not render canvas if cursor animation is disabled

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none', // Allows interactions with elements below
      }}
    />
  );
};

export default CanvasCursor;
