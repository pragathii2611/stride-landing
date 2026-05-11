"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 40, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 40, mass: 0.3 });

  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.8 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Ambient glow — slow, large, muted */}
      <motion.div
        className="fixed pointer-events-none z-[9990] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(59,126,248,0.07) 0%, transparent 35%)",
        }}
      />

      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
          background: "rgba(255,255,255,0.9)",
          boxShadow:
            "0 0 10px 2px rgba(91,154,255,0.35), 0 0 24px 4px rgba(59,126,248,0.15)",
        }}
      />
    </>
  );
}