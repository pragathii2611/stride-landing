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
      <svg width="20" height="14" viewBox="0 0 60 40" fill="none">
        <path d="M25 5a12 12 0 0 1 8.5 3.5A16 16 0 0 1 44 6c9 0 16 7 16 16s-7 16-16 16H10A14 14 0 0 1 10 10a14 14 0 0 1 4.5.75A12 12 0 0 1 25 5z" fill="#00A1E0"/>
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
      <svg width="20" height="12" viewBox="0 0 60 32" fill="none">
        <path d="M5 27C5 29.2 6.3 31 8.5 31c1.8 0 2.8-.9 4.1-2.8L18 20l-5.8-9.4C10.9 8.5 9.6 8 8.5 8 6.3 8 5 9.8 5 12v15z" fill="#0081FB"/>
        <path d="M55 27V12c0-2.2-1.3-4-3.5-4-1.1 0-2.4.5-3.7 2.6L42 20l5.8 8.2c1.3 1.9 2.3 2.8 4.1 2.8C54 31 55 29.2 55 27z" fill="#0081FB"/>
        <path d="M30 13.5c-3 0-5.5 3-7.5 6.5 2 3.5 4.5 6.5 7.5 6.5s5.5-3 7.5-6.5c-2-3.5-4.5-6.5-7.5-6.5z" fill="#0081FB"/>
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
    name: "Gmail",
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
      className="py-[clamp(40px,6vw,72px)] relative z-[2]"
      style={{ background: "#040B1E" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-center text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        Integrates with your favourite tools
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(90deg, #040B1E, transparent)" }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #040B1E, transparent)" }}
        />
        <div className="flex w-max animate-scroll-left ticker-track">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-3 px-8 py-2.5 whitespace-nowrap text-[14px] font-medium group transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                >
                  {item.icon}
                </div>
                <span className="group-hover:text-white transition-colors duration-200">{item.name}</span>
              </div>
              {i < doubled.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.08)", fontSize: 20, padding: "0 4px", lineHeight: 1 }}>·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}