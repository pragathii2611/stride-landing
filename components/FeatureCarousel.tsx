"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const tabs = [
  {
    num: "01",
    label: "Lead Generation",
    title: "Leads don't wait.\nNeither does Stride.",
    body: "WhatsApp, email, LinkedIn — captured and centralised the moment it arrives. No manual checking. No dropped leads.",
  },
  {
    num: "02",
    label: "All in One Place",
    title: "The full context\nof every lead.",
    body: "Conversation history, lead scores, follow-up status — unified across your team. Every interaction, logged and visible.",
  },
  {
    num: "03",
    label: "Conversation Maturation",
    title: "Handed off.\nWithout lifting a finger.",
    body: "Stride engages every conversation autonomously — handling objections, sending follow-ups, building trust — until the moment is right to close.",
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
    <div className="rounded-[18px] overflow-hidden" style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59,126,248,0.08)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — Tuition Enquiries</span>
      </div>
      <div className="flex">
        <div className="hidden sm:flex w-[175px] flex-shrink-0 flex-col" style={{ background: "#060d1e", boxShadow: "1px 0 0 rgba(255,255,255,0.03)" }}>
          <div className="px-3 py-2.5" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-2 rounded-[8px] px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span className="text-[10px] text-white/20">Search...</span>
            </div>
          </div>
          {contacts.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 ${i === 0 ? "bg-white/[0.05]" : ""}`}>
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-[9px] font-bold flex-shrink-0 relative`}>
                {c.initials}
                {c.unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3b7ef8] text-[7px] font-bold flex items-center justify-center">{c.unread}</span>}
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
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2.5 px-4 py-2.5" style={{ background: "#080f20", boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[9px] font-bold flex-shrink-0">AM</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white">Aisha Mahmood</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /><span className="text-[10px] text-white/30">Active · WhatsApp</span></div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(74,222,128,0.08)", boxShadow: "0 0 0 1px rgba(74,222,128,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /><span className="text-[9px] font-bold text-[#4ade80]">9.6</span>
            </div>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.side === "r" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-[11px] text-[11px] leading-[1.6] ${m.side === "r" ? "text-[rgba(180,200,255,0.9)]" : "text-white/60"}`}
                  style={{ background: m.side === "r" ? "rgba(59,126,248,0.15)" : "rgba(255,255,255,0.05)", boxShadow: `0 0 0 1px ${m.side === "r" ? "rgba(59,126,248,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                  {m.side === "r" && <div className="flex items-center gap-1 mb-1"><span className="text-[8px] font-bold" style={{ color: "#00f260" }}>AI</span><span className="w-1 h-1 rounded-full bg-[#00f260]" /></div>}
                  {m.text}
                  <div className="text-[9px] text-white/20 mt-0.5 text-right">{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[7px] font-bold">AI</div>
              <div className="rounded-[10px] px-3 py-2 flex gap-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                {[0,1,2].map(j => (
                  <motion.span key={j} className="w-1.5 h-1.5 rounded-full bg-white/30" animate={{ y: [0,-4,0] }} transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.15 }} />
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
  const stages = ["Enquiry","Trial","Enrolled","Active","Renewed"];
  const currentStage = 2;
  const activity = [
    { text: "WhatsApp — asked about P6 Math slots", time: "5m ago", color: "#25d366" },
    { text: "Opened fee schedule PDF", time: "22m ago", color: "#5b9aff" },
    { text: "Visited /psle-intensive page", time: "1h ago", color: "#a78bfa" },
    { text: "Trial class attended — P5 Science", time: "3d ago", color: "#fbbf24" },
  ];

  return (
    <div className="rounded-[18px] overflow-hidden" style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59,126,248,0.08)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — Student Profile</span>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center text-[16px] font-black">AM</div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#4ade80]" style={{ boxShadow: "0 0 0 2px #080f20" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold text-white">Aisha Mahmood</div>
            <div className="text-[11px] text-white/40 truncate">P6 · Bukit Timah · Parent: Mrs Mahmood</div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(59,126,248,0.12)", boxShadow: "0 0 0 1px rgba(59,126,248,0.2)", color: "#5b9aff" }}>PSLE 2025</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(74,222,128,0.08)", boxShadow: "0 0 0 1px rgba(74,222,128,0.15)", color: "#4ade80" }}>High Intent</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[22px] font-black" style={{ backgroundImage: "linear-gradient(135deg,#5b9aff,#00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>9.6</div>
            <div className="text-[8px] text-white/30 uppercase tracking-wider">AI Score</div>
          </div>
        </div>
        <div>
          <div className="text-[9px] text-white/25 uppercase tracking-wider mb-2 font-semibold">Student Journey</div>
          <div className="flex items-center">
            {stages.map((s,i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full h-1.5 rounded-full" style={i<=currentStage?{background:"linear-gradient(90deg,#3b7ef8,#00f260)"}:{background:"rgba(255,255,255,0.06)"}} />
                  <span className={`text-[8px] mt-1 font-medium ${i===currentStage?"text-white":i<currentStage?"text-white/40":"text-white/20"}`}>{s}</span>
                </div>
                {i<stages.length-1&&<div className="w-0.5" />}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{v:"S$480",l:"Monthly Value",c:"#4ade80"},{v:"3",l:"Subjects",c:"#5b9aff"},{v:"Oct 25",l:"PSLE Date",c:"#fbbf24"}].map(s=>(
            <div key={s.l} className="rounded-[10px] px-2 py-2.5 text-center" style={{ background: "rgba(255,255,255,0.03)", boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}>
              <div className="text-[14px] font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[9px] text-white/25 uppercase tracking-wider mb-1.5 font-semibold">Recent Activity</div>
          <div className="flex flex-col gap-1.5">
            {activity.map((a,i)=>(
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
    <div className="rounded-[18px] overflow-hidden" style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,242,96,0.06)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-white/20 font-medium mx-auto tracking-wide">Stride — AI Enrolment Agent</span>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="hidden sm:flex w-[130px] flex-shrink-0 p-3 flex-col gap-3" style={{ background: "#060d1e", boxShadow: "1px 0 0 rgba(255,255,255,0.03)" }}>
          <div className="rounded-[10px] p-2.5" style={{ background: "rgba(0,242,96,0.06)", boxShadow: "0 0 0 1px rgba(0,242,96,0.12)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#00f260]" animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }} />
              <span className="text-[8px] font-bold text-[#00f260] uppercase tracking-wider">AI Active</span>
            </div>
            <div className="text-[9px] text-white/30">Enrolment Agent</div>
          </div>
          {[{label:"Response",value:"< 6s"},{label:"Enquiries",value:"31"},{label:"Trials",value:"9"},{label:"Enrolled",value:"4"}].map(s=>(
            <div key={s.label} className="flex flex-col gap-0.5">
              <div className="text-[8px] text-white/25 uppercase tracking-wider">{s.label}</div>
              <div className="text-[13px] font-bold text-white/70">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2.5 px-4 py-2.5" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[9px] font-bold flex-shrink-0">TL</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white/80">Tracy Lim</div>
              <div className="text-[9px] text-white/25">Parent · P5 Science · WhatsApp</div>
            </div>
            <div className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background:"rgba(59,126,248,0.12)", color:"#5b9aff", boxShadow:"0 0 0 1px rgba(59,126,248,0.2)" }}>Score 7.8</div>
          </div>
          <div className="px-3 py-3 flex flex-col gap-2">
            {messages.map((m,i)=>(
              <div key={i} className={`flex items-end gap-2 ${m.side==="r"?"justify-end":"justify-start"}`}>
                {m.side==="l"&&<div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[7px] font-bold flex-shrink-0">{m.avatar}</div>}
                <div className={`max-w-[82%] px-3 py-2 rounded-[11px] text-[11px] leading-[1.6] ${m.side==="r"?"text-[rgba(180,200,255,0.85)]":"text-white/55"}`}
                  style={{ background: m.side==="r"?"rgba(59,126,248,0.12)":"rgba(255,255,255,0.04)", boxShadow:`0 0 0 1px ${m.side==="r"?"rgba(59,126,248,0.18)":"rgba(255,255,255,0.05)"}` }}>
                  {m.side==="r"&&(
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[8px] font-bold" style={{ color:"#00f260" }}>STRIDE AI</span>
                      <motion.span className="w-1 h-1 rounded-full bg-[#00f260]" animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.5, repeat:Infinity }} />
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mx-3 mb-3 rounded-[12px] p-3 flex items-center gap-3"
            style={{ background:"linear-gradient(135deg,rgba(0,242,96,0.08),rgba(59,126,248,0.06))", boxShadow:"0 0 0 1px rgba(0,242,96,0.2)" }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[14px] font-black flex-shrink-0" style={{ background:"linear-gradient(135deg,#00c853,#3b7ef8)" }}>✓</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-white">Enrolment confirmed</div>
              <div className="text-[10px] text-white/50 mt-0.5">P5 Science · Sat 11am · GIRO sent</div>
            </div>
            <div className="text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap" style={{ background:"rgba(0,242,96,0.12)", color:"#00f260", boxShadow:"0 0 0 1px rgba(0,242,96,0.2)" }}>This Sat</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const panels = [<Mock1 key={0} />, <Mock2 key={1} />, <Mock3 key={2} />];

// ── PANEL ACCENT BACKGROUNDS ─────────────────────────────
const panelBg = [
  "radial-gradient(ellipse at 60% 50%, rgba(59,126,248,0.06) 0%, transparent 60%)",
  "radial-gradient(ellipse at 60% 50%, rgba(91,154,255,0.05) 0%, transparent 60%)",
  "radial-gradient(ellipse at 60% 50%, rgba(0,242,96,0.04) 0%, transparent 60%)",
];

export default function FeatureCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));

      setProgress(p);

      if (p < 0.33) setActive(0);
      else if (p < 0.66) setActive(1);
      else setActive(2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Mobile: manual tap
  const [mobileActive, setMobileActive] = useState(0);
  const [mobilePaused, setMobilePaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const mobileActiveRef = useRef(mobileActive);
  mobileActiveRef.current = mobileActive;

  const mobileGo = useCallback((i: number) => {
    setMobileActive(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => mobileGo((mobileActiveRef.current + 1) % 3), 7000);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    timerRef.current = setTimeout(() => mobileGo(1), 7000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isMobile, mobileGo]);

  const mobilePause = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMobilePaused(true);
  }, []);

  const mobileResume = useCallback(() => {
    setMobilePaused(false);
    timerRef.current = setTimeout(() => mobileGo((mobileActiveRef.current + 1) % 3), 3000);
  }, [mobileGo]);

  const onPointerDown = useCallback(() => {
    isLongPress.current = false;
    longPressRef.current = setTimeout(() => { isLongPress.current = true; mobilePause(); }, 400);
  }, [mobilePause]);

  const onPointerUp = useCallback(() => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
    if (isLongPress.current) { mobileResume(); isLongPress.current = false; }
  }, [mobileResume]);

  useEffect(() => {
    const up = () => {
      if (isLongPress.current) { mobileResume(); isLongPress.current = false; }
      if (longPressRef.current) clearTimeout(longPressRef.current);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => { window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
  }, [mobileResume]);

  const displayActive = isMobile ? mobileActive : active;

  // ── DESKTOP RENDER ───────────────────────────────────
  if (!isMobile) {
    return (
      // Tall section for scroll room — 300vh
      <div ref={sectionRef} id="features" style={{ height: "300vh", position: "relative" }}>
        {/* Sticky container */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Ambient bg shift */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ background: panelBg[active] }}
            />
          </AnimatePresence>

          {/* ── PROGRESS BAR ── */}
          <div className="absolute top-0 left-0 right-0 z-[20]" style={{ height: 2, background: "rgba(255,255,255,0.04)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #3b7ef8, #00f260)",
                boxShadow: "0 0 12px rgba(59,126,248,0.5), 0 0 24px rgba(0,242,96,0.2)",
              }}
            />
          </div>

          {/* ── HEADER ── */}
          <div
            className="absolute top-0 left-0 right-0 z-[10] flex items-center justify-between"
            style={{ padding: "clamp(20px,3vw,40px) clamp(32px,5vw,80px) 0" }}
          >
            {/* Eyebrow */}
            <div>
              <div className="flex items-center gap-2 mb-1" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundImage: "linear-gradient(135deg,#5b9aff,#00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <span style={{ width: 16, height: 1, background: "#3b7ef8", display: "inline-block", flexShrink: 0 }} />
                Platform
              </div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", color: "white", lineHeight: 1.1 }}>
                How Stride Works
              </h2>
            </div>

            {/* Tab labels — top right */}
            <div className="flex items-center gap-6">
              {tabs.map((tab, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 transition-all duration-300"
                  style={{ opacity: active === i ? 1 : 0.35 }}
                >
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: active === i ? "#00f260" : "rgba(255,255,255,0.5)" }}>
                    {tab.num}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                    {tab.label}
                  </span>
                  {/* Underline indicator */}
                  <div style={{ height: 1.5, width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden" }}>
                    {active === i && (
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#3b7ef8,#00f260)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLIDING PANELS ── */}
          <div
            className="absolute inset-0 flex"
            style={{
              width: "300vw",
              transform: `translateX(-${active * 100}vw)`,
              transition: "transform 0.75s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {tabs.map((tab, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center"
                style={{
                  width: "100vw",
                  height: "100vh",
                  padding: "clamp(32px,5vw,80px) clamp(32px,5vw,80px)",
                  paddingTop: "clamp(100px,12vw,140px)",
                }}
              >
                {/* Left: text */}
                <div style={{ flex: "0 0 45%", paddingRight: "clamp(24px,4vw,64px)" }}>
                  <motion.h3
                    key={`title-${i}-${active}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    style={{
                      fontSize: "clamp(32px,4.5vw,64px)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1.08,
                      color: "white",
                      marginBottom: "clamp(16px,2vw,28px)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {tab.title}
                  </motion.h3>
                  <motion.p
                    key={`body-${i}-${active}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    style={{
                      fontSize: "clamp(14px,1.5vw,17px)",
                      color: "rgba(180,188,210,0.6)",
                      lineHeight: 1.75,
                      maxWidth: 420,
                    }}
                  >
                    {tab.body}
                  </motion.p>

                  {/* Scroll hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 mt-10"
                    style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                    Scroll to continue
                  </motion.div>
                </div>

                {/* Right: mock */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    key={`mock-${i}-${active}`}
                    initial={{ opacity: 0, x: 40, rotateY: 8 }}
                    animate={{ opacity: 1, x: 0, rotateY: 3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    style={{
                      width: "100%",
                      maxWidth: 560,
                      filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(59,126,248,0.1))",
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {panels[i]}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll progress indicator — bottom */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[10]"
          >
            {tabs.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: active === i ? 28 : 6,
                  height: 6,
                  background: active === i
                    ? "linear-gradient(90deg,#3b7ef8,#00f260)"
                    : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── MOBILE RENDER ─────────────────────────────────────
  return (
    <section
      id="features"
      className="relative select-none"
      style={{ background: "#060E24", padding: "clamp(48px,8vw,80px) clamp(16px,5vw,32px)" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", marginBottom: 32, borderRadius: 1, overflow: "hidden" }}>
        <div style={{ width: `${((mobileActive + 1) / 3) * 100}%`, height: "100%", background: "linear-gradient(90deg,#3b7ef8,#00f260)", transition: "width 0.5s ease", borderRadius: 1 }} />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundImage: "linear-gradient(135deg,#5b9aff,#00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          <span style={{ width: 16, height: 1, background: "#3b7ef8", display: "inline-block" }} />
          Platform
        </div>
        <h2 style={{ fontSize: "clamp(28px,7vw,40px)", fontWeight: 800, letterSpacing: "-0.04em", color: "white", lineHeight: 1.1 }}>
          How Stride Works
        </h2>
      </div>

      {/* Mobile pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => !isLongPress.current && mobileGo(i)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300"
            style={{
              background: mobileActive === i ? "linear-gradient(135deg,rgba(59,126,248,0.2),rgba(0,242,96,0.1))" : "rgba(255,255,255,0.04)",
              boxShadow: mobileActive === i ? "0 0 0 1px rgba(59,126,248,0.35)" : "0 0 0 1px rgba(255,255,255,0.08)",
              color: mobileActive === i ? "#fff" : "rgba(255,255,255,0.45)",
              minHeight: 40,
            }}
          >
            {tab.num} {tab.label}
          </button>
        ))}
      </div>

      {/* Active content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mobileActive}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 style={{ fontSize: "clamp(24px,6vw,36px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "white", marginBottom: 12, whiteSpace: "pre-line" }}>
            {tabs[mobileActive].title}
          </h3>
          <p style={{ fontSize: 14, color: "rgba(180,188,210,0.6)", lineHeight: 1.75, marginBottom: 24 }}>
            {tabs[mobileActive].body}
          </p>

          {/* Progress bar under text */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden", marginBottom: 24 }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg,#3b7ef8,#00f260)" }}
              initial={{ width: "0%" }}
              animate={{ width: mobilePaused ? undefined : "100%" }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </div>

          <div style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}>
            {panels[mobileActive]}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {tabs.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{ width: mobileActive === i ? 24 : 6, height: 6, background: mobileActive === i ? "linear-gradient(90deg,#3b7ef8,#00f260)" : "rgba(255,255,255,0.15)" }}
          />
        ))}
      </div>
    </section>
  );
}