import React, { useState, useEffect } from 'react';
import useCanvasCursor from './useCanvasCursor';

const CanvasCursor = () => {
  const [isCursorEnabled, setIsCursorEnabled] = useState(window.innerWidth > 768);
  const canvasRef = useCanvasCursor(isCursorEnabled);

  useEffect(() => {
    const handleResize = () => {
      setIsCursorEnabled(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isCursorEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CanvasCursor;
