import { useEffect, useRef, useState } from 'react';

export const useCountUp = (target: number, duration: number = 2500) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const raf = useRef<number | null>(null);
  const hasStarted = useRef(false);

  // We wrap start in useCallback-like behavior, but since it's just a ref flag,
  // we can define it inline safely.
  const start = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    startTime.current = null; // Reset startTime for new runs

    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    // Whenever target changes (or on hot reload), restart the counter
    setCount(0);
    hasStarted.current = false;
    start();
    
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return { count, start };
};
