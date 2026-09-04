import React, { useEffect, useState } from "react";

export const AnimatedNumber = ({
  value,
  duration = 2000,
  formatValue = (v) => Math.round(v),
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = null;
    const endValue = Number(value) || 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrent(easeProgress * endValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(endValue);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return <>{formatValue(current)}</>;
};

export default AnimatedNumber;
