"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function FlipDigit({ digit }: { digit: string }) {
  const [current, setCurrent] = useState(digit);
  const [next, setNext] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit === current) return;
    setNext(digit);
    setFlipping(true);
    const t = setTimeout(() => {
      setCurrent(digit);
      setFlipping(false);
    }, 420);
    return () => clearTimeout(t);
  }, [digit, current]);

  const fontSize = "clamp(38px,6.5vw,80px)";
  const cardW = "clamp(52px,7vw,88px)";
  const cardH = "clamp(72px,10vw,120px)";

  const Num = ({ val, half }: { val: string; half: "top" | "bot" }) => (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        // Full-height container, clipped to half
        height: "200%",
        top: half === "top" ? 0 : "-100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className="font-black text-white select-none"
        style={{
          fontSize,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        {val}
      </span>
    </div>
  );

  return (
    <div style={{ width: cardW, height: cardH, perspective: "800px", position: "relative" }}>
      {/* Card shell */}
      <div
        className="absolute inset-0 rounded-[14px]"
        style={{
          background: "linear-gradient(180deg, #0d1a35 0%, #08102a 100%)",
          border: `1px solid ${flipping ? "rgba(59,126,248,0.45)" : "rgba(59,126,248,0.15)"}`,
          boxShadow: flipping
            ? "0 0 28px rgba(59,126,248,0.35), 0 0 56px rgba(0,242,96,0.12)"
            : "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
      />

      {/* TOP half — static, shows current top */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          overflow: "hidden",
          borderRadius: "14px 14px 0 0",
          background: "linear-gradient(180deg, #111d38 0%, #0d1830 100%)",
        }}
      >
        <Num val={current} half="top" />
      </div>

      {/* BOTTOM half — static, shows current bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          overflow: "hidden",
          borderRadius: "0 0 14px 14px",
          background: "linear-gradient(180deg, #080f22 0%, #0a1428 100%)",
        }}
      >
        <Num val={current} half="bot" />
      </div>

      {/* Center crease */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "8%", right: "8%",
          height: "1px",
          background: "rgba(0,0,0,0.9)",
          zIndex: 10,
        }}
      />

      {/* FLAP — old top half folds down */}
      {flipping && (
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "50%",
            overflow: "hidden",
            borderRadius: "14px 14px 0 0",
            background: "linear-gradient(180deg, #1a2a4a 0%, #0f1e38 100%)",
            transformOrigin: "bottom center",
            zIndex: 20,
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 1, 1] }}
        >
          <Num val={current} half="top" />
        </motion.div>
      )}

      {/* REVEAL — new bottom half unfolds up */}
      {flipping && (
        <motion.div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "50%",
            overflow: "hidden",
            borderRadius: "0 0 14px 14px",
            background: "linear-gradient(180deg, #080f22 0%, #0a1428 100%)",
            transformOrigin: "top center",
            zIndex: 15,
          }}
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.25, ease: [0, 0, 0.6, 1], delay: 0.25 }}
        >
          <Num val={next} half="bot" />
        </motion.div>
      )}

      {/* Shimmer */}
      {flipping && (
        <motion.div
          style={{
            position: "absolute", inset: 0,
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(59,126,248,0.12), rgba(0,242,96,0.06))",
            zIndex: 25,
            pointerEvents: "none",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}
    </div>
  );
}

export default function FlipCounter() {
  const [count, setCount] = useState(5758);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started]);

  const formatted = count.toLocaleString();
  const chars = formatted.split("");

  return (
    <motion.div
      className="section-flip flex items-center justify-center py-[clamp(60px,8vw,100px)] px-[clamp(20px,4vw,64px)]"
      onViewportEnter={() => setStarted(true)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative text-center overflow-hidden rounded-[32px] w-full"
        style={{
          maxWidth: 680,
          background: "linear-gradient(135deg, rgba(8,15,32,0.95), rgba(6,12,26,0.98))",
          border: "1px solid rgba(59,126,248,0.15)",
          padding: "clamp(40px,6vw,72px) clamp(32px,6vw,72px)",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.5), 0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(59,126,248,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Gradient top line */}
        <div
          className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, #3b7ef8, #00f260, transparent)" }}
        />

        {/* Background glow blobs */}
        <div
          className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,126,248,0.06), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,242,96,0.04), transparent 70%)" }}
        />

        {/* Live badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10.5px] font-bold tracking-[0.12em] uppercase"
            style={{
              background: "rgba(0,242,96,0.06)",
              border: "1px solid rgba(0,242,96,0.18)",
              color: "#00f260",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00f260] flex-shrink-0"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            Live — Updated in real time
          </div>
        </div>

        {/* Flip digits */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {chars.map((ch, i) =>
            ch === "," ? (
              <span
                key={`comma-${i}`}
                className="font-black text-white/20 self-end mb-2 flex-shrink-0"
                style={{ fontSize: "clamp(28px,5vw,60px)", lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                ,
              </span>
            ) : (
              <FlipDigit key={`digit-${i}`} digit={ch} />
            )
          )}
        </div>

        {/* Label */}
        <div
          className="font-bold mb-2 tracking-[-0.025em]"
          style={{ fontSize: "clamp(16px,2vw,24px)" }}
        >
          Leads Converted to Sales
        </div>
        <div className="text-[13px] text-white/30 font-normal">
          and counting — powered by Stride AI
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-[15%] right-[15%] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(59,126,248,0.3), rgba(0,242,96,0.2), transparent)" }}
        />
      </div>
    </motion.div>
  );
}