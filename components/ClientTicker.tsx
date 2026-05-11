"use client";

import { motion } from "framer-motion";

const clients = [
  {
    name: "WhatsApp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Salesforce",
    icon: (
      <svg width="18" height="14" viewBox="0 0 54 38" fill="none">
        <path d="M22.5 4.5a8.5 8.5 0 0 1 6.1 2.6A11.5 11.5 0 0 1 36 5c6.4 0 11.5 5.2 11.5 11.5 0 .4 0 .8-.1 1.2A8 8 0 0 1 54 25a8 8 0 0 1-8 8H10a10 10 0 0 1-1.2-19.9A11 11 0 0 1 22.5 4.5z" fill="#00A1E0"/>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.27-1.978V3.04A2.199 2.199 0 0 0 17.238.84h-.067a2.199 2.199 0 0 0-2.196 2.199v.067a2.199 2.199 0 0 0 1.27 1.978v2.847a6.232 6.232 0 0 0-2.962 1.3L5.868 3.56a2.432 2.432 0 1 0-1.21 1.663l7.198 4.594a6.26 6.26 0 0 0-.948 3.32 6.26 6.26 0 0 0 .948 3.32L5.02 19.97a2.432 2.432 0 1 0 1.21 1.663l6.82-4.35a6.278 6.278 0 0 0 9.734-5.245 6.278 6.278 0 0 0-4.62-6.108z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Meta",
    icon: (
      <svg width="18" height="10" viewBox="0 0 60 32" fill="none">
        <path d="M5 27C5 29.2 6.3 31 8.5 31c1.8 0 2.8-.9 4.1-2.8L18 20l-5.8-9.4C10.9 8.5 9.6 8 8.5 8 6.3 8 5 9.8 5 12v15z" fill="url(#mg1)"/>
        <path d="M55 27V12c0-2.2-1.3-4-3.5-4-1.1 0-2.4.5-3.7 2.6L42 20l5.8 8.2c1.3 1.9 2.3 2.8 4.1 2.8C54 31 55 29.2 55 27z" fill="url(#mg2)"/>
        <path d="M30 13.5c-3 0-5.5 3-7.5 6.5 2 3.5 4.5 6.5 7.5 6.5s5.5-3 7.5-6.5c-2-3.5-4.5-6.5-7.5-6.5z" fill="url(#mg3)"/>
        <defs>
          <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#0081FB"/><stop offset="1" stopColor="#0064E1"/>
          </linearGradient>
          <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#0081FB"/><stop offset="1" stopColor="#0064E1"/>
          </linearGradient>
          <linearGradient id="mg3" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#0064E1"/><stop offset="1" stopColor="#0081FB"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Stripe",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    name: "Google Calendar",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    name: "Email",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const doubled = [...clients, ...clients];

export default function ClientTicker() {
  return (
    <motion.div
      className="section-ticker py-[clamp(40px,6vw,72px)] relative z-[2]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-center text-[11.5px] font-semibold tracking-[0.1em] uppercase text-[var(--t3)] mb-6">
        Integrates with your favourite tools
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020611] to-transparent z-[2] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020611] to-transparent z-[2] pointer-events-none" />

        <div className="flex w-max animate-scroll-left ticker-track">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-3 px-10 py-2.5 whitespace-nowrap text-[14px] font-semibold text-[var(--t2)] hover:text-[var(--text)] transition-colors duration-200 group">
                <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center bg-white/[0.028] border border-white/[0.065] flex-shrink-0 group-hover:border-white/[0.11] transition-colors duration-200">
                  {item.icon}
                </div>
                {item.name}
              </div>
              {i < doubled.length - 1 && (
                <span className="text-[var(--t3)] opacity-20 text-xl px-2 leading-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
