"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    label: "Consultation",
    desc: "We figure out where your bottlenecks are. No generic pitch — we dig into your actual workflow, channels, and pain points.",
    color: "#3b7ef8",
    animation: "chat",
  },
  {
    num: "02",
    label: "Custom Demo",
    desc: "We show you how our modular system can best fix your specific problems. You'll see exactly how Stride works for your team.",
    color: "#5b9aff",
    animation: "modules",
  },
  {
    num: "03",
    label: "Onboarding",
    desc: "We set everything up. Our team handles channels, knowledge base, agents — everything. You just show up.",
    color: "#00b849",
    animation: "progress",
  },
  {
    num: "04",
    label: "Improve",
    desc: "Faster response times, more leads captured, fewer deals dropped. Results usually show within the first 30 days.",
    color: "#00f260",
    animation: "chart",
  },
  {
    num: "05",
    label: "Community",
    desc: "Be part of our founding community. Your feedback, ideas and voice — heard directly by our team.",
    color: "#5b9aff",
    animation: "nodes",
  },
];

// ── ANIMATIONS ───────────────────────────────────────────

function ChatAnim({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2 w-full px-4 py-2">
      {[
        { side: "l", w: "60%", delay: 0 },
        { side: "r", w: "45%", delay: 0.5 },
        { side: "l", w: "70%", delay: 1.0 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className={`h-[7px] rounded-full ${b.side === "r" ? "self-end" : "self-start"}`}
          style={{
            width: b.w,
            background: b.side === "r" ? color : "rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0, x: b.side === "r" ? 10 : -10 }}
          animate={{ opacity: [0, 1, 1, 0], x: 0 }}
          transition={{ duration: 2.5, delay: b.delay, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
      <div
        className="self-start flex gap-1 px-2 py-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ background: color }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.8, delay: i * 0.18, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

function ModulesAnim({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-[9px] flex items-center justify-center"
          style={{
            width: i === 1 ? 42 : 28,
            height: i === 1 ? 42 : 28,
            background: i === 1 ? `${color}22` : "rgba(255,255,255,0.04)",
            boxShadow:
              i === 1
                ? `0 0 0 1px ${color}55, 0 0 16px ${color}22`
                : "0 0 0 1px rgba(255,255,255,0.07)",
          }}
          animate={{
            scale: i === 1 ? [1, 1.08, 1] : [1, 0.94, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {i === 1 && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ProgressAnim({ color }: { color: string }) {
  return (
    <div className="w-full px-4 flex flex-col gap-2">
      {[
        { label: "Channels", pct: 100 },
        { label: "Knowledge Base", pct: 75 },
        { label: "AI Agents", pct: 50 },
      ].map((item, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
              {item.label}
            </span>
            <span style={{ fontSize: 9, color, fontWeight: 700 }}>{item.pct}%</span>
          </div>
          <div className="h-[4px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{
                duration: 1.2,
                delay: i * 0.3 + 0.3,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartAnim({ color }: { color: string }) {
  const points = "20,55 45,42 70,30 95,18 120,10 145,5";
  const id = color.replace("#", "");
  return (
    <svg viewBox="0 0 165 65" className="w-full px-2" style={{ height: 60 }}>
      {[15, 30, 45, 60].map((y) => (
        <line key={y} x1="10" y1={y} x2="155" y2={y}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      <defs>
        <linearGradient id={`cg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`cc-${id}`}>
          <motion.rect x="0" y="0" height="65"
            initial={{ width: 0 }}
            animate={{ width: 165 }}
            transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#cc-${id})`}>
        <polyline fill="none" stroke={color} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" points={points} />
        <polygon fill={`url(#cg-${id})`} points={`20,65 ${points} 145,65`} />
      </g>
      <motion.circle cx="145" cy="5" r="3" fill={color}
        animate={{ opacity: [1, 0.3, 1], r: [3, 4.5, 3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function NodesAnim({ color }: { color: string }) {
  const nodes = [
    { cx: 82, cy: 35, r: 5, main: true },
    { cx: 28, cy: 18, r: 3 },
    { cx: 136, cy: 18, r: 3 },
    { cx: 18, cy: 55, r: 3 },
    { cx: 146, cy: 55, r: 3 },
    { cx: 82, cy: 62, r: 3 },
  ];
  return (
    <svg viewBox="0 0 165 75" className="w-full" style={{ height: 70 }}>
      {[[0,1],[0,2],[0,3],[0,4],[0,5]].map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={color} strokeWidth="1" strokeDasharray="4 3"
          animate={{ strokeOpacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i}
          cx={n.cx} cy={n.cy} r={n.r}
          fill={n.main ? color : "transparent"}
          stroke={color} strokeWidth={n.main ? 0 : 1.5}
          animate={
            n.main
              ? { r: [5, 6.5, 5], opacity: [1, 0.7, 1] }
              : { opacity: [0.3, 1, 0.3], r: [n.r, n.r + 1.2, n.r] }
          }
          transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

const animMap: Record<string, (c: string) => JSX.Element> = {
  chat: (c) => <ChatAnim color={c} />,
  modules: (c) => <ModulesAnim color={c} />,
  progress: (c) => <ProgressAnim color={c} />,
  chart: (c) => <ChartAnim color={c} />,
  nodes: (c) => <NodesAnim color={c} />,
};

// ── SHARED ALTERNATING LAYOUT ─────────────────────────────
function AlternatingSteps({
  inView,
  animBoxH,
  animBoxMaxW,
  animBoxRadius,
  centerW,
  centerH,
  centerFontSize,
  gap,
  titleSize,
  descSize,
  numSize,
  stepGap,
  lineTopBottom,
}: {
  inView: boolean;
  animBoxH: number;
  animBoxMaxW: number;
  animBoxRadius: number;
  centerW: string;
  centerH: string;
  centerFontSize: string;
  gap: string;
  titleSize: string;
  descSize: string;
  numSize: string;
  stepGap: string;
  lineTopBottom: number;
}) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute w-px"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: lineTopBottom,
          bottom: lineTopBottom,
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <motion.div
          className="w-full rounded-full"
          style={{ background: "linear-gradient(180deg, #3b7ef8, #00f260)" }}
          initial={{ height: "0%" }}
          animate={inView ? { height: "100%" } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <div className="flex flex-col">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i}>
              <motion.div
                className="grid items-center"
                style={{ gridTemplateColumns: `1fr ${centerW} 1fr`, gap }}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.13 }}
              >
                {/* LEFT */}
                <div className="flex justify-end">
                  {isEven ? (
                    <div className="text-right" style={{ maxWidth: animBoxMaxW }}>
                      <div
                        className="font-bold tracking-[0.1em] uppercase mb-1.5"
                        style={{ fontSize: numSize, color: step.color }}
                      >
                        {step.num}
                      </div>
                      <h3
                        className="font-bold tracking-[-0.025em] leading-[1.2] mb-2"
                        style={{ fontSize: titleSize, color: "white" }}
                      >
                        {step.label}
                      </h3>
                      <p className="leading-[1.75]" style={{ fontSize: descSize, color: "rgba(180,188,210,0.5)" }}>
                        {step.desc}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="w-full flex items-center justify-center overflow-hidden"
                      style={{
                        maxWidth: animBoxMaxW,
                        height: animBoxH,
                        borderRadius: animBoxRadius,
                        background: `radial-gradient(ellipse at 50% 60%, ${step.color}0f, rgba(8,14,32,0.7) 70%)`,
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px ${step.color}15`,
                      }}
                    >
                      {animMap[step.animation](step.color)}
                    </div>
                  )}
                </div>

                {/* CENTER */}
                <div className="flex items-center justify-center">
                  <motion.div
                    className="rounded-full flex items-center justify-center font-black relative z-10 flex-shrink-0"
                    style={{
                      width: centerW,
                      height: centerH,
                      fontSize: centerFontSize,
                      background: "#020810",
                      boxShadow: `0 0 0 1.5px ${step.color}66, 0 0 16px ${step.color}33`,
                      color: step.color,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {i + 1}
                  </motion.div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-start">
                  {!isEven ? (
                    <div className="text-left" style={{ maxWidth: animBoxMaxW }}>
                      <div
                        className="font-bold tracking-[0.1em] uppercase mb-1.5"
                        style={{ fontSize: numSize, color: step.color }}
                      >
                        {step.num}
                      </div>
                      <h3
                        className="font-bold tracking-[-0.025em] leading-[1.2] mb-2"
                        style={{ fontSize: titleSize, color: "white" }}
                      >
                        {step.label}
                      </h3>
                      <p className="leading-[1.75]" style={{ fontSize: descSize, color: "rgba(180,188,210,0.5)" }}>
                        {step.desc}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="w-full flex items-center justify-center overflow-hidden"
                      style={{
                        maxWidth: animBoxMaxW,
                        height: animBoxH,
                        borderRadius: animBoxRadius,
                        background: `radial-gradient(ellipse at 50% 60%, ${step.color}0f, rgba(8,14,32,0.7) 70%)`,
                        boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 0 1px ${step.color}15`,
                      }}
                    >
                      {animMap[step.animation](step.color)}
                    </div>
                  )}
                </div>
              </motion.div>

              {i < steps.length - 1 && <div style={{ height: stepGap }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────
export default function JourneySteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="section-journey w-full"
      style={{ background: "#020810", padding: "clamp(60px,8vw,120px) clamp(16px,5vw,64px)" }}
    >
      <div className="max-w-[1000px] mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="inline-block text-[10.5px] font-bold tracking-[0.14em] uppercase mb-4"
            style={{
              backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Journey
          </div>
          <h2
            className="font-bold tracking-[-0.04em] leading-[1.08]"
            style={{ fontSize: "clamp(28px,4.5vw,56px)", color: "white" }}
          >
            Your journey with us
          </h2>
        </motion.div>

        {/* ── SMALL MOBILE: < 480px ── */}
        <div className="block sm:hidden">
          <AlternatingSteps
            inView={inView}
            animBoxH={80}
            animBoxMaxW={140}
            animBoxRadius={12}
            centerW="32px"
            centerH="32px"
            centerFontSize="11px"
            gap="8px"
            titleSize="clamp(13px,4vw,16px)"
            descSize="clamp(10px,3vw,12px)"
            numSize="8px"
            stepGap="20px"
            lineTopBottom={16}
          />
        </div>

        {/* ── TABLET: 480px–1023px ── */}
        <div className="hidden sm:block lg:hidden">
          <AlternatingSteps
            inView={inView}
            animBoxH={100}
            animBoxMaxW={220}
            animBoxRadius={14}
            centerW="40px"
            centerH="40px"
            centerFontSize="13px"
            gap="clamp(12px,3vw,28px)"
            titleSize="clamp(16px,3vw,22px)"
            descSize="clamp(12px,2.5vw,14px)"
            numSize="9px"
            stepGap="clamp(24px,4vw,36px)"
            lineTopBottom={20}
          />
        </div>

        {/* ── DESKTOP: 1024px+ ── */}
        <div className="hidden lg:block">
          <AlternatingSteps
            inView={inView}
            animBoxH={120}
            animBoxMaxW={300}
            animBoxRadius={20}
            centerW="56px"
            centerH="56px"
            centerFontSize="15px"
            gap="clamp(24px,4vw,64px)"
            titleSize="clamp(20px,2.2vw,30px)"
            descSize="clamp(13px,1.3vw,15px)"
            numSize="10px"
            stepGap="clamp(28px,4vw,52px)"
            lineTopBottom={28}
          />
        </div>

      </div>
    </section>
  );
}