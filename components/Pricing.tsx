"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter",
    tag: "For small teams getting started",
    monthlyPrice: 61,
    annualPrice: 49,
    annualTotal: 588,
    features: [
      "1 admin seat",
      "Unified inbox (WhatsApp + Email)",
      "AI lead scoring",
      "Knowledge base (10 docs)",
      "Live agent handoff",
      "Basic analytics",
    ],
    featured: false,
    btnLabel: "Get Stride",
    btnStyle: "ghost",
  },
  {
    name: "Pro",
    tag: "For growing teams that need more",
    monthlyPrice: 124,
    annualPrice: 99,
    annualTotal: 1188,
    features: [
      "Up to 5 staff seats",
      "All channels + LinkedIn",
      "Advanced AI lead scoring",
      "Unlimited knowledge base",
      "Campaign outreach",
      "Full analytics dashboard",
      "AI calendar scheduling",
      "Priority support",
    ],
    featured: true,
    btnLabel: "Get Stride",
    btnStyle: "solid",
  },
  {
    name: "Enterprise",
    tag: "For large teams with custom needs",
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    features: [
      "Unlimited seats",
      "CRM + ERP combined",
      "Custom AI agents",
      "Dedicated onboarding",
      "SLA guarantee",
      "White-label options",
    ],
    featured: false,
    btnLabel: "Contact Us",
    btnStyle: "ghost",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="section-pricing bg-[#020611] border-t border-white/[0.065]">
      <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,64px)] py-[clamp(80px,10vw,130px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-4">
            <span className="w-5 h-px bg-[var(--blue)]" />
            Pricing
            <span className="w-5 h-px bg-[var(--blue)]" />
          </div>
          <h2 className="text-[clamp(30px,3.5vw,50px)] font-black leading-[1.08] tracking-[-0.04em] mb-3">
            Simple, transparent pricing.
            <br />
            <span className="text-[var(--t2)] font-light">No surprises.</span>
          </h2>

          {/* Billing toggle */}
          <div className="inline-flex items-center mt-6 bg-white/[0.04] border border-white/[0.065] rounded-[11px] overflow-hidden">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 text-[13px] font-semibold transition-all duration-200 ${!annual ? "bg-[var(--blue)] text-white" : "text-[var(--t2)] hover:text-[var(--text)]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${annual ? "bg-[var(--blue)] text-white" : "text-[var(--t2)] hover:text-[var(--text)]"}`}
            >
              Annual{" "}
              <span className="bg-[rgba(74,222,128,0.12)] text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-full">
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-[22px] p-8 border overflow-hidden transition-all duration-300 group ${
                plan.featured
                  ? "border-[rgba(59,126,248,0.3)] bg-white/[0.025]"
                  : "border-white/[0.065] bg-white/[0.022] hover:border-white/[0.11]"
              }`}
              style={{ backdropFilter: "blur(24px)" }}
            >
              {/* Featured top line */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent" />
              )}

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(59,126,248,0.07), transparent 60%)" }}
              />

              {plan.featured && (
                <div className="inline-block bg-[var(--blue)] text-white text-[9.5px] font-bold tracking-[0.09em] uppercase px-3 py-1 rounded-full mb-5">
                  Most Popular
                </div>
              )}

              <div className="text-[20px] font-black tracking-[-0.025em] mb-1">{plan.name}</div>
              <div className="text-[13px] text-[var(--t2)] mb-5">{plan.tag}</div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? "a" : "m"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {plan.annualPrice !== null ? (
                    <>
                      <div className="text-[50px] font-black leading-[1] tracking-[-0.05em]">
                        <span className="text-[26px] font-light text-[var(--t2)]">S$</span>
                        {annual ? plan.annualPrice : plan.monthlyPrice}
                      </div>
                      <div className="text-[12px] text-[var(--t3)] mt-1.5 mb-6">
                        {annual
                          ? `Billed annually · S$${plan.annualTotal}/year`
                          : "Billed monthly"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[38px] font-black leading-[1] tracking-[-0.025em]">Custom</div>
                      <div className="text-[12px] text-[var(--t3)] mt-1.5 mb-6">Tailored to your business</div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="h-px bg-white/[0.065] mb-6" />

              <ul className="space-y-1.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[var(--t2)]">
                    <span className="text-[var(--blue-b)] flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-[11px] text-[14px] font-bold transition-all duration-200 ${
                  plan.btnStyle === "solid"
                    ? "bg-[var(--blue)] text-white hover:bg-[#4d8ef9] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(59,126,248,0.35)]"
                    : "bg-white/[0.05] text-[var(--t2)] border border-white/[0.065] hover:border-white/[0.11] hover:text-[var(--text)]"
                }`}
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
