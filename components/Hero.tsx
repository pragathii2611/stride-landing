"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLS = ["#3b7ef8", "#5b9aff", "#93c5fd", "#1d4ed8", "#60a5fa"];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  };
}

interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; c: string; p: number; ps: number; cx: number; cy: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, running = true;

    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.floor((W * H) / 11000);
      nodesRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.8 + 0.6,
        c: COLS[Math.floor(Math.random() * COLS.length)],
        p: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.01 + 0.004,
        cx: Math.random() > 0.4 ? W / 2 + (Math.random() - 0.5) * 320 : Math.random() * W,
        cy: Math.random() > 0.4 ? H / 2 + (Math.random() - 0.5) * 220 : Math.random() * H,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      const nodes = nodesRef.current;
      nodes.forEach((n) => {
        n.p += n.ps;
        n.x += (n.cx - n.x) * 0.0003 + n.vx;
        n.y += (n.cy - n.y) * 0.0003 + n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = n.x - mx, dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { const f = (130 - d) / 130; n.x += dx * f * 0.03; n.y += dy * f * 0.03; }
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,126,248,${((1 - d / 160) * 0.18).toFixed(3)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const pm = 1 + Math.sin(n.p) * 0.2, r = n.r * pm;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        g.addColorStop(0, n.c + "99"); g.addColorStop(1, n.c + "00");
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.globalAlpha = 0.16; ctx.fill(); ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.c; ctx.globalAlpha = 0.68; ctx.fill(); ctx.globalAlpha = 1;
      });
      const cG = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 300);
      cG.addColorStop(0, "rgba(59,126,248,0.05)"); cG.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(W / 2, H / 2, 300, 0, Math.PI * 2);
      ctx.fillStyle = cG; ctx.fill();
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && running) { cancelAnimationFrame(rafRef.current); draw(); }
    };

    init(); draw();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", init);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", init);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <section className="section-hero relative w-full min-h-svh flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "80px clamp(20px,5vw,80px) clamp(40px,6vw,60px)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-grid opacity-40" />

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .btn-primary-animated {
          background: linear-gradient(135deg, #3b7ef8, #00c853, #3b7ef8, #00f260);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          box-shadow: 0 0 24px rgba(59,126,248,0.35), 0 0 48px rgba(0,242,96,0.15);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .btn-primary-animated:hover, .btn-primary-animated:active {
          box-shadow: 0 0 36px rgba(59,126,248,0.55), 0 0 72px rgba(0,242,96,0.25);
          transform: translateY(-2px);
        }
        .btn-secondary-animated {
          position: relative;
          background: #020611;
          transition: transform 0.2s ease;
        }
        .btn-secondary-animated::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(135deg, #3b7ef8, #00c853, #3b7ef8, #00f260);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .btn-secondary-animated:hover, .btn-secondary-animated:active {
          transform: translateY(-2px);
        }
      `}</style>

      <div className="relative z-[2] w-full mx-auto" style={{ maxWidth: 860 }}>

        {/* Meta badge */}
        <motion.div {...fadeUp(0.05)}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold mb-8 tracking-[0.01em]"
          style={{
            background: "linear-gradient(#020611, #020611) padding-box, linear-gradient(135deg, rgba(59,126,248,0.6), rgba(0,242,96,0.4)) border-box",
            border: "1px solid transparent",
            color: "rgba(91,154,255,0.92)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#5b9aff">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Official Meta Tech Provider
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.12)}
          className="font-bold leading-[0.97] tracking-[-0.04em] mb-6 sm:mb-8"
          style={{ fontSize: "clamp(42px,8vw,112px)" }}
        >
          Your AI team is ready.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p {...fadeUp(0.2)}
          className="font-semibold tracking-[-0.02em] mb-4 leading-[1.3]"
          style={{ fontSize: "clamp(16px,2.5vw,26px)" }}
        >
          Sales, Admin, Customer Service —{" "}
          <span style={{ backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            all in one omnichannel CRM.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.28)}
          className="flex gap-3 justify-center flex-wrap mb-8"
        >
          <a href="#cta"
            className="btn-primary-animated inline-flex items-center justify-center gap-2 font-bold text-white rounded-[14px]"
            style={{ padding: "clamp(12px,2vw,16px) clamp(24px,4vw,40px)", fontSize: "clamp(14px,1.8vw,16px)" }}
          >
            Book a Demo
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#cta"
            className="btn-secondary-animated inline-flex items-center justify-center gap-2 font-semibold text-white rounded-[14px]"
            style={{ padding: "clamp(12px,2vw,16px) clamp(24px,4vw,40px)", fontSize: "clamp(14px,1.8vw,16px)" }}
          >
            Solve a problem you have →
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div {...fadeUp(0.34)}
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-3"
        >
          {[
            {
              icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M5 8.5l2 2 4-4"/></svg>,
              label: "Trusted by SG & APAC businesses",
              accent: "#5b9aff",
            },
            {
              icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5l2.5 1.5"/></svg>,
              label: "Setup in minutes",
              accent: "#00f260",
            },
            {
              icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="4" width="13" height="9" rx="1.5"/><line x1="1.5" y1="7" x2="14.5" y2="7"/><line x1="10" y1="10.5" x2="13" y2="10.5"/></svg>,
              label: "No credit card required",
              accent: "#5b9aff",
            },
          ].map(({ icon, label, accent }) => (
            <div key={label}
              className="flex items-center gap-2 bg-white/[0.038] border border-white/[0.065] rounded-[9px] font-medium backdrop-blur-sm whitespace-nowrap"
              style={{ padding: "8px 14px", fontSize: "clamp(11px,1.3vw,13px)", color: "var(--t2)" }}
            >
              <span className="w-[14px] h-[14px] flex-shrink-0" style={{ color: accent }}>{icon}</span>
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020611] to-transparent pointer-events-none z-[2]" />
    </section>
  );
}