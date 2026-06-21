import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Position references
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Check if touch device
  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dynamic resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor(x, y, isExplosion = false) {
        this.x = x;
        this.y = y;
        this.isExplosion = isExplosion;

        // Speed and direction
        const angle = Math.random() * Math.PI * 2;
        const speed = isExplosion
          ? Math.random() * 4 + 2 // Fast explosion
          : Math.random() * 1.5 + 0.2; // Gentle drift

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Slightly move particles opposite of mouse movement if trailing
        if (!isExplosion && isMovingRef.current) {
          const dx = mouseRef.current.x - lastMouseRef.current.x;
          const dy = mouseRef.current.y - lastMouseRef.current.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 1) {
            this.vx -= (dx / len) * 0.5;
            this.vy -= (dy / len) * 0.5;
          }
        }

        // Color selection (cyan, purple, blue from CSS system)
        const colors = [
          { r: 0, g: 242, b: 254 }, // Cyan
          { r: 138, g: 43, b: 226 }, // Purple
          { r: 79, g: 172, b: 254 }, // Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.size = isExplosion
          ? Math.random() * 5 + 3
          : Math.random() * 3.5 + 1.5;
        this.maxLife = isExplosion
          ? Math.random() * 30 + 20
          : Math.random() * 40 + 30;
        this.life = this.maxLife;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Slow down slightly
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.life--;
        this.size *= 0.96; // Shrink
      }

      draw(context) {
        const alpha = Math.max(0, this.life / this.maxLife);
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Add subtle radial glow gradient for premium feel
        const gradient = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size,
        );
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`,
        );

        context.fillStyle = gradient;
        context.fill();
      }
    }

    let particles = [];

    // Track mouse move
    const handleMouseMove = (e) => {
      // Show canvas cursor details
      lastMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMovingRef.current = true;

      // Spawn trail particles
      const distance = Math.hypot(
        mouseRef.current.x - lastMouseRef.current.x,
        mouseRef.current.y - lastMouseRef.current.y,
      );

      // Spawn rate based on speed
      if (distance > 2) {
        const count = Math.min(3, Math.floor(distance / 4) + 1);
        for (let i = 0; i < count; i++) {
          particles.push(
            new Particle(
              e.clientX + (Math.random() - 0.5) * 6,
              e.clientY + (Math.random() - 0.5) * 6,
            ),
          );
        }
      }
    };

    // Track click explosions
    const handleMouseDown = () => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(mouseRef.current.x, mouseRef.current.y, true),
        );
      }
    };

    // Hover state tracking via event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".social-btn") ||
          target.closest(".nav-link") ||
          target.closest('[role="button"]') ||
          window.getComputedStyle(target).cursor === "pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);

    // Initial position to prevent jump
    ringRef.current = { ...mouseRef.current };

    // Easing state
    let innerDotRadius = 3;
    let outerRingRadius = 8;
    let hoverProgress = 0; // 0 to 1

    // Animation Loop
    let animId;
    const tick = () => {
      animId = requestAnimationFrame(tick);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Easing / Lerping for the outer ring
      // Slow follow speed
      const lerpFactor = 0.15;
      ringRef.current.x +=
        (mouseRef.current.x - ringRef.current.x) * lerpFactor;
      ringRef.current.y +=
        (mouseRef.current.y - ringRef.current.y) * lerpFactor;

      // Animate hover properties smoothly
      if (isHovering) {
        hoverProgress += (1 - hoverProgress) * 0.15;
      } else {
        hoverProgress += (0 - hoverProgress) * 0.15;
      }

      // Morph dimensions based on hover
      innerDotRadius = 3 * (1 - hoverProgress); // Shrinks to 0
      outerRingRadius = 8 + 18 * hoverProgress; // Expands from 8 to 26

      // Update and draw particles first (behind the cursor elements)
      particles = particles.filter((p) => {
        p.update();
        if (p.life <= 0) return false;
        p.draw(ctx);
        return true;
      });

      // 1. Draw Outer Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        ringRef.current.x,
        ringRef.current.y,
        outerRingRadius,
        0,
        Math.PI * 2,
      );

      // Interpolate colors: Cyan (#00f2fe) to Purple (#8a2be2)
      const ringOpacity = 0.4 + 0.3 * hoverProgress; // Glows slightly brighter on hover
      const red = Math.round(0 + (138 - 0) * hoverProgress);
      const green = Math.round(242 + (43 - 242) * hoverProgress);
      const blue = Math.round(254 + (226 - 254) * hoverProgress);

      ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${ringOpacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Add a soft fill on hover
      if (hoverProgress > 0.05) {
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.08 * hoverProgress})`;
        ctx.fill();
      }
      ctx.restore();

      // 2. Draw Inner Dot
      if (innerDotRadius > 0.1) {
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          innerDotRadius,
          0,
          Math.PI * 2,
        );
        // Purple inner dot
        ctx.fillStyle = "rgba(138, 43, 226, 0.95)";
        ctx.shadowColor = "rgba(138, 43, 226, 0.6)";
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      isMovingRef.current = false;
    };

    tick();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, isHovering]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999, // Ensure it sits on top of all visual elements
        pointerEvents: "none", // Allows clicking through to interactive elements
      }}
    />
  );
};

export default CustomCursor;
