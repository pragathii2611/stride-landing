"use client";

import { useEffect, useRef } from "react";

export default function ScrollGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [
  { sel: ".section-hero", color: "rgba(59,126,248,0.07)", x: 50, y: 38 },
  { sel: ".section-ticker", color: "rgba(59,126,248,0.04)", x: 50, y: 50 },
  { sel: ".section-carousel", color: "rgba(59,126,248,0.05)", x: 68, y: 44 },
  { sel: ".section-flip", color: "rgba(59,126,248,0.04)", x: 50, y: 50 },
  { sel: ".section-journey", color: "rgba(59,126,248,0.04)", x: 38, y: 50 },
  { sel: ".section-pipeline", color: "rgba(59,126,248,0.04)", x: 32, y: 50 },
  { sel: ".section-macbook", color: "transparent", x: 50, y: 50 },  // ← add this
  { sel: ".section-pricing", color: "rgba(59,126,248,0.06)", x: 50, y: 50 },
  { sel: ".section-testi", color: "rgba(59,126,248,0.03)", x: 62, y: 50 },
  { sel: ".section-cta", color: "rgba(59,126,248,0.05)", x: 40, y: 50 },
];

    const onScroll = () => {
      const vh = window.innerHeight;
      const el = glowRef.current;
      if (!el) return;

      for (const s of sections) {
        const sEl = document.querySelector(s.sel) as HTMLElement | null;
        if (!sEl) continue;
        const r = sEl.getBoundingClientRect();
        if (r.top < vh * 0.65 && r.bottom > vh * 0.35) {
          const prog = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / r.height));
          const y = s.y + (prog - 0.5) * 16;
          el.style.background = `radial-gradient(ellipse 80vw 70vh at ${s.x}% ${y}%, ${s.color}, transparent 70%)`;
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-all duration-700"
    />
  );
}
