"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const painOptions = [
  "Missing leads across platforms",
  "Slow follow-up response time",
  "No visibility on lead quality",
  "Manual repetitive outreach",
  "Losing deals to faster competitors",
];

export default function CTAForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pains, setPains] = useState<string[]>([]);
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");

  const togglePain = (p: string) =>
    setPains((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pains, industry, teamSize, email, name, whatsapp, company }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "13px 16px",
    color: "white",
    fontSize: "clamp(13px,1.5vw,15px)",
    fontFamily: "inherit",
    outline: "none",
    appearance: "none" as const,
    minHeight: 50,
  };

  const primaryBtn: React.CSSProperties = {
    width: "100%",
    padding: "clamp(13px,1.8vw,16px)",
    borderRadius: 14,
    fontSize: "clamp(14px,1.6vw,16px)",
    fontWeight: 700,
    fontFamily: "inherit",
    border: "none",
    background: "linear-gradient(135deg, #3b7ef8, #00b849)",
    color: "white",
    minHeight: 52,
    boxShadow: "0 0 24px rgba(59,126,248,0.25), 0 0 48px rgba(0,184,73,0.1)",
    transition: "all 0.2s ease",
    cursor: "none",
  };

  const ghostBtn: React.CSSProperties = {
    padding: "clamp(11px,1.5vw,14px) 20px",
    borderRadius: 12,
    fontSize: "clamp(13px,1.4vw,14px)",
    fontWeight: 600,
    fontFamily: "inherit",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    minHeight: 48,
    transition: "all 0.2s ease",
    cursor: "none",
  };

  const eyebrow = (text: string) => (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 8,
      }}
    >
      {text}
    </div>
  );

  return (
    <section
      id="cta"
      style={{
        background: "#040B1E",
        padding: "clamp(60px,8vw,120px) clamp(16px,5vw,64px)",
      }}
    >
      <div className="max-w-[540px] mx-auto">

        {/* Header */}
<motion.div
  className="text-center mb-10"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  <div
    className="flex items-center justify-center gap-2.5 mb-4"
    style={{
      fontSize: "10.5px",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    <span style={{ width: 20, height: 1, background: "#3b7ef8", display: "inline-block", flexShrink: 0 }} />
    Get Started
    <span style={{ width: 20, height: 1, background: "#00f260", display: "inline-block", flexShrink: 0 }} />
  </div>
  <h2
    className="font-bold tracking-[-0.04em] leading-[1.08]"
    style={{ fontSize: "clamp(28px,4.5vw,52px)", color: "white" }}
  >
    Ready for Stride?
  </h2>
</motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            background: "rgba(8,13,30,0.85)",
            backdropFilter: "blur(32px)",
            borderRadius: 24,
            padding: "clamp(24px,4vw,40px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.5), 0 0 80px rgba(59,126,248,0.04)",
          }}
        >
          {/* Progress bar */}
          {!done && (
            <div className="flex gap-1.5 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-300"
                  style={{
                    height: 3,
                    background:
                      i < step
                        ? "linear-gradient(90deg, #3b7ef8, #00f260)"
                        : i === step
                        ? "#3b7ef8"
                        : "rgba(255,255,255,0.07)",
                  }}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {done ? (
              // ── SUCCESS ──
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-6"
              >
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, #3b7ef8, #00b849)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4
                  className="font-black tracking-[-0.03em] mb-3"
                  style={{ fontSize: "clamp(20px,3vw,26px)", color: "white" }}
                >
                  You&apos;re all set
                </h4>
                <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(180,188,210,0.55)", lineHeight: 1.7 }}>
                  We&apos;ve received your details and will be in touch within 24 hours. Keep an eye on your WhatsApp.
                </p>
              </motion.div>

            ) : step === 0 ? (
              // ── STEP 1: Pain points ──
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow("Step 1 of 4")}
                <h3
                  className="font-bold tracking-[-0.025em] leading-[1.25] mb-6"
                  style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "white" }}
                >
                  What&apos;s slowing your sales team down?
                </h3>
                <div className="flex flex-col gap-2 mb-7">
                  {painOptions.map((p) => (
                    <button
                      key={p}
                      onClick={() => togglePain(p)}
                      className="flex items-center gap-3 text-left rounded-[12px] transition-all duration-200"
                      style={{
                        padding: "12px 14px",
                        background: pains.includes(p)
                          ? "rgba(59,126,248,0.1)"
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${pains.includes(p) ? "rgba(59,126,248,0.35)" : "rgba(255,255,255,0.07)"}`,
                        fontSize: "clamp(13px,1.5vw,14.5px)",
                        color: pains.includes(p) ? "white" : "rgba(255,255,255,0.55)",
                        minHeight: 48,
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          background: pains.includes(p) ? "#3b7ef8" : "transparent",
                          border: `1.5px solid ${pains.includes(p) ? "#3b7ef8" : "rgba(255,255,255,0.2)"}`,
                        }}
                      >
                        {pains.includes(p) && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {p}
                    </button>
                  ))}
                </div>
                <button style={primaryBtn} onClick={() => setStep(1)}>
                  Next →
                </button>
              </motion.div>

            ) : step === 1 ? (
              // ── STEP 2: Industry + team size ──
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow("Step 2 of 4")}
                <h3
                  className="font-bold tracking-[-0.025em] leading-[1.25] mb-6"
                  style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "white" }}
                >
                  Tell us about your business.
                </h3>

                <div className="flex flex-col gap-4 mb-7">
                  <div>
                    <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                      Industry
                    </label>
                    <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={inputCls}>
                      <option value="">Select your industry</option>
                      {["Tuition & Education", "Retail & E-commerce", "Professional Services", "Real Estate", "F&B / Hospitality", "Healthcare", "B2B Services", "Other"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                      Team Size
                    </label>
                    <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} style={inputCls}>
                      <option value="">Select team size</option>
                      {["1–5 people", "6–15 people", "16–50 people", "50+ people"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button style={ghostBtn} onClick={() => setStep(0)}>Back</button>
                  <button style={{ ...primaryBtn, flex: 1 }} onClick={() => setStep(2)}>Next →</button>
                </div>
              </motion.div>

            ) : step === 2 ? (
              // ── STEP 3: Email ──
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow("Step 3 of 4")}
                <h3
                  className="font-bold tracking-[-0.025em] leading-[1.25] mb-2"
                  style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "white" }}
                >
                  What&apos;s your work email?
                </h3>
                <p className="mb-6" style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "rgba(180,188,210,0.45)", lineHeight: 1.65 }}>
                  We&apos;ll send your personalised call details here.
                </p>

                <div className="mb-7">
                  <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={inputCls}
                  />
                </div>

                <div className="flex gap-2">
                  <button style={ghostBtn} onClick={() => setStep(1)}>Back</button>
                  <button style={{ ...primaryBtn, flex: 1 }} onClick={() => setStep(3)}>Next →</button>
                </div>
              </motion.div>

            ) : (
              // ── STEP 4: Name, phone, company + submit ──
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow("Step 4 of 4")}
                <h3
                  className="font-bold tracking-[-0.025em] leading-[1.25] mb-2"
                  style={{ fontSize: "clamp(17px,2.2vw,22px)", color: "white" }}
                >
                  Last step — how do we reach you?
                </h3>
                <p className="mb-6" style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "rgba(180,188,210,0.45)", lineHeight: 1.65 }}>
                  We review your answers before the call so every minute counts.
                </p>

                <div className="flex flex-col gap-4 mb-7">
                  <div>
                    <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+65 XXXX XXXX"
                      style={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company"
                      style={inputCls}
                    />
                  </div>
                </div>

                {error && (
                  <p className="mb-4" style={{ fontSize: 13, color: "#f87171" }}>{error}</p>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    disabled={loading}
                    onClick={submit}
                    style={{
                      ...primaryBtn,
                      opacity: loading ? 0.6 : 1,
                    }}
                  >
                    {loading ? "Sending..." : "Schedule My Call →"}
                  </button>
                  <button style={ghostBtn} onClick={() => setStep(2)}>Back</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}