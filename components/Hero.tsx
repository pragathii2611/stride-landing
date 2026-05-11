"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLS = ["#3b7ef8", "#5b9aff", "#93c5fd", "#1d4ed8", "#60a5fa"];

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
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
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
        if (d < 130) {
          const f = (130 - d) / 130;
          n.x += dx * f * 0.03;
          n.y += dy * f * 0.03;
        }
      });

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,126,248,${((1 - d / 160) * 0.18).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        const pm = 1 + Math.sin(n.p) * 0.2;
        const r = n.r * pm;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        g.addColorStop(0, n.c + "99");
        g.addColorStop(1, n.c + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.16;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.68;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Center glow
      const cG = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 300);
      cG.addColorStop(0, "rgba(59,126,248,0.05)");
      cG.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 300, 0, Math.PI * 2);
      ctx.fillStyle = cG;
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && running) {
        cancelAnimationFrame(rafRef.current);
        draw();
      }
    };

    init();
    draw();
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
    <section
      className="section-hero relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: "100svh", padding: "120px clamp(24px,5vw,80px) 80px" }}
    >
      {/* Canvas — contained to hero only */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

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
          box-shadow: 0 0 24px rgba(59,126,248,0.3), 0 0 48px rgba(0,242,96,0.1);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .btn-primary-animated:hover {
          box-shadow: 0 0 36px rgba(59,126,248,0.5), 0 0 72px rgba(0,242,96,0.2);
          transform: translateY(-2px);
        }
        .btn-secondary-animated {
          position: relative;
          background: rgba(255,255,255,0.03);
          transition: transform 0.2s ease, background 0.2s ease;
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
        .btn-secondary-animated:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.05);
        }
      `}</style>

      <div
        className="relative z-[2] w-full mx-auto flex flex-col items-center"
        style={{ maxWidth: 780 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full mb-10"
          style={{
            padding: "7px 16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "11.5px",
            fontWeight: 500,
            color: "rgba(180,188,210,0.7)",
            letterSpacing: "0.02em",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#00f260" }} />
          Official Meta Tech Provider
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          style={{
            fontSize: "clamp(48px,8.5vw,108px)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            marginBottom: "clamp(28px,4vw,44px)",
            color: "white",
          }}
        >
          Your AI team
          <br />
          is ready.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontSize: "clamp(15px,1.8vw,19px)",
            color: "rgba(180,188,210,0.65)",
            fontWeight: 400,
            lineHeight: 1.65,
            maxWidth: 480,
            marginBottom: "clamp(36px,5vw,52px)",
            letterSpacing: "-0.01em",
          }}
        >
          Sales, Admin, Customer Service —
          <br />
          all in one omnichannel CRM.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="flex flex-wrap justify-center"
          style={{ gap: "12px" }}
        >
          
          <a
            href="#cta"
            className="btn-primary-animated inline-flex items-center justify-center gap-2 text-white font-semibold rounded-[14px]"
            style={{
              padding: "clamp(12px,1.8vw,15px) clamp(24px,3.5vw,36px)",
              fontSize: "clamp(14px,1.6vw,16px)",
              letterSpacing: "-0.01em",
            }}
          >
            Book a Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          
          <a
            href="#cta"
            className="btn-secondary-animated inline-flex items-center justify-center gap-2 font-medium rounded-[14px]"
            style={{
              padding: "clamp(12px,1.8vw,15px) clamp(24px,3.5vw,36px)",
              fontSize: "clamp(14px,1.6vw,16px)",
              letterSpacing: "-0.01em",
              color: "rgba(180,188,210,0.85)",
            }}
          >
            See how it works →
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]"
        style={{ height: "180px", background: "linear-gradient(to top, #020611 0%, transparent 100%)" }}
      />
    </section>
  );
}