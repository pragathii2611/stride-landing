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
    btnLabel: "Get Started",
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
    btnLabel: "Start Free Trial",
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
    btnLabel: "Contact Sales",
    btnStyle: "ghost",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
  id="pricing"
  className="dot-grid"
  style={{
    padding: "clamp(60px,8vw,120px) clamp(16px,5vw,64px)",
  }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2
            className="font-bold tracking-[-0.04em] leading-[1.08] mb-8"
            style={{ fontSize: "clamp(32px,5vw,60px)", color: "white" }}
          >
            Transparent Pricing
          </h2>

          {/* Toggle — pill style like screenshot */}
          <div className="inline-flex items-center gap-3">
            <span
              className="font-medium"
              style={{ fontSize: 15, color: annual ? "rgba(255,255,255,0.4)" : "white" }}
            >
              Monthly
            </span>

            {/* Toggle switch */}
            <button
              onClick={() => setAnnual((a) => !a)}
              className="relative rounded-full transition-all duration-300 flex-shrink-0"
              style={{
                width: 52,
                height: 28,
                background: annual
                  ? "linear-gradient(135deg, #00b849, #00f260)"
                  : "rgba(255,255,255,0.12)",
                boxShadow: annual ? "0 0 16px rgba(0,242,96,0.4)" : "none",
              }}
            >
              <motion.div
                className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white"
                animate={{ left: annual ? 27 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span
                className="font-medium"
                style={{ fontSize: 15, color: annual ? "white" : "rgba(255,255,255,0.4)" }}
              >
                Annual
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(0,242,96,0.15)",
                  color: "#00f260",
                  boxShadow: "0 0 0 1px rgba(0,242,96,0.2)",
                }}
              >
                -20%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="relative rounded-[20px] overflow-visible"
              style={{
                marginTop: plan.featured ? 0 : 0,
              }}
            >
              {/* Most popular badge — sits on top edge */}
              {plan.featured && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <div
                    className="px-5 py-1.5 rounded-full text-[11px] font-black tracking-[0.08em] uppercase"
                    style={{
                      background: "linear-gradient(135deg, #00b849, #00f260)",
                      color: "white",
                      boxShadow: "0 0 20px rgba(0,242,96,0.4)",
                    }}
                  >
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className="rounded-[20px] p-7 flex flex-col h-full"
                style={{
                  background: plan.featured
                    ? "rgba(10,18,36,0.95)"
                    : "rgba(8,13,30,0.8)",
                  boxShadow: plan.featured
                    ? "0 0 0 1.5px #00f26044, 0 0 0 1px #00b84922, 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,242,96,0.08)"
                    : "0 0 0 1px rgba(255,255,255,0.07), 0 20px 48px rgba(0,0,0,0.4)",
                  paddingTop: plan.featured ? "2.5rem" : "1.75rem",
                }}
              >
                {/* Plan name */}
                <div
                  className="font-bold tracking-[-0.02em] mb-1"
                  style={{ fontSize: "clamp(18px,2vw,22px)", color: "white" }}
                >
                  {plan.name}
                </div>

                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? "a" : "m"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="mb-5 mt-3"
                  >
                    {plan.annualPrice !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span
                          className="font-black tracking-[-0.04em]"
                          style={{ fontSize: "clamp(42px,5vw,58px)", color: "white" }}
                        >
                          S${annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                          /mo
                        </span>
                      </div>
                    ) : (
                      <div
                        className="font-black tracking-[-0.04em]"
                        style={{ fontSize: "clamp(36px,4.5vw,52px)", color: "white" }}
                      >
                        Custom
                      </div>
                    )}
                    {plan.annualTotal && annual && (
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
                        Billed annually · S${plan.annualTotal}/yr
                      </div>
                    )}
                    {!annual && plan.annualPrice !== null && (
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
                        Billed monthly
                      </div>
                    )}
                    {plan.annualPrice === null && (
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
                        Tailored to your business
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Divider */}
                <div
                  className="mb-5"
                  style={{
                    height: 1,
                    background: plan.featured
                      ? "rgba(0,242,96,0.15)"
                      : "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={plan.featured ? "#00f260" : "#3b7ef8"}
                        strokeWidth="2.5"
                        style={{ flexShrink: 0, marginTop: 1 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "rgba(255,255,255,0.65)" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className="w-full rounded-[12px] font-bold transition-all duration-200"
                  style={{
                    padding: "clamp(12px,1.5vw,15px)",
                    fontSize: "clamp(13px,1.4vw,15px)",
                    minHeight: 50,
                    ...(plan.btnStyle === "solid"
                      ? {
                          background: "linear-gradient(135deg, #00b849, #00f260)",
                          color: "white",
                          boxShadow: "0 0 24px rgba(0,242,96,0.35), 0 8px 24px rgba(0,0,0,0.2)",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.7)",
                          boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
                        }),
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (plan.btnStyle === "solid") {
                      el.style.boxShadow = "0 0 32px rgba(0,242,96,0.5), 0 8px 32px rgba(0,0,0,0.3)";
                      el.style.transform = "translateY(-1px)";
                    } else {
                      el.style.background = "rgba(255,255,255,0.08)";
                      el.style.color = "white";
                      el.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    if (plan.btnStyle === "solid") {
                      el.style.boxShadow = "0 0 24px rgba(0,242,96,0.35), 0 8px 24px rgba(0,0,0,0.2)";
                    } else {
                      el.style.background = "rgba(255,255,255,0.05)";
                      el.style.color = "rgba(255,255,255,0.7)";
                    }
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {plan.btnLabel}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}