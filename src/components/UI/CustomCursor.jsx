import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch / mobile device
    const checkTouch = () => {
      const touchDetected =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(touchDetected);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Quick setters for ultra-smooth 60fps tracking
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    const handleMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseDown = () => {
      ring.classList.add('is-clicking');
    };

    const handleMouseUp = () => {
      ring.classList.remove('is-clicking');
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.matches('a, button, input, textarea, select, .btn, .interactive, [role="button"]') ||
          target.closest('a, button, .btn, .interactive, [role="button"]'))
      ) {
        ring.classList.add('is-hovering');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        (target.matches('a, button, input, textarea, select, .btn, .interactive, [role="button"]') ||
          target.closest('a, button, .btn, .interactive, [role="button"]'))
      ) {
        ring.classList.remove('is-hovering');
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
