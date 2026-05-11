"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const painOptions = [
  "Missing leads across platforms",
  "Slow follow-up response time",
  "No visibility on lead quality",
  "Manual repetitive outreach",
  "Team coordination issues",
  "No system to track conversations",
  "Losing deals to faster competitors",
  "Too many tools, no single view",
];

export default function CTAForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
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

  const goTo = (i: number) => setStep(i);

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

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.065] rounded-[10px] px-4 py-3 text-[13.5px] font-normal text-[var(--text)] placeholder-[var(--t3)] focus:border-[rgba(59,126,248,0.5)] focus:bg-[rgba(59,126,248,0.04)] transition-all duration-200 outline-none appearance-none";

  return (
  <section id="cta" className="section-cta border-t border-white/[0.065]"
    style={{ background: "#060E24", padding: "clamp(60px,8vw,130px) clamp(20px,5vw,64px)" }}
  >
    <div className="max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[90px] items-center">

          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-4">
              <span className="w-5 h-px bg-[var(--blue)]" />
              Get Started
            </div>
            <h2 className="text-[clamp(32px,3.8vw,52px)] font-black leading-[1.08] tracking-[-0.04em] mb-4">
              Ready for
              <br />
              <span className="text-[var(--t2)] font-light">Stride?</span>
            </h2>
            <p className="text-[16px] text-[var(--t2)] max-w-[420px] leading-[1.78] mb-9">
              Answer 4 quick questions and we&apos;ll set up a personalised call — no generic demos, just exactly what your business needs.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                "2 minute survey — no fluff",
                "Personalised call based on your answers",
                "No credit card, no commitment",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[14px] text-[var(--t2)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-b)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Survey card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-[24px] p-9"
            style={{
              background: "rgba(255,255,255,0.022)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.065)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.38), 0 0 80px rgba(59,126,248,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Progress bar */}
            {!done && (
              <div className="flex gap-1.5 mb-7">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${i < step ? "bg-[#4ade80]" : i === step ? "bg-[var(--blue)]" : "bg-white/[0.07]"}`}
                  />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-5"
                >
                  <div className="w-[52px] h-[52px] bg-[var(--blue)] rounded-[16px] flex items-center justify-center mx-auto mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h4 className="text-[24px] font-black tracking-[-0.03em] mb-3">You&apos;re all set</h4>
                  <p className="text-[14px] text-[var(--t2)] leading-[1.7]">
                    We&apos;ve received your details and will be in touch within 24 hours to confirm your call. Keep an eye on your WhatsApp.
                  </p>
                </motion.div>
              ) : step === 0 ? (
                <motion.div key="s0" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-2.5">Step 1 of 4</div>
                  <h3 className="text-[21px] font-black tracking-[-0.03em] mb-5 leading-[1.28]">What&apos;s slowing your sales team down?</h3>
                  <div className="grid grid-cols-2 gap-1.5 mb-5">
                    {painOptions.map((p) => (
                      <button
                        key={p}
                        onClick={() => togglePain(p)}
                        className={`flex items-start gap-2 px-3 py-2.5 rounded-[10px] text-left text-[12px] border transition-all duration-200 leading-[1.4] ${pains.includes(p) ? "border-[rgba(59,126,248,0.35)] bg-[rgba(59,126,248,0.07)] text-[var(--text)]" : "border-white/[0.065] text-[var(--t2)] hover:border-white/[0.11] hover:text-[var(--text)]"}`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-[4px] border-[1.5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${pains.includes(p) ? "bg-[var(--blue)] border-[var(--blue)]" : "border-[var(--t3)]"}`}>
                          {pains.includes(p) && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </span>
                        {p}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => goTo(1)} className="w-full py-3.5 rounded-[11px] text-[14px] font-bold bg-[var(--blue)] text-white hover:bg-[#4d8ef9] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,126,248,0.35)]">
                    Next →
                  </button>
                </motion.div>
              ) : step === 1 ? (
                <motion.div key="s1" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-2.5">Step 2 of 4</div>
                  <h3 className="text-[21px] font-black tracking-[-0.03em] mb-5 leading-[1.28]">Tell us about your business.</h3>
                  <div className="mb-3">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">Industry</label>
                    <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputCls}>
                      <option value="">Select your industry</option>
                      {["Tuition & Education","Retail & E-commerce","Professional Services","Real Estate","F&B / Hospitality","Healthcare","B2B Services","Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">Team Size</label>
                    <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className={inputCls}>
                      <option value="">Select team size</option>
                      {["1–5 people","6–15 people","16–50 people","50+ people"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">Work Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={inputCls} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => goTo(0)} className="px-4 py-3.5 rounded-[11px] text-[14px] font-semibold bg-white/[0.05] text-[var(--t2)] border border-white/[0.065] hover:border-white/[0.11] hover:text-[var(--text)] transition-all duration-200">Back</button>
                    <button onClick={() => goTo(2)} className="flex-1 py-3.5 rounded-[11px] text-[14px] font-bold bg-[var(--blue)] text-white hover:bg-[#4d8ef9] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,126,248,0.35)]">Next →</button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="s2" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-2.5">Step 3 of 4</div>
                  <h3 className="text-[21px] font-black tracking-[-0.03em] mb-5 leading-[1.28]">How should we reach you?</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">Full Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">WhatsApp</label>
                      <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+65 XXXX XXXX" className={inputCls} />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--t2)] mb-1.5">Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" className={inputCls} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => goTo(1)} className="px-4 py-3.5 rounded-[11px] text-[14px] font-semibold bg-white/[0.05] text-[var(--t2)] border border-white/[0.065] hover:border-white/[0.11] hover:text-[var(--text)] transition-all duration-200">Back</button>
                    <button onClick={() => goTo(3)} className="flex-1 py-3.5 rounded-[11px] text-[14px] font-bold bg-[var(--blue)] text-white hover:bg-[#4d8ef9] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,126,248,0.35)]">Next →</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="s3" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-2.5">Step 4 of 4</div>
                  <h3 className="text-[21px] font-black tracking-[-0.03em] mb-4 leading-[1.28]">Pick a time that works for you.</h3>
                  <p className="text-[13.5px] text-[var(--t2)] mb-5 leading-[1.65]">We review your answers before the call so we can make it worth every minute of your time.</p>
                  <div className="bg-[rgba(59,126,248,0.07)] border border-[rgba(59,126,248,0.2)] rounded-[12px] p-4 mb-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[var(--blue)] flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold mb-0.5 tracking-[-0.01em]">30 min personalised walkthrough</div>
                      <div className="text-[12.5px] text-[var(--t2)]">We show you exactly how Stride works for your use case</div>
                    </div>
                  </div>
                  {error && <p className="text-[13px] text-[#f87171] mb-3">{error}</p>}
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full py-4 rounded-[11px] text-[15px] font-bold bg-[var(--blue)] text-white hover:bg-[#4d8ef9] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_12px_36px_rgba(59,126,248,0.4)] disabled:opacity-60 disabled:cursor-not-allowed mb-2"
                  >
                    {loading ? "Sending..." : "Schedule My Call →"}
                  </button>
                  <button onClick={() => goTo(2)} className="w-full py-2.5 rounded-[11px] text-[14px] font-semibold bg-white/[0.05] text-[var(--t2)] border border-white/[0.065] hover:border-white/[0.11] hover:text-[var(--text)] transition-all duration-200">Back</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
