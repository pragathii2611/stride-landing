"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const conversation = [
  { from: "parent", text: "Hi! Do you have any P6 Math classes available on weekends?", delay: 0 },
  { from: "bot", text: "Hi there! 👋 Yes! Saturday 10am and Sunday 2pm — both have 2 seats left. Which works better?", delay: 2000 },
  { from: "parent", text: "Saturday 10am. What's the fee?", delay: 5500 },
  { from: "bot", text: "S$280/month (4 lessons). Includes practice papers + student portal. Want to book a free trial first?", delay: 8000 },
  { from: "parent", text: "Yes please! How do I sign up?", delay: 12000 },
  { from: "bot", text: "Great! 🎉 I just need your child's name and WhatsApp number to reserve the spot. Our team confirms within 2 hours!", delay: 15000 },
];

function ChatWidget() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    conversation.forEach((msg, i) => {
      if (msg.from === "bot") {
        setTimeout(() => setTyping(true), msg.delay);
        setTimeout(() => {
          setTyping(false);
          setVisibleMessages(prev => [...prev, i]);
        }, msg.delay + 900);
      } else {
        setTimeout(() => setVisibleMessages(prev => [...prev, i]), msg.delay);
      }
    });
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [visibleMessages, typing]);

  return (
    <div style={{
      position: "absolute",
      bottom: 24, right: 24,
      width: 320, height: 400,
      borderRadius: 20,
      background: "white",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.08)",
      overflow: "hidden",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
        padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>BrightMinds Support</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>Online · Replies instantly</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: 20, lineHeight: 1, cursor: "pointer" }}>×</div>
      </div>

      {/* Messages */}
      <div ref={chatScrollRef} style={{
        flex: 1, overflowY: "auto",
        padding: 12, background: "#f8fafc",
        display: "flex", flexDirection: "column", gap: 8,
        scrollbarWidth: "none",
      }}>
        <div style={{
          alignSelf: "center", background: "#e2e8f0",
          borderRadius: 999, padding: "3px 10px",
          fontSize: 10, color: "#64748b", marginBottom: 2,
        }}>Today</div>

        {conversation.map((msg, i) => (
          visibleMessages.includes(i) && (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                justifyContent: msg.from === "parent" ? "flex-end" : "flex-start",
                alignItems: "flex-end", gap: 6, flexShrink: 0,
              }}
            >
              {msg.from === "bot" && (
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "white", fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>AI</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "9px 12px",
                borderRadius: msg.from === "parent" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.from === "parent" ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "white",
                color: msg.from === "parent" ? "white" : "#1e293b",
                fontSize: 12, lineHeight: 1.55,
                boxShadow: msg.from === "parent" ? "0 4px 12px rgba(37,99,235,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}>{msg.text}</div>
            </motion.div>
          )
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "flex-end", gap: 6, flexShrink: 0 }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "white", fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>AI</div>
              <div style={{
                background: "white", borderRadius: "14px 14px 14px 4px",
                padding: "10px 14px", display: "flex", gap: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                {[0,1,2].map(j => (
                  <motion.span key={j}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "inline-block" }}
                    animate={{ y: [0,-4,0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid #e2e8f0", padding: "10px 12px",
        background: "white", display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
      }}>
        <div style={{
          flex: 1, background: "#f1f5f9", borderRadius: 999,
          padding: "9px 14px", color: "#94a3b8", fontSize: 12,
        }}>Type a message...</div>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SchoolWebsite() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "white", position: "relative",
      overflow: "hidden",
      fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      {/* Navbar */}
      <div style={{
        height: 64, borderBottom: "1px solid #f1f5f9",
        padding: "0 40px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "white",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            color: "white", fontWeight: 900, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>B</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>BrightMinds</span>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 14, color: "#64748b" }}>
          <span>Home</span>
          <span style={{ color: "#2563eb", fontWeight: 700, borderBottom: "2px solid #2563eb", paddingBottom: 2 }}>Programmes</span>
          <span>Schedule</span>
          <span>Results</span>
          <span>Contact</span>
        </div>
        <div style={{
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "white", padding: "10px 20px",
          borderRadius: 999, fontSize: 13, fontWeight: 700,
        }}>Enrol Now</div>
      </div>

      {/* Hero — compact */}
      <div style={{
        padding: "32px 48px 28px",
        background: "linear-gradient(135deg,#eff6ff,#f0fdf4)",
        position: "relative", flexShrink: 0,
      }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "#dbeafe", borderRadius: 999,
            padding: "6px 12px", marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
            <span style={{ color: "#2563eb", fontSize: 12, fontWeight: 700 }}>Now enrolling for 2026</span>
          </div>
          <h1 style={{
            fontSize: 48, lineHeight: 1.05, fontWeight: 900,
            letterSpacing: "-0.04em", color: "#0f172a", marginBottom: 14,
          }}>
            PSLE & O-Level<br/>Specialists
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "#64748b", marginBottom: 24, maxWidth: 440 }}>
            Small classes. Expert tutors. Results that speak for themselves. Trusted by 500+ Singapore families.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "white", padding: "12px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14 }}>Book Trial Class</div>
            <div style={{ background: "white", border: "2px solid #2563eb", color: "#2563eb", padding: "12px 24px", borderRadius: 999, fontWeight: 700, fontSize: 14 }}>View Schedule</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          position: "absolute", right: 60, top: 28,
          width: 190, background: "white",
          borderRadius: 20, padding: "20px 24px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
        }}>
          {[
            { label: "Pass Rate", value: "98%", color: "#2563eb" },
            { label: "A/A* Students", value: "74%", color: "#7c3aed" },
            { label: "Years Running", value: "12+", color: "#0891b2" },
          ].map(s => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Programmes grid */}
      <div style={{ padding: "24px 48px", flexShrink: 0, background: "white" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Our Programmes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { sub: "P5/P6 Math", level: "Primary", slots: "2 left", color: "#eff6ff", accent: "#2563eb" },
            { sub: "P5/P6 Science", level: "Primary", slots: "3 left", color: "#f0fdf4", accent: "#16a34a" },
            { sub: "Sec E. Math", level: "Secondary", slots: "1 left", color: "#fdf4ff", accent: "#7c3aed" },
            { sub: "PSLE English", level: "Primary", slots: "4 left", color: "#fff7ed", accent: "#ea580c" },
            { sub: "Sec Chemistry", level: "Secondary", slots: "2 left", color: "#f0f9ff", accent: "#0891b2" },
            { sub: "Sec Physics", level: "Secondary", slots: "5 left", color: "#fef2f2", accent: "#dc2626" },
          ].map(s => (
            <div key={s.sub} style={{
              background: s.color, borderRadius: 12,
              padding: "14px 16px", border: `1px solid ${s.accent}22`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{s.sub}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{s.level}</div>
              <div style={{ display: "inline-block", background: s.accent, color: "white", borderRadius: 999, padding: "2px 9px", fontSize: 11, fontWeight: 700 }}>{s.slots}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
<div style={{
  padding: "24px 48px",
  background: "#f8fafc",
  borderTop: "1px solid #f1f5f9",
  display: "flex", gap: 16,
}}>
  {[
    { name: "Mrs Tan", text: "My son went from C to A* in 3 months. Absolutely incredible." },
    { name: "Mr Rajan", text: "The tutors genuinely care. Best investment we made for PSLE." },
    { name: "Ms Priya", text: "The AI follow-up kept us informed every step of the way." },
  ].map(t => (
    <div key={t.name} style={{
      flex: 1, background: "white", borderRadius: 14,
      padding: "16px 20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
        {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#fbbf24", fontSize: 14 }}>★</span>)}
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>"{t.text}"</p>
      <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>— {t.name}</span>
    </div>
  ))}
</div>

      {/* Chat */}
      <ChatWidget />
    </div>
  );
}

export default function MacbookSection() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsOpen(true), 200); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
  ref={sectionRef}
  className="section-macbook"
  style={{
    background: "#020810",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)",
    overflow: "hidden",
    position: "relative",
    zIndex: 2,
  }}
>
      <div style={{ width: "min(1400px,95vw)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "clamp(16px,2vw,24px)" }}
        >
          <div style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase",
            backgroundImage: "linear-gradient(135deg,#5b9aff,#00f260)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}>Experience the Platform</div>
          <h2 style={{
            fontSize: "clamp(36px,5vw,72px)", fontWeight: 900,
            color: "white", letterSpacing: "-0.05em", marginBottom: 16,
          }}>See Stride in action.</h2>
         
        </motion.div>

        {/* MacBook */}
        <motion.div
          initial={{ opacity: 0, y: 80, scaleY: 0.4, scaleX: 0.95 }}
          animate={isOpen
            ? { opacity: 1, y: 0, scaleY: 1, scaleX: 1 }
            : { opacity: 0, y: 80, scaleY: 0.4, scaleX: 0.95 }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/10",
            transformOrigin: "bottom center",
          }}
        >
          {/* Screen content — fades in after lid opens */}
          <motion.div
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: isOpen ? 0.7 : 0 }}
            style={{
              position: "absolute",
              top: "8.5%",
              left: "16.5%",
              width: "67%",
              height: "80%",
              overflow: "hidden",
              borderRadius: "clamp(4px,0.5vw,8px)",
              background: "white",
              zIndex: 1,
            }}
          >
            <div style={{
              width: 1440, height: 900,
              transform: "scale(0.63)",
              transformOrigin: "top left",
              position: "absolute", top: 0, left: 0,
            }}>
              <SchoolWebsite />
            </div>
          </motion.div>

          {/* Glow — appears as screen lights up */}
          <motion.div
            animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: isOpen ? 0.6 : 0 }}
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.2), transparent 60%)",
              filter: "blur(40px)", zIndex: 0,
              transform: "translateY(40px)",
              pointerEvents: "none",
            }}
          />

          {/* MacBook PNG */}
          <Image
            src="/images/m.png"
            alt="MacBook"
            fill
            priority
            style={{
              objectFit: "contain",
              zIndex: 3,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          
        </motion.div>

      </div>
    </section>
  );
}