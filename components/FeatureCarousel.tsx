"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    num: "01",
    label: "Lead Generation",
    title: "Leads don't wait. Neither does Stride.",
    body: "WhatsApp, email, LinkedIn — captured and centralised the moment it arrives. No manual checking. No dropped leads.",
  },
  {
    num: "02",
    label: "All in One Place",
    title: "The full context of every lead. Always in reach.",
    body: "Conversation history, lead scores, follow-up status — unified across your team. Every interaction, logged and visible — the moment your team needs it.",
  },
  {
    num: "03",
    label: "Conversation Maturation",
    title: "Leads nurtured, qualified and handed off. Without you lifting a finger.",
    body: "Stride engages every conversation autonomously — handling objections, sending follow-ups or reminders, building trust — until the moment is right for your team to close.",
  },
];

// ── MOCK 1 ──────────────────────────────────────────────
function Mock1() {
  const contacts = [
    { initials: "AM", color: "from-pink-500 to-rose-600", name: "Aisha Mahmood", preview: "Is P6 Math still available?", time: "1m", unread: 3, score: 9.6, scoreColor: "#4ade80" },
    { initials: "TL", color: "from-blue-500 to-blue-700", name: "Tracy Lim", preview: "Sec 3 Chemistry slots?", time: "8m", unread: 1, score: 7.8, scoreColor: "#4ade80" },
    { initials: "RN", color: "from-violet-500 to-violet-700", name: "Rajan Nair", preview: "Trial class for PSLE English", time: "32m", unread: 0, score: 5.2, scoreColor: "#fbbf24" },
    { initials: "CW", color: "from-emerald-500 to-emerald-700", name: "Claire Wong", preview: "Can we defer October intake?", time: "1h", unread: 0, score: 3.1, scoreColor: "#f87171" },
  ];

  const messages = [
    { side: "l", text: "Hi! Is there still space for P6 Math on Saturday mornings?", time: "09:12" },
    { side: "r", text: "Yes! 2 slots left for Sat 10am. Shall I reserve one for your child?", time: "09:12" },
    { side: "l", text: "Yes please! How many lessons before PSLE?", time: "09:13" },
    { side: "r", text: "12 lessons up to exam week, including 2 mock paper sessions. Sending schedule now.", time: "09:13" },
  ];

  return (
    <div className="rounded-[18px] overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)]" style={{ background: "#080f20" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]" style={{ background: "#0a1428" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — Tuition Enquiries</span>
      </div>

      {/* Mobile: stacked, Desktop: side by side */}
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar — hidden on very small screens */}
        <div className="hidden sm:flex w-[180px] flex-shrink-0 border-r border-white/[0.05] flex-col" style={{ background: "#060d1e" }}>
          <div className="px-3 py-2.5 border-b border-white/[0.05]">
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-[8px] px-2.5 py-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span className="text-[10px] text-white/20">Search...</span>
            </div>
          </div>
          {contacts.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 cursor-default ${i === 0 ? "bg-white/[0.06]" : ""}`}>
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-[9px] font-bold flex-shrink-0 relative`}>
                {c.initials}
                {c.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3b7ef8] text-[7px] font-bold flex items-center justify-center">{c.unread}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-semibold text-white/80 truncate">{c.name}</span>
                  <span className="text-[8px] text-white/25 flex-shrink-0">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-1 mt-0.5">
                  <span className="text-[9px] text-white/30 truncate">{c.preview}</span>
                  <span className="text-[8px] font-bold flex-shrink-0" style={{ color: c.scoreColor }}>{c.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.05]" style={{ background: "#080f20" }}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[9px] font-bold flex-shrink-0">AM</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white">Aisha Mahmood</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0" />
                <span className="text-[10px] text-white/30">Active · WhatsApp</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-[9px] font-bold text-[#4ade80]">9.6</span>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.side === "r" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-[11px] text-[11px] leading-[1.6] ${
                  m.side === "r"
                    ? "bg-[rgba(59,126,248,0.15)] border border-[rgba(59,126,248,0.2)] text-[rgba(180,200,255,0.9)]"
                    : "bg-white/[0.05] border border-white/[0.06] text-white/60"
                }`}>
                  {m.side === "r" && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[8px] font-bold" style={{ color: "#00f260" }}>AI</span>
                      <span className="w-1 h-1 rounded-full bg-[#00f260]" />
                    </div>
                  )}
                  {m.text}
                  <div className="text-[9px] text-white/20 mt-0.5 text-right">{m.time}</div>
                </div>
              </div>
            ))}
            {/* Typing */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[7px] font-bold">AI</div>
              <div className="rounded-[10px] px-3 py-2 flex gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {[0, 1, 2].map((j) => (
                  <motion.span key={j} className="w-1.5 h-1.5 rounded-full bg-white/30"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MOCK 2 ──────────────────────────────────────────────
function Mock2() {
  const stages = ["Enquiry", "Trial", "Enrolled", "Active", "Renewed"];
  const currentStage = 2;
  const activity = [
    { text: "WhatsApp — asked about P6 Math slots", time: "5m ago", color: "#25d366" },
    { text: "Opened fee schedule PDF", time: "22m ago", color: "#5b9aff" },
    { text: "Visited /psle-intensive page", time: "1h ago", color: "#a78bfa" },
    { text: "Trial class attended — P5 Science", time: "3d ago", color: "#fbbf24" },
  ];

  return (
    <div className="rounded-[18px] overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)]" style={{ background: "#080f20" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]" style={{ background: "#0a1428" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — Student Profile</span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center text-[16px] font-black">AM</div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#4ade80] border-2 border-[#080f20]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold text-white">Aisha Mahmood</div>
            <div className="text-[11px] text-white/40 truncate">P6 · Bukit Timah · Parent: Mrs Mahmood</div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: "rgba(59,126,248,0.12)", border: "1px solid rgba(59,126,248,0.2)", color: "#5b9aff" }}>PSLE 2025</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)", color: "#4ade80" }}>High Intent</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[22px] font-black" style={{ backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>9.6</div>
            <div className="text-[8px] text-white/30 uppercase tracking-wider">AI Score</div>
          </div>
        </div>

        {/* Journey */}
        <div>
          <div className="text-[9px] text-white/25 uppercase tracking-wider mb-2 font-semibold">Student Journey</div>
          <div className="flex items-center">
            {stages.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full h-1.5 rounded-full" style={i <= currentStage ? { background: "linear-gradient(90deg, #3b7ef8, #00f260)" } : { background: "rgba(255,255,255,0.06)" }} />
                  <span className={`text-[8px] mt-1 font-medium ${i === currentStage ? "text-white" : i < currentStage ? "text-white/40" : "text-white/20"}`}>{s}</span>
                </div>
                {i < stages.length - 1 && <div className="w-0.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "S$480", l: "Monthly Value", c: "#4ade80" },
            { v: "3", l: "Subjects", c: "#5b9aff" },
            { v: "Oct 25", l: "PSLE Date", c: "#fbbf24" },
          ].map((s) => (
            <div key={s.l} className="rounded-[10px] px-2 py-2.5 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-[14px] font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div>
          <div className="text-[9px] text-white/25 uppercase tracking-wider mb-1.5 font-semibold">Recent Activity</div>
          <div className="flex flex-col gap-1.5">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-[9px]" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                <span className="text-[10px] text-white/50 flex-1 truncate">{a.text}</span>
                <span className="text-[9px] text-white/20 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MOCK 3 ──────────────────────────────────────────────
function Mock3() {
  const messages = [
    { side: "l", text: "My daughter tried your P5 Science trial last week. She loved it! What's next?", time: "14:02", avatar: "TL" },
    { side: "r", text: "So glad she enjoyed it! I'd recommend our Sat 11am P5 Science group — small class of 6, same tutor she met.", time: "14:03" },
    { side: "l", text: "That works! How do we sign up?", time: "14:04", avatar: "TL" },
    { side: "r", text: "Spot reserved! Registration link + GIRO form sent to your email. First lesson this Saturday.", time: "14:04" },
  ];

  return (
    <div className="rounded-[18px] overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)]" style={{ background: "#080f20" }}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]" style={{ background: "#0a1428" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — AI Enrolment Agent</span>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Stats sidebar — hidden on mobile */}
        <div className="hidden sm:flex w-[130px] flex-shrink-0 border-r border-white/[0.05] p-3 flex-col gap-3" style={{ background: "#060d1e" }}>
          <div className="rounded-[10px] p-2.5" style={{ background: "rgba(0,242,96,0.06)", border: "1px solid rgba(0,242,96,0.12)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#00f260]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[8px] font-bold text-[#00f260] uppercase tracking-wider">AI Active</span>
            </div>
            <div className="text-[9px] text-white/30">Enrolment Agent</div>
          </div>
          {[
            { label: "Response", value: "< 6s" },
            { label: "Enquiries", value: "31" },
            { label: "Trials", value: "9" },
            { label: "Enrolled", value: "4" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <div className="text-[8px] text-white/25 uppercase tracking-wider">{s.label}</div>
              <div className="text-[13px] font-bold text-white/70">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {/* Mobile stats strip */}
          <div className="flex sm:hidden items-center gap-3 px-4 py-2 border-b border-white/[0.05]" style={{ background: "#060d1e" }}>
            <div className="flex items-center gap-1.5">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#00f260]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[9px] font-bold text-[#00f260]">AI Active</span>
            </div>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-[9px] text-white/30">31 enquiries today · 4 enrolled</span>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.05]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[9px] font-bold flex-shrink-0">TL</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white/80">Tracy Lim</div>
              <div className="text-[9px] text-white/25">Parent · P5 Science · WhatsApp</div>
            </div>
            <div className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(59,126,248,0.12)", color: "#5b9aff", border: "1px solid rgba(59,126,248,0.2)" }}>Score 7.8</div>
          </div>

          {/* Messages */}
          <div className="px-3 py-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.side === "r" ? "justify-end" : "justify-start"}`}>
                {m.side === "l" && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[7px] font-bold flex-shrink-0">{m.avatar}</div>
                )}
                <div className={`max-w-[82%] px-3 py-2 rounded-[11px] text-[11px] leading-[1.6] ${
                  m.side === "r"
                    ? "bg-[rgba(59,126,248,0.12)] border border-[rgba(59,126,248,0.18)] text-[rgba(180,200,255,0.85)]"
                    : "bg-white/[0.04] border border-white/[0.06] text-white/55"
                }`}>
                  {m.side === "r" && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[8px] font-bold" style={{ color: "#00f260" }}>STRIDE AI</span>
                      <motion.span className="w-1 h-1 rounded-full bg-[#00f260]"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* ── ENROLMENT CONFIRMED — always visible ── */}
          <div
            className="mx-3 mb-3 rounded-[12px] p-3 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(0,242,96,0.08), rgba(59,126,248,0.06))",
              border: "1px solid rgba(0,242,96,0.25)",
            }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[14px] font-black flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00c853, #3b7ef8)" }}
            >
              ✓
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-white">Enrolment confirmed</div>
              <div className="text-[10px] text-white/50 mt-0.5">P5 Science · Sat 11am · GIRO sent</div>
            </div>
            <div
              className="text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
              style={{ background: "rgba(0,242,96,0.12)", color: "#00f260", border: "1px solid rgba(0,242,96,0.2)" }}
            >
              This Sat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PANELS — after all Mocks ─────────────────────────────
