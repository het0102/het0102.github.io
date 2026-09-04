import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimations = () => {
  useEffect(() => {
    // Refresh triggers on layout update
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.reveal-on-scroll');

      elements.forEach((elem) => {
        gsap.fromTo(
          elem,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => {
      ctx.revert(); // Cleanly revert all animations and kill triggers on unmount
    };
  }, []);
};

export default useScrollAnimations;
