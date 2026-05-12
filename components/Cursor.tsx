"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -200, mouseY = -200;
    let glowX = -200, glowY = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // Dot — instant, no lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }

      // Glow — smooth lerp, trails slightly behind
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 240}px, ${glowY - 240}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Glow — trails behind */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(59,126,248,0.07) 0%, transparent 65%)",
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 10px 2px rgba(91,154,255,0.4), 0 0 24px 4px rgba(59,126,248,0.15)",
          willChange: "transform",
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}