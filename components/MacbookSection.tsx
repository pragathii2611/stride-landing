"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const conversation = [
  { from: "parent", text: "Hi! Do you have any P6 Math classes available on weekends?", delay: 0 },
  { from: "bot", text: "Hi there! 👋 Yes, we do! We have Saturday 10am and Sunday 2pm slots for P6 Math. Both have 2 seats remaining. Which would suit your child better?", delay: 1200 },
  { from: "parent", text: "Saturday 10am sounds good. What's the fee?", delay: 3200 },
  { from: "bot", text: "The Saturday P6 Math class is S$280/month (4 lessons). Includes printed practice papers and access to our student portal. Would you like to book a free trial first?", delay: 4600 },
  { from: "parent", text: "Yes please! How do I sign up for the trial?", delay: 6800 },
  { from: "bot", text: "Great choice! 🎉 I'll need your child's name and your WhatsApp number to reserve the spot. Our team will confirm within 2 hours!", delay: 8000 },
];

function ChatWidget() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    conversation.forEach((msg, i) => {
      if (msg.from === "bot") {
        setTimeout(() => setTyping(true), msg.delay);
        setTimeout(() => {
          setTyping(false);
          setVisibleMessages((prev) => [...prev, i]);
        }, msg.delay + 900);
      } else {
        setTimeout(() => setVisibleMessages((prev) => [...prev, i]), msg.delay);
      }
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, typing]);

  return (
    <div style={{
      position: "absolute",
      bottom: "clamp(12px,2vw,28px)",
      right: "clamp(12px,2vw,28px)",
      width: "clamp(200px,28vw,340px)",
      height: "clamp(240px,36vw,440px)",
      borderRadius: "clamp(10px,1.5vw,18px)",
      background: "white",
      boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
      overflow: "hidden",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      fontSize: "clamp(8px,1vw,13px)",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a56db, #1e40af)",
        padding: "clamp(8px,1.2vw,14px) clamp(10px,1.5vw,16px)",
        display: "flex", alignItems: "center",
        gap: "clamp(6px,0.8vw,10px)", flexShrink: 0,
      }}>
        <div style={{
          width: "clamp(24px,3vw,36px)", height: "clamp(24px,3vw,36px)",
          borderRadius: "50%", background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: "clamp(8px,1vw,13px)", lineHeight: 1.2 }}>BrightMinds Support</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(6px,0.75vw,10px)" }}>Online · Replies instantly</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: "clamp(14px,1.5vw,20px)", lineHeight: 1 }}>×</div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "clamp(8px,1vw,12px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(4px,0.6vw,8px)",
        background: "#f8fafc", scrollbarWidth: "none",
      }}>
        <div style={{
          alignSelf: "center", background: "#e2e8f0",
          borderRadius: 20, padding: "3px 10px",
          fontSize: "clamp(6px,0.7vw,9px)", color: "#64748b",
          marginBottom: 4, flexShrink: 0,
        }}>Today</div>

        {conversation.map((msg, i) => (
          visibleMessages.includes(i) && (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                justifyContent: msg.from === "parent" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "clamp(3px,0.4vw,5px)", flexShrink: 0,
              }}
            >
              {msg.from === "bot" && (
                <div style={{
                  width: "clamp(16px,2vw,24px)", height: "clamp(16px,2vw,24px)",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a56db, #1e40af)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: "clamp(6px,0.7vw,9px)", color: "white", fontWeight: 700,
                }}>AI</div>
              )}
              <div style={{
                maxWidth: "78%",
                padding: "clamp(5px,0.7vw,9px) clamp(7px,0.9vw,12px)",
                borderRadius: msg.from === "parent"
                  ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: msg.from === "parent"
                  ? "linear-gradient(135deg, #1a56db, #1e40af)" : "white",
                color: msg.from === "parent" ? "white" : "#1e293b",
                fontSize: "clamp(7px,0.85vw,11px)", lineHeight: 1.55,
                boxShadow: msg.from === "parent"
                  ? "0 2px 8px rgba(26,86,219,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
              }}>{msg.text}</div>
            </motion.div>
          )
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              style={{ display: "flex", alignItems: "flex-end", gap: "clamp(3px,0.4vw,5px)", flexShrink: 0 }}
            >
              <div style={{
                width: "clamp(16px,2vw,24px)", height: "clamp(16px,2vw,24px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a56db, #1e40af)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: "clamp(6px,0.7vw,9px)", color: "white", fontWeight: 700,
              }}>AI</div>
              <div style={{
                padding: "clamp(6px,0.8vw,10px) clamp(8px,1vw,12px)",
                borderRadius: "14px 14px 14px 4px",
                background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                display: "flex", gap: 3, alignItems: "center",
              }}>
                {[0,1,2].map(j => (
                  <motion.span key={j}
                    style={{ width: "clamp(4px,0.5vw,6px)", height: "clamp(4px,0.5vw,6px)", borderRadius: "50%", background: "#94a3b8", display: "inline-block" }}
                    animate={{ y: [0,-4,0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "clamp(6px,0.8vw,10px) clamp(8px,1vw,12px)",
        borderTop: "1px solid #e2e8f0",
        display: "flex", alignItems: "center",
        gap: "clamp(4px,0.5vw,6px)",
        background: "white", flexShrink: 0,
      }}>
        <div style={{
          flex: 1, background: "#f1f5f9", borderRadius: 20,
          padding: "clamp(4px,0.5vw,7px) clamp(8px,1vw,12px)",
          fontSize: "clamp(6px,0.78vw,10px)", color: "#94a3b8",
          border: "1px solid #e2e8f0",
        }}>Type a message...</div>
        <div style={{
          width: "clamp(18px,2.2vw,28px)", height: "clamp(18px,2.2vw,28px)",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a56db, #1e40af)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SchoolWebsite() {
  const navItems = ["Home", "Programmes", "Schedule", "Results", "Contact"];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "white",
      display: "flex", flexDirection: "column",
      overflow: "hidden", position: "relative",
      fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    }}>

      {/* ── macOS MENU BAR ── */}
      <div style={{
        background: "rgba(236,236,236,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        height: "clamp(18px,2.2vw,28px)",
        padding: "0 clamp(8px,1.2vw,16px)",
        flexShrink: 0,
        gap: 0,
      }}>
        {/* Apple logo */}
<svg
  viewBox="0 0 256 256"
  style={{ width: "clamp(10px,1.3vw,16px)", height: "clamp(10px,1.3vw,16px)", marginRight: "clamp(8px,1.2vw,16px)", flexShrink: 0 }}
  >
  <path fill="#1d1d1f" d="M213.3 166.6c-4 8.9-5.9 12.9-11 20.7-7.2 10.9-17.3 24.5-29.9 24.6-11.2.1-14-7.3-29.2-7.2-15.1.1-18.3 7.3-29.5 7.2-12.5-.1-22.1-12.5-29.3-23.4-20.1-30.5-22.2-66.3-9.8-85.3 8.8-13.5 22.7-21.4 35.8-21.4 13.3 0 21.7 7.3 32.7 7.3 10.7 0 17.2-7.3 32.6-7.3 11.6 0 23.9 6.3 32.7 17.3-28.7 15.7-24 56.8 4.9 67.5zM167.7 64.3c5.6-7.2 9.9-17.3 8.3-27.6-9.1.6-19.7 6.4-25.9 13.9-5.6 6.8-10.3 17-8.5 26.9 10 .3 20.3-5.5 26.1-13.2z"/>
</svg>

        {/* Menu items */}
        {[
          { label: "Safari", bold: true },
          { label: "File" },
          { label: "Edit" },
          { label: "View" },
          { label: "History" },
          { label: "Bookmarks" },
          { label: "Window" },
          { label: "Help" },
        ].map((m) => (
          <span key={m.label} style={{
            fontSize: "clamp(8px,0.85vw,12px)",
            fontWeight: m.bold ? 600 : 400,
            color: "#1d1d1f",
            marginRight: "clamp(8px,1.1vw,14px)",
            whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}>{m.label}</span>
        ))}

        {/* Right status area */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "clamp(5px,0.7vw,10px)" }}>
          {/* Wifi icon */}
          <svg viewBox="0 0 24 24" fill="#1d1d1f"
            style={{ width: "clamp(9px,1.1vw,14px)", height: "clamp(9px,1.1vw,14px)" }}>
            <path d="M12 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            <path d="M12 14c-1.7 0-3.2.7-4.3 1.8l1.4 1.4c.8-.8 1.8-1.2 2.9-1.2s2.1.4 2.9 1.2l1.4-1.4C15.2 14.7 13.7 14 12 14z"/>
            <path d="M12 10c-2.8 0-5.2 1.1-7 2.9l1.4 1.4C7.8 12.9 9.8 12 12 12s4.2.9 5.6 2.3l1.4-1.4C17.2 11.1 14.8 10 12 10z"/>
            <path d="M12 6C8.1 6 4.6 7.6 2 10.2l1.4 1.4C5.6 9.2 8.6 8 12 8s6.4 1.2 8.6 3.6L22 10.2C19.4 7.6 15.9 6 12 6z"/>
          </svg>

          {/* Battery */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(2px,0.25vw,3px)" }}>
            <div style={{
              width: "clamp(18px,2.2vw,28px)", height: "clamp(8px,1vw,12px)",
              border: "1px solid rgba(0,0,0,0.35)",
              borderRadius: "clamp(2px,0.25vw,3px)",
              padding: "1px",
              display: "flex", alignItems: "center",
              position: "relative",
            }}>
              <div style={{
                width: "90%", height: "100%",
                background: "#34c759",
                borderRadius: "clamp(1px,0.12vw,2px)",
              }} />
              <div style={{
                position: "absolute", right: -3,
                width: "clamp(2px,0.28vw,3px)", height: "clamp(4px,0.5vw,6px)",
                background: "rgba(0,0,0,0.25)",
                borderRadius: "0 1px 1px 0",
              }} />
            </div>
            <span style={{ fontSize: "clamp(7px,0.82vw,11px)", color: "#1d1d1f" }}>100%</span>
          </div>

          {/* Date + Time */}
          <span style={{ fontSize: "clamp(7px,0.85vw,12px)", color: "#1d1d1f", whiteSpace: "nowrap" }}>Mon Jun 5</span>
          <span style={{ fontSize: "clamp(7px,0.85vw,12px)", color: "#1d1d1f", fontWeight: 600, whiteSpace: "nowrap" }}>9:41 AM</span>
        </div>
      </div>

      {/* ── SAFARI BROWSER CHROME ── */}
      <div style={{
        background: "#ececec",
        borderBottom: "1px solid #d0d0d0",
        padding: "clamp(4px,0.55vw,7px) clamp(8px,1.2vw,14px)",
        display: "flex", alignItems: "center",
        gap: "clamp(4px,0.6vw,8px)", flexShrink: 0,
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "clamp(3px,0.4vw,5px)", flexShrink: 0 }}>
          {[
            { bg: "#ff5f57", border: "#e0443e" },
            { bg: "#febc2e", border: "#d4a017" },
            { bg: "#28c840", border: "#1aab29" },
          ].map((c, i) => (
            <div key={i} style={{
              width: "clamp(8px,1vw,13px)", height: "clamp(8px,1vw,13px)",
              borderRadius: "50%", background: c.bg,
              boxShadow: `0 0 0 0.5px ${c.border}`,
            }} />
          ))}
        </div>

        {/* Back / forward */}
        <div style={{ display: "flex", gap: "clamp(1px,0.15vw,2px)", flexShrink: 0 }}>
          {["‹","›"].map((a, i) => (
            <div key={a} style={{
              width: "clamp(16px,2vw,26px)", height: "clamp(16px,2vw,26px)",
              borderRadius: 5,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(12px,1.6vw,20px)",
              color: i === 0 ? "#888" : "#ccc", fontWeight: 300,
            }}>{a}</div>
          ))}
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1, background: "white",
          borderRadius: "clamp(6px,0.8vw,10px)",
          padding: "clamp(3px,0.4vw,6px) clamp(8px,1.2vw,14px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(3px,0.4vw,5px)",
          boxShadow: "0 0 0 1px #c8c8c8, 0 1px 2px rgba(0,0,0,0.06)",
          position: "relative",
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ fontSize: "clamp(7px,0.88vw,12px)", color: "#374151", letterSpacing: "-0.01em" }}>
            brightmindstuition.edu.sg
          </span>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"
            style={{ position: "absolute", right: "clamp(6px,0.8vw,10px)" }}>
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-3.6"/>
          </svg>
        </div>

        {/* Share + new tab */}
        <div style={{ display: "flex", gap: "clamp(3px,0.4vw,6px)", flexShrink: 0, alignItems: "center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8"
            style={{ width: "clamp(10px,1.2vw,15px)", height: "clamp(10px,1.2vw,15px)" }}>
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8"
            style={{ width: "clamp(10px,1.2vw,15px)", height: "clamp(10px,1.2vw,15px)" }}>
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </div>

      {/* ── WEBSITE CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative", scrollbarWidth: "none" }}>

        {/* School navbar */}
        <div style={{
          background: "white", borderBottom: "1px solid #f1f5f9",
          padding: "0 clamp(10px,2vw,32px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "clamp(28px,4vw,52px)",
          flexShrink: 0, position: "sticky", top: 0, zIndex: 10,
          boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(4px,0.6vw,8px)" }}>
            <div style={{
              width: "clamp(16px,2.2vw,30px)", height: "clamp(16px,2.2vw,30px)",
              borderRadius: "clamp(4px,0.5vw,8px)",
              background: "linear-gradient(135deg, #1a56db, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(8px,1vw,13px)", fontWeight: 900, color: "white",
            }}>B</div>
            <span style={{ fontWeight: 800, fontSize: "clamp(8px,1vw,14px)", color: "#0f172a", letterSpacing: "-0.02em" }}>BrightMinds</span>
          </div>
          <div style={{ display: "flex", gap: "clamp(6px,1vw,20px)" }}>
            {navItems.map(n => (
              <span key={n} style={{
                fontSize: "clamp(6px,0.75vw,10px)",
                color: n === "Programmes" ? "#1a56db" : "#64748b",
                fontWeight: n === "Programmes" ? 600 : 400,
                borderBottom: n === "Programmes" ? "1.5px solid #1a56db" : "none",
                paddingBottom: 1,
              }}>{n}</span>
            ))}
          </div>
          <div style={{
            background: "linear-gradient(135deg, #1a56db, #1e40af)",
            color: "white", borderRadius: 20,
            padding: "clamp(3px,0.4vw,6px) clamp(8px,1.2vw,16px)",
            fontSize: "clamp(6px,0.75vw,10px)", fontWeight: 700,
          }}>Enrol Now</div>
        </div>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
          padding: "clamp(14px,2.5vw,36px) clamp(10px,2vw,32px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "clamp(8px,1.5vw,20px)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#dbeafe", borderRadius: 20,
              padding: "2px 8px", marginBottom: "clamp(5px,0.8vw,10px)",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a56db", display: "inline-block" }} />
              <span style={{ fontSize: "clamp(5px,0.65vw,8px)", color: "#1a56db", fontWeight: 700 }}>Now enrolling for 2025</span>
            </div>
            <h1 style={{
              fontSize: "clamp(11px,1.8vw,26px)", fontWeight: 900, color: "#0f172a",
              lineHeight: 1.15, marginBottom: "clamp(4px,0.6vw,8px)", letterSpacing: "-0.03em",
            }}>
              PSLE & O-Level<br/>Specialists
            </h1>
            <p style={{
              fontSize: "clamp(6px,0.78vw,10px)", color: "#64748b",
              lineHeight: 1.6, marginBottom: "clamp(6px,1vw,14px)", maxWidth: 220,
            }}>
              Small classes. Expert tutors. Results that speak for themselves. Trusted by 500+ families across Singapore.
            </p>
            <div style={{ display: "flex", gap: "clamp(4px,0.5vw,6px)" }}>
              <div style={{
                background: "linear-gradient(135deg, #1a56db, #1e40af)",
                color: "white", borderRadius: 20,
                padding: "clamp(3px,0.5vw,7px) clamp(8px,1.2vw,14px)",
                fontSize: "clamp(6px,0.72vw,9px)", fontWeight: 700,
              }}>Book Trial Class</div>
              <div style={{
                background: "white", color: "#1a56db",
                borderRadius: 20, border: "1.5px solid #1a56db",
                padding: "clamp(3px,0.5vw,7px) clamp(8px,1.2vw,14px)",
                fontSize: "clamp(6px,0.72vw,9px)", fontWeight: 600,
              }}>View Schedule</div>
            </div>
          </div>
          {/* Stats */}
          <div style={{
            background: "white", borderRadius: "clamp(8px,1vw,14px)",
            padding: "clamp(8px,1.2vw,16px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            display: "flex", flexDirection: "column", gap: "clamp(4px,0.6vw,8px)",
            flexShrink: 0, minWidth: "clamp(80px,12vw,160px)",
          }}>
            {[
              { label: "Pass Rate", value: "98%", color: "#1a56db" },
              { label: "A/A* Students", value: "74%", color: "#7c3aed" },
              { label: "Years Running", value: "12+", color: "#0891b2" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: "clamp(10px,1.5vw,20px)", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "clamp(5px,0.65vw,8px)", color: "#94a3b8", marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Programmes */}
        <div style={{ padding: "clamp(10px,1.5vw,20px) clamp(10px,2vw,32px)" }}>
          <div style={{ fontSize: "clamp(8px,1.1vw,15px)", fontWeight: 800, color: "#0f172a", marginBottom: "clamp(6px,0.8vw,10px)", letterSpacing: "-0.02em" }}>
            Our Programmes
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(4px,0.6vw,8px)" }}>
            {[
              { sub: "P5/P6 Math", level: "Primary", slots: "2 left", color: "#eff6ff", accent: "#1a56db" },
              { sub: "P5/P6 Science", level: "Primary", slots: "3 left", color: "#f0fdf4", accent: "#16a34a" },
              { sub: "Sec E. Math", level: "Secondary", slots: "1 left", color: "#fdf4ff", accent: "#7c3aed" },
              { sub: "PSLE English", level: "Primary", slots: "4 left", color: "#fff7ed", accent: "#ea580c" },
              { sub: "Sec Chemistry", level: "Secondary", slots: "2 left", color: "#f0f9ff", accent: "#0891b2" },
              { sub: "Sec Physics", level: "Secondary", slots: "5 left", color: "#fef2f2", accent: "#dc2626" },
            ].map(s => (
              <div key={s.sub} style={{
                background: s.color, borderRadius: "clamp(5px,0.7vw,10px)",
                padding: "clamp(5px,0.7vw,10px)",
                border: `1px solid ${s.accent}22`,
              }}>
                <div style={{ fontSize: "clamp(6px,0.78vw,10px)", fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{s.sub}</div>
                <div style={{ fontSize: "clamp(5px,0.6vw,8px)", color: "#64748b" }}>{s.level}</div>
                <div style={{
                  marginTop: "clamp(3px,0.4vw,5px)",
                  display: "inline-block",
                  background: s.accent, color: "white",
                  borderRadius: 10, padding: "1px 5px",
                  fontSize: "clamp(5px,0.58vw,7px)", fontWeight: 700,
                }}>{s.slots}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{
          background: "#f8fafc", borderTop: "1px solid #f1f5f9",
          padding: "clamp(8px,1.2vw,16px) clamp(10px,2vw,32px)",
          display: "flex", gap: "clamp(6px,0.8vw,12px)",
        }}>
          {[
            { name: "Mrs Tan", text: "My son went from C to A* in 3 months. Absolutely incredible." },
            { name: "Mr Rajan", text: "The tutors genuinely care. Best investment we made for PSLE." },
          ].map(t => (
            <div key={t.name} style={{
              flex: 1, background: "white",
              borderRadius: "clamp(6px,0.8vw,10px)",
              padding: "clamp(6px,0.8vw,10px)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#fbbf24", fontSize: "clamp(6px,0.75vw,10px)" }}>★</span>)}
              </div>
              <p style={{ fontSize: "clamp(6px,0.72vw,9px)", color: "#374151", lineHeight: 1.5, marginBottom: 4 }}>"{t.text}"</p>
              <span style={{ fontSize: "clamp(5px,0.65vw,8px)", color: "#94a3b8", fontWeight: 600 }}>— {t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating chat button */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "clamp(8px,1.2vw,16px)", right: "clamp(8px,1.2vw,16px)",
          width: "clamp(22px,3vw,40px)", height: "clamp(22px,3vw,40px)",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a56db, #1e40af)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(26,86,219,0.4)",
          zIndex: 15,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </motion.div>

      <ChatWidget />
    </div>
  );
}

export default function MacbookSection() {
  return (
    <section style={{ background: "#020810", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-2.5 mb-4"
          style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          <span style={{ width: 20, height: 1, background: "#3b7ef8", display: "inline-block" }} />
          Experience the Platform
          <span style={{ width: 20, height: 1, background: "#00f260", display: "inline-block" }} />
        </div>
        <h2 className="font-bold tracking-[-0.04em] leading-[1.08]"
          style={{ fontSize: "clamp(28px,4.5vw,56px)", color: "white" }}>
          See Stride in action.
        </h2>
       
      </motion.div>

      <motion.div
        className="mx-auto rounded-[20px] overflow-hidden"
        style={{
          maxWidth: "min(1100px, 94vw)",
          height: "clamp(500px, 70vh, 800px)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(59,126,248,0.1)",
          position: "relative",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <SchoolWebsite />
      </motion.div>
    </section>
  );
}