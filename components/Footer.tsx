import Image from "next/image";

const links = {
  Product: [
    ["Features", "#features"],
    ["Pricing", "#pricing"],
    ["How It Works", "#pipeline"],
  ],
  Legal: [
    ["Privacy Policy", "#"],
    ["Terms of Service", "#"],
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.065] px-[clamp(20px,4vw,64px)] pt-[clamp(48px,6vw,80px)] pb-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Image
                src="/images/stride-logo.png"
                alt="Stride"
                width={100}
                height={28}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[13px] text-[var(--t2)] leading-[1.7] max-w-[200px]">
              Built for businesses across Singapore and APAC. Your AI team is ready.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <div className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[var(--t2)] mb-4">
                {col}
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[13.5px] text-[var(--t2)] hover:text-[var(--text)] transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <div className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[var(--t2)] mb-4">
              Connect
            </div>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-[36px] h-[36px] rounded-[9px] bg-white/[0.028] border border-white/[0.065] flex items-center justify-center text-[var(--t2)] hover:border-white/[0.11] hover:text-[var(--text)] hover:bg-white/[0.07] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.065] pt-6 flex items-center justify-between flex-wrap gap-3">
          <span className="text-[12px] text-[var(--t3)]">
            © 2026 AceAI Pte Ltd · UEN: 202548336W · contact@aceai.sg
          </span>
          <span className="text-[12px] text-[var(--t3)]">Official Meta Tech Provider</span>
        </div>
      </div>
    </footer>
  );
}