const panels = [<Mock1 key={0} />, <Mock2 key={1} />, <Mock3 key={2} />];

// ── MAIN ─────────────────────────────────────────────────
export default function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showPauseHint, setShowPauseHint] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  const go = useCallback((i: number) => {
    setActive(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go((activeRef.current + 1) % 3), 7000);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(1), 7000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [go]);

  const pause = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPaused(true);
    setShowPauseHint(true);
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    setShowPauseHint(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go((activeRef.current + 1) % 3), 3000);
  }, [go]);

  const onPointerDown = useCallback(() => {
    isLongPress.current = false;
    longPressRef.current = setTimeout(() => {
      isLongPress.current = true;
      pause();
    }, 400);
  }, [pause]);

  const onPointerUp = useCallback(() => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
    if (isLongPress.current) {
      resume();
      isLongPress.current = false;
    }
  }, [resume]);

  useEffect(() => {
    const up = () => {
      if (isLongPress.current) { resume(); isLongPress.current = false; }
      if (longPressRef.current) clearTimeout(longPressRef.current);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => { window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
  }, [resume]);

  const handleTabClick = (i: number) => {
    if (!isLongPress.current) go(i);
  };

  return (
    <section
      id="features"
      className="section-carousel border-t border-b border-white/[0.065] relative select-none"
      style={{ background: "#060E24" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Pause hint */}
      <AnimatePresence>
        {showPauseHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold pointer-events-none whitespace-nowrap"
            style={{ background: "rgba(6,14,36,0.92)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.6)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
            Hold to pause · Release to resume
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1100px] mx-auto px-[clamp(16px,4vw,64px)] py-[clamp(60px,8vw,130px)]">

        {/* Mobile: stacked layout / Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:gap-[80px] lg:items-center" style={{ gridTemplateColumns: "340px 1fr" }}>

          {/* LEFT */}
          <div className="relative mb-10 lg:mb-0">
            <div
              className="text-[10.5px] font-bold tracking-[0.12em] uppercase mb-8"
              style={{ backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              How Stride Works
            </div>

            {/* Track line — desktop only */}
            <div className="hidden lg:block absolute left-0 w-px bg-white/[0.06]" style={{ top: "44px", height: "calc(100% - 44px)" }}>
              <motion.div
                className="w-full rounded-full"
                style={{ background: "linear-gradient(180deg, #3b7ef8, #00f260)", height: 88 }}
                animate={{ y: active * 120 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Mobile: horizontal tab pills */}
            <div className="flex lg:hidden gap-2 mb-8 overflow-x-auto pb-1">
              {tabs.map((tab, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleTabClick(i)}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300"
                    style={{
                      background: isActive ? "linear-gradient(135deg, rgba(59,126,248,0.2), rgba(0,242,96,0.1))" : "rgba(255,255,255,0.04)",
                      border: isActive ? "1px solid rgba(59,126,248,0.35)" : "1px solid rgba(255,255,255,0.08)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {tab.num} {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col gap-8 pl-5">
              {tabs.map((tab, i) => {
                const isActive = active === i;
                return (
                  <button key={i} onClick={() => handleTabClick(i)} className="text-left transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase transition-colors duration-300" style={{ color: isActive ? "#00f260" : "rgba(255,255,255,0.25)" }}>
                        {tab.num}
                      </span>
                    </div>
                    <div className="text-[22px] font-bold leading-[1.25] tracking-[-0.02em] transition-all duration-300" style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)" }}>
                      {tab.label}
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.35 }}
                        className="text-[15px] leading-[1.78] mt-3 font-normal"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {tab.body}
                      </motion.div>
                    )}
                    {isActive && (
                      <div className="mt-4 h-px bg-white/[0.06] overflow-hidden rounded-full">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #3b7ef8, #00f260)" }}
                          initial={{ width: "0%" }}
                          animate={{ width: paused ? undefined : "100%" }}
                          transition={{ duration: 7, ease: "linear" }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile: active tab body text */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[14px] leading-[1.75] mb-6"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {tabs[active].body}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Mock panel */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Desktop: floating 3D / Mobile: flat */}
                <motion.div
                  animate={paused ? { y: 0 } : { y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: paused ? 0 : Infinity, ease: "easeInOut" }}
                  className="lg:rotate-[1deg]"
                  style={{
                    filter: "drop-shadow(0 30px 60px rgba(59,126,248,0.12)) drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
                  }}
                >
                  {panels[active]}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Glow */}
            <div
              className="absolute bottom-[-30px] left-[10%] right-[10%] h-[50px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(59,126,248,0.18) 0%, rgba(0,242,96,0.04) 50%, transparent 70%)", filter: "blur(16px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}