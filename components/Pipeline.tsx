"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const pipeSteps = [
  {
    num: "01",
    title: "Capture every signal.",
    desc: "Every inbound message from WhatsApp, email, LinkedIn and your chatbot lands in one unified inbox the moment it arrives. Nothing slips through.",
    label: "Capture",
    vis: "capture",
  },
  {
    num: "02",
    title: "Know who's ready before they tell you.",
    desc: "Stride's AI reads every conversation and rates purchase intent 1–10 in real time. Not just last email date — tone, urgency, buying signals, everything.",
    label: "Score",
    vis: "score",
  },
  {
    num: "03",
    title: "AI nurtures while you focus elsewhere.",
    desc: "Stride handles follow-ups, answers objections and builds trust using your knowledge base — automatically. Every conversation moves forward, 24/7.",
    label: "Mature",
    vis: "mature",
  },
  {
    num: "04",
    title: "Your team shows up to close.",
    desc: "When a lead is ready, Stride alerts your team with full conversation context. They jump in exactly where the AI left off — warm, informed, ready to close.",
    label: "Convert",
    vis: "convert",
  },
  {
    num: "05",
    title: "Keep customers coming back.",
    desc: "Post-sale follow-ups, service tickets and loyalty messaging — Stride keeps your relationship alive long after the deal is done.",
    label: "Retain",
    vis: "retain",
  },
];

