"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "Stride completely changed how we handle WhatsApp leads. We used to lose at least 10 enquiries a week — not anymore.", name: "Sarah Chen", role: "Marketing Director · TechFlow SG", initials: "SC", color: "from-[#3b7ef8] to-[#1d55c4]" },
  { quote: "The AI follow-ups feel so natural our clients don't even realise it's automated. That's the magic of Stride.", name: "James Lim", role: "Founder · GrowthLabs", initials: "JL", color: "from-[#059669] to-[#065f46]" },
  { quote: "Setup took less than a day. Within a week our response time went from hours to seconds. The team loves it.", name: "Priya Kumar", role: "Sales Lead · NovaBridge", initials: "PK", color: "from-[#d97706] to-[#92400e]" },
  { quote: "Finally a CRM that understands what our leads are actually saying — not just when they last emailed us.", name: "David Tan", role: "CEO · PeakScale", initials: "DT", color: "from-[#0891b2] to-[#0e7490]" },
  { quote: "The lead scoring alone saved us from chasing the wrong people. Game changer for a small team like ours.", name: "Rachel Wong", role: "Head of Sales · Luminary Co.", initials: "RW", color: "from-[#7c3aed] to-[#5b21b6]" },
  { quote: "We tried HubSpot, Zoho, everything. Stride is the first one our team actually uses every single day.", name: "Marcus Ng", role: "Operations · SwiftServe", initials: "MN", color: "from-[#be185d] to-[#9d174d]" },
];

const doubled = [...testimonials, ...testimonials];

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[11px] h-[11px] bg-[var(--blue-b)] rounded-[2px]"
          style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-testi py-[clamp(80px,10vw,130px)] overflow-hidden border-t border-white/[0.065]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-[clamp(20px,4vw,64px)] mb-13"
        style={{ marginBottom: "3.25rem" }}
      >
        <div className="flex items-center justify-center gap-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase text-[var(--blue-b)] mb-4">
          <span className="w-5 h-px bg-[var(--blue)]" />
          Customer Stories
          <span className="w-5 h-px bg-[var(--blue)]" />
        </div>
        <h2 className="text-[clamp(32px,3.8vw,52px)] font-black leading-[1.08] tracking-[-0.04em]">
          Businesses that trust Stride.
        </h2>
      </motion.div>

      {/* Scrolling track */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[#020611] to-transparent z-[2] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[#020611] to-transparent z-[2] pointer-events-none" />

        <div className="flex w-max gap-4 py-2 animate-scroll-left-slow hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.11)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-[310px] flex-shrink-0 bg-white/[0.022] border border-white/[0.065] rounded-[18px] p-6"
              style={{ backdropFilter: "blur(20px)" }}
            >
              <StarRow />
              <p className="text-[13.5px] text-[var(--t2)] leading-[1.72] mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className={`w-[34px] h-[34px] rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-[11px] font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-bold tracking-[-0.01em]">{t.name}</div>
                  <div className="text-[11px] text-[var(--t2)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
