"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter", tag: "For small teams getting started",
    monthlyPrice: 61, annualPrice: 49, annualTotal: 588,
    features: ["1 admin seat", "Unified inbox (WhatsApp + Email)", "AI lead scoring", "Knowledge base (10 docs)", "Live agent handoff", "Basic analytics"],
    featured: false, btnLabel: "Get Stride", btnStyle: "ghost",
  },
  {
    name: "Pro", tag: "For growing teams that need more",
    monthlyPrice: 124, annualPrice: 99, annualTotal: 1188,
    features: ["Up to 5 staff seats", "All channels + LinkedIn", "Advanced AI lead scoring", "Unlimited knowledge base", "Campaign outreach", "Full analytics dashboard", "AI calendar scheduling", "Priority support"],
    featured: true, btnLabel: "Get Stride", btnStyle: "solid",
  },
  {
    name: "Enterprise", tag: "For large teams with custom needs",
    monthlyPrice: null, annualPrice: null, annualTotal: null,
    features: ["Unlimited seats", "CRM + ERP combined", "Custom AI agents", "Dedicated onboarding", "SLA guarantee", "White-label options"],
    featured: false, btnLabel: "Contact Us", btnStyle: "ghost",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="section-pricing border-t border-white/[0.065]"
      style={{ background: "#020611", padding: "clamp(60px,8vw,130px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase mb-4"
            style={{ backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            <span className="w-5 h-px bg-[#3b7ef8]" />Pricing<span className="w-5 h-px bg-[#3b7ef8]" />
          </div>
          <h2 className="font-black leading-[1.08] tracking-[-0.04em] mb-3"
            style={{ fontSize: "clamp(26px,3.5vw,50px)" }}
          >
            Simple, transparent pricing.
            <br />
            <span style={{ color: "var(--t2)", fontWeight: 300 }}>No surprises.</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center mt-5 rounded-[11px] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.065)" }}
          >
            {["Monthly", "Annual"].map((label) => {
              const isAnnual = label === "Annual";
              const isActive = annual === isAnnual;
              return (
                <button key={label} onClick={() => setAnnual(isAnnual)}
                  className="flex items-center gap-1.5 font-semibold transition-all duration-200"
                  style={{
                    padding: "10px 20px",
                    fontSize: "clamp(12px,1.5vw,13px)",
                    background: isActive ? "var(--blue)" : "transparent",
                    color: isActive ? "white" : "var(--t2)",
                    minHeight: 44,
                  }}
                >
                  {label}
                  {isAnnual && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
                    >
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-[22px] p-6 sm:p-8 border overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.022)",
                backdropFilter: "blur(24px)",
                borderColor: plan.featured ? "rgba(59,126,248,0.3)" : "rgba(255,255,255,0.065)",
              }}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #3b7ef8, #00f260, transparent)" }}
                />
              )}
              <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(59,126,248,0.07), transparent 60%)" }}
              />

              {plan.featured && (
                <div className="inline-block text-white text-[9.5px] font-bold tracking-[0.09em] uppercase px-3 py-1 rounded-full mb-4"
                  style={{ background: "var(--blue)" }}
                >
                  Most Popular
                </div>
              )}

              <div className="font-black tracking-[-0.025em] mb-1" style={{ fontSize: "clamp(17px,2vw,20px)" }}>{plan.name}</div>
              <div className="mb-5" style={{ fontSize: "clamp(12px,1.4vw,13px)", color: "var(--t2)" }}>{plan.tag}</div>

              <AnimatePresence mode="wait">
                <motion.div key={annual ? "a" : "m"}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {plan.annualPrice !== null ? (
                    <>
                      <div className="font-black leading-[1] tracking-[-0.05em]" style={{ fontSize: "clamp(36px,5vw,50px)" }}>
                        <span className="font-light" style={{ fontSize: "clamp(18px,2.5vw,26px)", color: "var(--t2)" }}>S$</span>
                        {annual ? plan.annualPrice : plan.monthlyPrice}
                      </div>
                      <div className="mt-1.5 mb-5" style={{ fontSize: "12px", color: "var(--t3)" }}>
                        {annual ? `Billed annually · S$${plan.annualTotal}/year` : "Billed monthly"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-black leading-[1] tracking-[-0.025em]" style={{ fontSize: "clamp(28px,4vw,38px)" }}>Custom</div>
                      <div className="mt-1.5 mb-5" style={{ fontSize: "12px", color: "var(--t3)" }}>Tailored to your business</div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mb-5" style={{ height: "1px", background: "rgba(255,255,255,0.065)" }} />

              <ul className="mb-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5" style={{ fontSize: "clamp(12px,1.4vw,13.5px)", color: "var(--t2)" }}>
                    <span style={{ color: "var(--blue-b)", flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full rounded-[11px] font-bold transition-all duration-200"
                style={{
                  padding: "clamp(11px,1.5vw,14px)",
                  fontSize: "clamp(13px,1.5vw,14px)",
                  minHeight: 48,
                  background: plan.btnStyle === "solid" ? "linear-gradient(135deg, #3b7ef8, #00b849)" : "rgba(255,255,255,0.05)",
                  color: plan.btnStyle === "solid" ? "white" : "var(--t2)",
                  border: plan.btnStyle === "solid" ? "none" : "1px solid rgba(255,255,255,0.065)",
                  boxShadow: plan.btnStyle === "solid" ? "0 0 20px rgba(59,126,248,0.2)" : "none",
                }}
              >
                {plan.btnLabel}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}