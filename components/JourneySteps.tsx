"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    label: "Consultation",
    title: "We figure out where your bottlenecks are.",
    desc: "No generic pitch. We dig into your actual workflow, channels, and pain points — so we know exactly where Stride can make the biggest difference for your business.",
  },
  {
    num: "2",
    label: "Custom Demo",
    title: "More than a demo — a solution mapped to you.",
    desc: "We show you how our modular system can best fix your specific problems, based on your pain points. You'll see exactly how Stride would work for your team — not a generic walkthrough.",
  },
  {
    num: "3",
    label: "Onboarding",
    title: "We set everything up. You just show up.",
    desc: "We know onboarding is tedious and technical. So we handle it. Our team sets up and onboards you end-to-end — channels, knowledge base, agents, everything.",
  },
  {
    num: "4",
    label: "Improve",
    title: "Watch your business transform. See results within a month.",
    desc: "Faster response times, more leads captured, fewer deals dropped. The impact shows quickly — usually within the first 30 days of going live with Stride.",
  },
  {
    num: "5",
    label: "Community",
    title: "Build the future of Stride with us.",
    desc: "Be part of our founding community who will shape what Stride becomes. Your feedback, ideas, and voice — heard directly by our team. Experience the platform's roadmap before anyone else.",
  },
];

export default function JourneySteps() {
  return (
    <section className="section-journey max-w-[1100px] mx-auto px-[clamp(20px,4vw,64px)] py-[clamp(80px,10vw,130px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <div className="flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-4">
          <span className="w-5 h-px bg-[var(--blue)]" />
          Your Journey With Us
        </div>
        <h2 className="text-[clamp(32px,3.8vw,52px)] font-black leading-[1.08] tracking-[-0.04em] mb-4">
          From first call
          <br />
          <span className="text-[var(--t2)] font-light">to lasting impact.</span>
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(59,126,248,0.35)] to-transparent pointer-events-none" />

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className={`flex gap-8 py-9 ${i < steps.length - 1 ? "border-b border-white/[0.04]" : ""}`}
            >
              {/* Number circle */}
              <div className="flex-shrink-0 w-[54px] flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: "0 0 32px rgba(59,126,248,0.35)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-[54px] h-[54px] rounded-full bg-[rgba(59,126,248,0.1)] border border-[rgba(59,126,248,0.25)] flex items-center justify-center text-[18px] font-black text-[var(--blue-b)] relative z-[2] flex-shrink-0"
                >
                  {step.num}
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2.5">
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-2">
                  {step.label}
                </div>
                <h3 className="text-[clamp(20px,2.2vw,28px)] font-black tracking-[-0.03em] mb-2.5 leading-[1.18]">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[var(--t2)] leading-[1.8] max-w-[520px] font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
