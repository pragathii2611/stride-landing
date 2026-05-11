"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "1", label: "Consultation", title: "We figure out where your bottlenecks are.", desc: "No generic pitch. We dig into your actual workflow, channels, and pain points — so we know exactly where Stride can make the biggest difference for your business." },
  { num: "2", label: "Custom Demo", title: "More than a demo — a solution mapped to you.", desc: "We show you how our modular system can best fix your specific problems. You'll see exactly how Stride would work for your team — not a generic walkthrough." },
  { num: "3", label: "Onboarding", title: "We set everything up. You just show up.", desc: "We know onboarding is tedious and technical. So we handle it. Our team sets up and onboards you end-to-end — channels, knowledge base, agents, everything." },
  { num: "4", label: "Improve", title: "Watch your business transform. Within a month.", desc: "Faster response times, more leads captured, fewer deals dropped. The impact shows quickly — usually within the first 30 days of going live with Stride." },
  { num: "5", label: "Community", title: "Build the future of Stride with us.", desc: "Be part of our founding community who will shape what Stride becomes. Your feedback, ideas, and voice — heard directly by our team." },
];

export default function JourneySteps() {
  return (
    <section className="section-journey w-full"
      style={{ padding: "clamp(60px,8vw,130px) clamp(20px,5vw,64px)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase mb-4"
            style={{ backgroundImage: "linear-gradient(135deg, #5b9aff, #00f260)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            <span className="w-5 h-px bg-[#3b7ef8] flex-shrink-0" />
            Your Journey With Us
          </div>
          <h2 className="font-black leading-[1.08] tracking-[-0.04em]"
            style={{ fontSize: "clamp(28px,4vw,52px)" }}
          >
            From first call
            <br />
            <span style={{ color: "var(--t2)", fontWeight: 300 }}>to lasting impact.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line — hidden on mobile */}
          <div className="absolute left-[26px] top-0 bottom-0 w-px hidden sm:block"
            style={{ background: "linear-gradient(180deg, transparent, rgba(59,126,248,0.35) 15%, rgba(59,126,248,0.35) 85%, transparent)" }}
          />

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className={`flex gap-4 sm:gap-8 py-7 sm:py-9 ${i < steps.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center justify-center font-black relative z-[2]"
                    style={{
                      width: "clamp(44px,6vw,54px)",
                      height: "clamp(44px,6vw,54px)",
                      borderRadius: "50%",
                      background: "linear-gradient(#020611, #020611) padding-box, linear-gradient(135deg, #3b7ef8, #00f260) border-box",
                      border: "1px solid transparent",
                      color: i % 2 === 0 ? "#5b9aff" : "#00f260",
                      fontSize: "clamp(15px,2vw,18px)",
                    }}
                  >
                    {step.num}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1 sm:pt-2.5">
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
                    style={{ color: i % 2 === 0 ? "#5b9aff" : "#00f260" }}
                  >
                    {step.label}
                  </div>
                  <h3 className="font-black tracking-[-0.03em] mb-2.5 leading-[1.2]"
                    style={{ fontSize: "clamp(17px,2.2vw,28px)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="leading-[1.78] font-normal max-w-[520px]"
                    style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "var(--t2)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}