function CaptureVis() {
  return (
    <div className="p-7">
      <div className="text-[10px] text-[var(--t3)] font-bold tracking-[0.1em] uppercase mb-5">Inbound Signals</div>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {[
          { color: "#25d366", bg: "rgba(37,211,102,.08)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg> },
          { color: "var(--blue-b)", bg: "var(--blue-dim)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
          { color: "#fff", bg: "rgba(59,126,248,0.14)", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10L7 2L12 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 7H9.5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>, large: true },
          { color: "#5d9cd4", bg: "rgba(10,102,194,.08)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
        ].map((nd, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <div className="h-px w-[clamp(14px,2vw,34px)]" style={{ background: "linear-gradient(90deg,var(--t3),var(--blue),var(--t3))", backgroundSize: "200% 100%", animation: "flowLine 2.5s linear infinite" }} />}
            <div
              className={`rounded-full flex items-center justify-center border-[1.5px] relative ${nd.large ? "w-[58px] h-[58px]" : "w-[44px] h-[44px]"}`}
              style={{ background: nd.bg, borderColor: nd.color, color: nd.color }}
            >
              {nd.icon}
              <div className="absolute inset-[-5px] rounded-full border border-current opacity-20" />
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[12.5px] text-[var(--t2)] mt-5">All channels — one intelligent inbox</p>
    </div>
  );
}

function ScoreVis() {
  const bars = [
    { name: "Sarah Chen", pct: 92, color: "#4ade80", val: "9.2" },
    { name: "James Lim", pct: 61, color: "#fbbf24", val: "6.1" },
    { name: "Priya Kumar", pct: 78, color: "var(--blue-b)", val: "7.8" },
    { name: "David Tan", pct: 30, color: "#f87171", val: "3.0" },
  ];
  return (
    <div className="p-7">
      <div className="text-[10px] text-[var(--t3)] font-bold tracking-[0.1em] uppercase mb-5">AI Lead Scoring</div>
      {bars.map((b) => (
        <div key={b.name} className="flex items-center gap-3 mb-2.5">
          <span className="text-[12px] text-[var(--t2)] w-20 flex-shrink-0">{b.name}</span>
          <div className="flex-1 h-1 bg-white/[0.05] rounded overflow-hidden">
            <motion.div className="h-full rounded" style={{ background: b.color }} initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} viewport={{ once: true }} />
          </div>
          <span className="text-[12px] font-bold w-8 text-right flex-shrink-0" style={{ color: b.color }}>{b.val}</span>
        </div>
      ))}
      <div className="mt-3.5 bg-[rgba(74,222,128,.06)] border border-[rgba(74,222,128,.16)] rounded-[10px] px-3 py-2.5 text-[12.5px] text-[#4ade80] flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
        Sarah Chen scored 9.2 — prioritised at the top
      </div>
    </div>
  );
}

function MatureVis() {
  return (
    <div className="p-7">
      <div className="text-[10px] text-[var(--t3)] font-bold tracking-[0.1em] uppercase mb-4">AI Handling Conversation</div>
      <div className="flex flex-col gap-2">
        {[
          { side: "l", text: "Is this worth it for my business?" },
          { side: "r", text: "Based on your team of 8 and current lead volume, you'd recover roughly 12 leads/month that go cold. That's S$3,600+ in potential revenue each month." },
          { side: "l", text: "That's actually really compelling." },
        ].map((b, i) => (
          <div key={i} className={`px-3 py-2 rounded-[11px] text-[12px] max-w-[88%] leading-[1.58] ${b.side === "l" ? "self-start bg-white/[0.05] border border-white/[0.065] text-[var(--t2)]" : "self-end bg-[rgba(59,126,248,0.1)] border border-[rgba(59,126,248,0.22)] text-[rgba(91,154,255,.92)]"}`}>{b.text}</div>
        ))}
      </div>
    </div>
  );
}

function ConvertVis() {
  return (
    <div className="p-7">
      <div className="text-[10px] text-[var(--t3)] font-bold tracking-[0.1em] uppercase mb-4">Live Agent Handoff</div>
      <div className="bg-[var(--blue-dim)] border border-[rgba(59,126,248,.2)] rounded-[12px] p-4 mb-3">
        <div className="text-[11px] text-[var(--blue-b)] mb-2 font-bold">Stride AI handed off to you</div>
        <div className="text-[12.5px] text-[var(--t2)] leading-[1.65]">Sarah Chen — 14 interactions, scored 9.8/10. Asked about pricing twice. Ready to close.</div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-[rgba(74,222,128,.08)] border border-[rgba(74,222,128,.2)] rounded-[9px] py-2.5 text-center text-[12.5px] text-[#4ade80] font-bold">Accept Handoff</div>
        <div className="flex-1 bg-white/[0.03] border border-white/[0.065] rounded-[9px] py-2.5 text-center text-[12.5px] text-[var(--t2)]">Reassign</div>
      </div>
    </div>
  );
}

function RetainVis() {
  const items = [
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>, text: "Deal closed — S$4,200 · TechFlow SG" },
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, text: "30-day check-in scheduled — automated" },
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue-b)" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.6"/></svg>, text: "Renewal reminder set — 11 months" },
    { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue-b)" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, text: "NPS survey sent — 9/10 received" },
  ];
  return (
    <div className="p-7">
      <div className="text-[10px] text-[var(--t3)] font-bold tracking-[0.1em] uppercase mb-4">After Sales</div>
      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.065] rounded-[10px] px-3 py-2.5 text-[12.5px] flex items-center gap-2.5">
            {item.icon}
            <span className="text-[var(--t2)]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals = [<CaptureVis key={0} />, <ScoreVis key={1} />, <MatureVis key={2} />, <ConvertVis key={3} />, <RetainVis key={4} />];

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step);
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.45 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="pipeline" className="section-pipeline relative bg-[#060E24] border-t border-white/[0.065]">
      {/* Sticky nav */}
      <div className="sticky top-[58px] z-[100] bg-[rgba(6,14,36,0.88)] backdrop-blur-[24px] border-b border-white/[0.065] px-[clamp(20px,4vw,64px)] py-3.5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-1">
              <span className="w-5 h-px bg-[var(--blue)]" />
              Pipeline Journey
            </div>
            <div className="text-[16px] font-black tracking-[-0.025em]">Stride: your business operating system</div>
          </div>
          <div className="hidden md:flex">
            {pipeSteps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold tracking-[-0.01em] transition-colors duration-300 ${i < pipeSteps.length - 1 ? "border-r border-white/[0.065]" : ""} ${activeStep === i ? "text-[var(--blue-b)]" : "text-[var(--t3)]"}`}
              >
                {i + 1 < 10 ? `0${i + 1}` : i + 1} &nbsp;{s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-[1100px] mx-auto">
        {pipeSteps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { stepRefs.current[i] = el; }}
            data-step={i}
            className={`grid gap-[80px] items-center px-[clamp(20px,4vw,64px)] py-[clamp(72px,9vw,120px)] ${i < pipeSteps.length - 1 ? "border-b border-white/[0.065]" : ""}`}
            style={{
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              minHeight: "65vh",
            }}
          >
            {/* Text — alternates sides */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 === 1 ? "order-2" : ""}
            >
              <div className="text-[80px] font-black text-[var(--t3)] leading-[1] mb-4 tracking-[-0.05em] opacity-60">
                {step.num}
              </div>
              <h3 className="text-[clamp(26px,3vw,40px)] font-black leading-[1.15] tracking-[-0.035em] mb-4">
                {step.title}
              </h3>
              <p className="text-[15px] text-[var(--t2)] leading-[1.8] max-w-[360px]">
                {step.desc}
              </p>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 32 : -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className={`relative bg-white/[0.022] backdrop-blur-xl border border-white/[0.065] rounded-[22px] overflow-hidden min-h-[220px] ${i % 2 === 1 ? "order-1" : ""}`}
            >
              <div className="absolute top-[-30%] right-[-20%] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,126,248,0.07), transparent 70%)" }} />
              {visuals[i]}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
