"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    num: "01",
    label: "Lead Generation",
    title: "Leads are captured,\nscored and centralised.\nAutomatically.",
    body: "WhatsApp, email, LinkedIn — captured and centralised the moment it arrives. No manual checking. No dropped leads.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "02",
    label: "All in one place",
    title: "The full context\nof every lead.\nAlways in reach.",
    body: "Conversation history, lead scores, follow-up status — unified across your team. Every interaction, logged and visible.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    num: "03",
    label: "Conversation maturation",
    title: "Leads nurtured,\nqualified and handed\noff. Without you\nlifting a finger.",
    body: "Stride engages every conversation autonomously — handling objections, sending follow-ups, building trust — until the moment is right to close.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
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
    <div className="rounded-[clamp(12px,1.5vw,18px)] overflow-hidden w-full"
      style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7)", fontSize: "clamp(9px,1.1vw,11px)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
        <span className="text-white/20 font-medium mx-auto tracking-wide" style={{ fontSize: "clamp(9px,1vw,11px)" }}>Stride — Tuition Enquiries</span>
      </div>
      <div className="flex">
        <div className="hidden sm:flex flex-shrink-0 flex-col" style={{ width: "clamp(120px,16vw,175px)", background: "#060d1e", boxShadow: "1px 0 0 rgba(255,255,255,0.03)" }}>
          <div className="px-3 py-2.5" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-2 rounded-[8px] px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{ fontSize: "clamp(8px,0.9vw,10px)", color: "rgba(255,255,255,0.2)" }}>Search...</span>
            </div>
          </div>
          {contacts.map((c, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 ${i === 0 ? "bg-white/[0.05]" : ""}`}>
              <div className={`rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center font-bold flex-shrink-0 relative`}
                style={{ width: "clamp(22px,2.5vw,28px)", height: "clamp(22px,2.5vw,28px)", fontSize: "clamp(7px,0.8vw,9px)" }}>
                {c.initials}
                {c.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 rounded-full bg-[#3b7ef8] flex items-center justify-center font-bold text-white"
                    style={{ width: "clamp(9px,1vw,12px)", height: "clamp(9px,1vw,12px)", fontSize: "clamp(6px,0.7vw,7px)" }}>{c.unread}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-white/80 truncate" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>{c.name}</span>
                  <span className="text-white/25 flex-shrink-0" style={{ fontSize: "clamp(7px,0.8vw,8px)" }}>{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-1 mt-0.5">
                  <span className="text-white/30 truncate" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>{c.preview}</span>
                  <span className="font-bold flex-shrink-0" style={{ fontSize: "clamp(7px,0.8vw,8px)", color: c.scoreColor }}>{c.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#080f20", boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-bold flex-shrink-0"
              style={{ width: "clamp(22px,2.5vw,28px)", height: "clamp(22px,2.5vw,28px)", fontSize: "clamp(7px,0.8vw,9px)" }}>AM</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white" style={{ fontSize: "clamp(10px,1.1vw,12px)" }}>Aisha Mahmood</div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0"/>
                <span className="text-white/30" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>Active · WhatsApp</span>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full px-2 py-1 flex-shrink-0" style={{ background: "rgba(74,222,128,0.08)", boxShadow: "0 0 0 1px rgba(74,222,128,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"/>
              <span className="font-bold text-[#4ade80]" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>9.6</span>
            </div>
          </div>
          <div className="px-3 py-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.side === "r" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-2.5 py-2 rounded-[10px] leading-[1.6] ${m.side === "r" ? "text-[rgba(180,200,255,0.9)]" : "text-white/60"}`}
                  style={{ fontSize: "clamp(9px,1vw,11px)", background: m.side === "r" ? "rgba(59,126,248,0.15)" : "rgba(255,255,255,0.05)", boxShadow: `0 0 0 1px ${m.side === "r" ? "rgba(59,126,248,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                  {m.side === "r" && <div className="flex items-center gap-1 mb-1">
                    <span className="font-bold" style={{ fontSize: "clamp(7px,0.8vw,8px)", color: "#00f260" }}>AI</span>
                    <span className="w-1 h-1 rounded-full bg-[#00f260]"/>
                  </div>}
                  {m.text}
                  <div className="text-white/20 mt-0.5 text-right" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>{m.time}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-bold"
                style={{ width: "clamp(16px,1.8vw,20px)", height: "clamp(16px,1.8vw,20px)", fontSize: "clamp(6px,0.7vw,7px)" }}>AI</div>
              <div className="rounded-[8px] px-2.5 py-1.5 flex gap-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                {[0,1,2].map(j => (
                  <motion.span key={j} className="rounded-full bg-white/30" style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)" }}
                    animate={{ y: [0,-3,0] }} transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.15 }}/>
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
    <div className="rounded-[clamp(12px,1.5vw,18px)] overflow-hidden w-full"
      style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7)", fontSize: "clamp(9px,1.1vw,11px)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
        <span className="text-white/20 font-medium mx-auto tracking-wide" style={{ fontSize: "clamp(9px,1vw,11px)" }}>Stride — Student Profile</span>
      </div>
      <div style={{ padding: "clamp(12px,1.5vw,16px)", display: "flex", flexDirection: "column", gap: "clamp(10px,1.2vw,14px)" }}>
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="rounded-[10px] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center font-black"
              style={{ width: "clamp(36px,4vw,48px)", height: "clamp(36px,4vw,48px)", fontSize: "clamp(12px,1.4vw,16px)" }}>AM</div>
            <span className="absolute -bottom-1 -right-1 rounded-full bg-[#4ade80]"
              style={{ width: "clamp(10px,1.1vw,14px)", height: "clamp(10px,1.1vw,14px)", boxShadow: "0 0 0 2px #080f20" }}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white" style={{ fontSize: "clamp(11px,1.3vw,15px)" }}>Aisha Mahmood</div>
            <div className="text-white/40 truncate" style={{ fontSize: "clamp(9px,1vw,11px)" }}>P6 · Bukit Timah · Parent: Mrs Mahmood</div>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className="px-1.5 py-0.5 rounded-full font-medium" style={{ fontSize: "clamp(7px,0.8vw,9px)", background: "rgba(59,126,248,0.12)", boxShadow: "0 0 0 1px rgba(59,126,248,0.2)", color: "#5b9aff" }}>PSLE 2025</span>
              <span className="px-1.5 py-0.5 rounded-full font-medium" style={{ fontSize: "clamp(7px,0.8vw,9px)", background: "rgba(74,222,128,0.08)", boxShadow: "0 0 0 1px rgba(74,222,128,0.15)", color: "#4ade80" }}>High Intent</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-black" style={{ fontSize: "clamp(16px,2vw,22px)", backgroundImage: "linear-gradient(135deg,#5b9aff,#00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>9.6</div>
            <div className="text-white/30 uppercase tracking-wider" style={{ fontSize: "clamp(6px,0.7vw,8px)" }}>AI Score</div>
          </div>
        </div>
        <div>
          <div className="text-white/25 uppercase tracking-wider font-semibold mb-1.5" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>Student Journey</div>
          <div className="flex items-center">
            {stages.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-full rounded-full" style={{ height: "clamp(3px,0.4vw,5px)", background: i<=currentStage ? "linear-gradient(90deg,#3b7ef8,#00f260)" : "rgba(255,255,255,0.06)" }}/>
                  <span className={`mt-1 font-medium ${i===currentStage?"text-white":i<currentStage?"text-white/40":"text-white/20"}`}
                    style={{ fontSize: "clamp(6px,0.7vw,8px)" }}>{s}</span>
                </div>
                {i<stages.length-1 && <div className="w-0.5"/>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{v:"S$480",l:"Monthly",c:"#4ade80"},{v:"3",l:"Subjects",c:"#5b9aff"},{v:"Oct 25",l:"PSLE",c:"#fbbf24"}].map(s=>(
            <div key={s.l} className="rounded-[8px] text-center" style={{ padding: "clamp(6px,0.8vw,10px) clamp(4px,0.5vw,8px)", background: "rgba(255,255,255,0.03)", boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}>
              <div className="font-bold" style={{ fontSize: "clamp(11px,1.3vw,14px)", color: s.c }}>{s.v}</div>
              <div className="text-white/30 mt-0.5" style={{ fontSize: "clamp(6px,0.7vw,9px)" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-white/25 uppercase tracking-wider font-semibold mb-1.5" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>Recent Activity</div>
          <div className="flex flex-col gap-1">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-2 rounded-[7px]" style={{ padding: "clamp(5px,0.6vw,8px) clamp(8px,1vw,12px)", background: "rgba(255,255,255,0.02)" }}>
                <span className="rounded-full flex-shrink-0" style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)", background: a.color }}/>
                <span className="text-white/50 flex-1 truncate" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>{a.text}</span>
                <span className="text-white/20 flex-shrink-0" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>{a.time}</span>
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
    <div className="rounded-[clamp(12px,1.5vw,18px)] overflow-hidden w-full"
      style={{ background: "#080f20", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,242,96,0.06)", fontSize: "clamp(9px,1.1vw,11px)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#0a1428", boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
        <span className="text-white/20 font-medium mx-auto tracking-wide" style={{ fontSize: "clamp(9px,1vw,11px)" }}>Stride — AI Enrolment Agent</span>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="hidden sm:flex flex-shrink-0 flex-col" style={{ width: "clamp(100px,13vw,130px)", background: "#060d1e", boxShadow: "1px 0 0 rgba(255,255,255,0.03)", padding: "clamp(8px,1vw,12px)", gap: "clamp(8px,1vw,12px)" }}>
          <div className="rounded-[8px]" style={{ padding: "clamp(6px,0.8vw,10px)", background: "rgba(0,242,96,0.06)", boxShadow: "0 0 0 1px rgba(0,242,96,0.12)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <motion.span className="rounded-full bg-[#00f260]" style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)" }}
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }}/>
              <span className="font-bold text-[#00f260] uppercase tracking-wider" style={{ fontSize: "clamp(7px,0.8vw,8px)" }}>AI Active</span>
            </div>
            <div className="text-white/30" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>Enrolment Agent</div>
          </div>
          {[{label:"Response",value:"< 6s"},{label:"Enquiries",value:"31"},{label:"Trials",value:"9"},{label:"Enrolled",value:"4"}].map(s=>(
            <div key={s.label} className="flex flex-col gap-0.5">
              <div className="text-white/25 uppercase tracking-wider" style={{ fontSize: "clamp(6px,0.7vw,8px)" }}>{s.label}</div>
              <div className="font-bold text-white/70" style={{ fontSize: "clamp(10px,1.2vw,13px)" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex sm:hidden items-center gap-3 px-4 py-2" style={{ background: "#060d1e", boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-1.5">
              <motion.span className="rounded-full bg-[#00f260]" style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)" }}
                animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }}/>
              <span className="font-bold text-[#00f260]" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>AI Active</span>
            </div>
            <span className="text-white/20" style={{ fontSize: "clamp(9px,1vw,11px)" }}>·</span>
            <span className="text-white/30" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>31 enquiries · 4 enrolled today</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.03)" }}>
            <div className="rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold flex-shrink-0"
              style={{ width: "clamp(20px,2.2vw,28px)", height: "clamp(20px,2.2vw,28px)", fontSize: "clamp(7px,0.8vw,9px)" }}>TL</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white/80" style={{ fontSize: "clamp(9px,1vw,11px)" }}>Tracy Lim</div>
              <div className="text-white/25" style={{ fontSize: "clamp(7px,0.8vw,9px)" }}>Parent · P5 Science · WhatsApp</div>
            </div>
            <div className="font-bold rounded-full flex-shrink-0" style={{ fontSize: "clamp(7px,0.8vw,9px)", padding: "2px 8px", background: "rgba(59,126,248,0.12)", color: "#5b9aff", boxShadow: "0 0 0 1px rgba(59,126,248,0.2)" }}>Score 7.8</div>
          </div>
          <div className="flex flex-col gap-1.5" style={{ padding: "clamp(8px,1vw,12px)" }}>
            {messages.map((m,i)=>(
              <div key={i} className={`flex items-end gap-1.5 ${m.side==="r"?"justify-end":"justify-start"}`}>
                {m.side==="l"&&<div className="rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold flex-shrink-0"
                  style={{ width: "clamp(14px,1.6vw,20px)", height: "clamp(14px,1.6vw,20px)", fontSize: "clamp(6px,0.7vw,7px)" }}>{m.avatar}</div>}
                <div className={`max-w-[82%] rounded-[9px] leading-[1.6] ${m.side==="r"?"text-[rgba(180,200,255,0.85)]":"text-white/55"}`}
                  style={{ fontSize: "clamp(9px,1vw,11px)", padding: "clamp(5px,0.6vw,8px) clamp(8px,1vw,12px)", background: m.side==="r"?"rgba(59,126,248,0.12)":"rgba(255,255,255,0.04)", boxShadow: `0 0 0 1px ${m.side==="r"?"rgba(59,126,248,0.18)":"rgba(255,255,255,0.05)"}` }}>
                  {m.side==="r"&&(
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold" style={{ fontSize: "clamp(6px,0.7vw,8px)", color:"#00f260" }}>STRIDE AI</span>
                      <motion.span className="rounded-full bg-[#00f260]" style={{ width: "clamp(3px,0.4vw,4px)", height: "clamp(3px,0.4vw,4px)" }}
                        animate={{ opacity:[1,0.2,1] }} transition={{ duration:1.5, repeat:Infinity }}/>
                    </div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-[10px]"
            style={{ margin: "0 clamp(8px,1vw,12px) clamp(8px,1vw,12px)", padding: "clamp(8px,1vw,12px)", background:"linear-gradient(135deg,rgba(0,242,96,0.08),rgba(59,126,248,0.06))", boxShadow:"0 0 0 1px rgba(0,242,96,0.2)" }}>
            <div className="rounded-[8px] flex items-center justify-center font-black flex-shrink-0"
              style={{ width: "clamp(28px,3vw,36px)", height: "clamp(28px,3vw,36px)", fontSize: "clamp(10px,1.2vw,14px)", background:"linear-gradient(135deg,#00c853,#3b7ef8)" }}>✓</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white" style={{ fontSize: "clamp(9px,1vw,11px)" }}>Enrolment confirmed</div>
              <div className="text-white/50 mt-0.5" style={{ fontSize: "clamp(8px,0.9vw,10px)" }}>P5 Science · Sat 11am · GIRO sent</div>
            </div>
            <div className="font-bold rounded-full flex-shrink-0 whitespace-nowrap"
              style={{ fontSize: "clamp(7px,0.8vw,9px)", padding: "clamp(3px,0.4vw,4px) clamp(6px,0.8vw,8px)", background:"rgba(0,242,96,0.12)", color:"#00f260", boxShadow:"0 0 0 1px rgba(0,242,96,0.2)" }}>This Sat</div>
        </div>
        </div>
      </div>
    </div>
  );
}

const panels = [<Mock1 key={0}/>, <Mock2 key={1}/>, <Mock3 key={2}/>];

export default function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  const go = useCallback((i: number) => {
    setActive(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go((activeRef.current + 1) % 3), 12000);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(1), 12000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [go]);

  const pause = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPaused(true); setShowHint(true);
  }, []);

  const resume = useCallback(() => {
    setPaused(false); setShowHint(false);
    timerRef.current = setTimeout(() => go((activeRef.current + 1) % 3), 5000);
  }, [go]);

  const onPointerDown = useCallback(() => {
    isLongPress.current = false;
    longPressRef.current = setTimeout(() => { isLongPress.current = true; pause(); }, 400);
  }, [pause]);

  const onPointerUp = useCallback(() => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
    if (isLongPress.current) { resume(); isLongPress.current = false; }
  }, [resume]);

  useEffect(() => {
    const up = () => {
      if (isLongPress.current) { resume(); isLongPress.current = false; }
      if (longPressRef.current) clearTimeout(longPressRef.current);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [resume]);

  return (
    <section
      id="features"
      className="relative select-none"
      style={{ background: "#020810", padding: "0 0 clamp(60px,8vw,100px) 0" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Pause hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold pointer-events-none whitespace-nowrap"
            style={{ background: "rgba(2,8,16,0.92)", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", color: "rgba(255,255,255,0.6)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
            Hold to pause · Release to resume
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TABS ROW ── */}
      <div className="flex items-stretch" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.05)" }}>
        {tabs.map((tab, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => !isLongPress.current && go(i)}
              className="flex-1 flex flex-col items-center justify-end relative transition-all duration-200 group"
              style={{
                padding: "clamp(20px,3vw,32px) clamp(2px,0.8vw,8px) 0",
                borderRight: i < tabs.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: "transparent",
                minHeight: "clamp(72px,10vw,96px)",
              }}
            >
              {/* Number badge */}
              <div
                className="absolute flex items-center justify-center transition-all duration-300"
                style={{
                  top: "clamp(14px,2vw,22px)",
                  left: "50%", transform: "translateX(-50%)",
                  width: isActive ? "clamp(22px,2.5vw,28px)" : "clamp(18px,2vw,22px)",
                  height: isActive ? "clamp(22px,2.5vw,28px)" : "clamp(18px,2vw,22px)",
                  borderRadius: "50%",
                  background: isActive
                    ? "linear-gradient(135deg, #3b7ef8, #5b9aff)"
                    : "rgba(255,255,255,0.15)",
                  boxShadow: isActive ? "0 0 12px rgba(59,126,248,0.4), 0 0 24px rgba(59,126,248,0.15)" : "none",
                  fontSize: "clamp(9px,1vw,11px)",
                  fontWeight: 800,
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon + Label */}
              <div className="flex items-center gap-1.5 mb-3 mt-auto">
                <span
                  className="flex-shrink-0 transition-colors duration-300 hidden sm:block"
                  style={{ color: isActive ? "#3b7ef8" : "rgba(255,255,255,0.5)" }}
                >
                  {tab.icon}
                </span>
                <span
                  className="transition-all duration-300"
                  style={{
                    fontSize: "clamp(10px,1.2vw,14px)",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "white" : "rgba(255,255,255,0.7)",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </span>
              </div>

              {/* Underline */}
              <div className="w-full relative overflow-hidden" style={{ height: 2, background: "rgba(255,255,255,0.08)" }}>
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #3b7ef8, #5b9aff)" }}
                    layoutId="tabUnderline"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full rounded-full z-10"
                    style={{ background: "linear-gradient(90deg, #5b9aff, #00f260)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={{ duration: 12, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── CONTENT ── */}
      <div
        className="max-w-[1400px] mx-auto"
        style={{ padding: "clamp(32px,5vw,64px) clamp(20px,5vw,80px) 0" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-[clamp(32px,5vw,80px)]"
          >
            {/* Left — text */}
            <div className="w-full lg:w-[42%] lg:flex-shrink-0">
              <h2
                className="font-black tracking-[-0.04em] leading-[1.05] text-white whitespace-pre-line"
                style={{ fontSize: "clamp(22px,3.8vw,52px)" }}
              >
                {tabs[active].title}
              </h2>
              <p
                className="mt-4 leading-[1.75]"
                style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(180,188,210,0.55)", maxWidth: 440 }}
              >
                {tabs[active].body}
              </p>
            </div>

            {/* Right — mock */}
            <div className="flex-1 w-full min-w-0">
              <motion.div
                key={`mock-${active}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              >
                <motion.div
                  animate={paused ? { y: 0 } : { y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: paused ? 0 : Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(59,126,248,0.08))" }}
                >
                  {panels[active]}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}