"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 60) {
        setVisible(true);
      } else if (current > lastScrollY.current) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    ["Product", "#features"],
    ["Journey", "#pipeline"],
    ["Pricing", "#pricing"],
    ["Company", "#cta"],
  ];

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nav-btn-primary {
          background: linear-gradient(135deg, #3b7ef8, #00c853, #3b7ef8, #00f260);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          box-shadow: 0 0 16px rgba(59,126,248,0.3), 0 0 32px rgba(0,242,96,0.1);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          color: white;
        }
        .nav-btn-primary:hover {
          box-shadow: 0 0 24px rgba(59,126,248,0.5), 0 0 48px rgba(0,242,96,0.2);
          transform: translateY(-1px);
        }
        .mobile-menu-link {
          display: block;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(180,188,210,0.85);
          text-decoration: none;
          transition: all 0.2s;
        }
        .mobile-menu-link:hover {
          color: white;
          background: rgba(255,255,255,0.06);
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[500] px-3 pt-3 md:px-5 md:pt-4"
          >
            {/* Main pill */}
            <div
              className="mx-auto"
              style={{ maxWidth: 1160 }}
            >
              <div
                className="flex items-center h-[52px] md:h-[56px] px-4 md:px-6 rounded-[16px]"
                style={{
                  background: "rgba(8,15,32,0.85)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Logo */}
                <a href="#" className="flex-shrink-0 mr-6 md:mr-8">
                  <Image
                    src="/images/strideLogoDark.png"
                    alt="Stride"
                    width={110}
                    height={30}
                    style={{
                      width: "auto",
                      height: "28px",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                    priority
                    unoptimized
                  />
                </a>

                {/* Desktop nav links */}
                <ul className="hidden md:flex items-center list-none flex-1 justify-center gap-1">
                  {navLinks.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="px-3.5 py-2 rounded-[8px] text-[13.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-all duration-200"
                        style={{ color: "rgba(180,188,210,0.85)" }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = "white";
                          el.style.background = "rgba(255,255,255,0.06)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = "rgba(180,188,210,0.85)";
                          el.style.background = "transparent";
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0">
                  <a
                    href="#cta"
                    className="text-[13.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 px-2"
                    style={{ color: "rgba(180,188,210,0.85)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(180,188,210,0.85)"; }}
                  >
                    Log in
                  </a>
                  <a
                    href="#cta"
                    className="nav-btn-primary px-4 py-2 rounded-[10px] text-[13.5px] font-semibold tracking-[-0.01em] whitespace-nowrap"
                  >
                    Get Demo
                  </a>
                </div>

                {/* Mobile right side */}
                <div className="flex md:hidden items-center gap-2 ml-auto flex-shrink-0">
                  <a
                    href="#cta"
                    className="nav-btn-primary px-3.5 py-1.5 rounded-[9px] text-[13px] font-semibold"
                  >
                    Get Demo
                  </a>
                  {/* Hamburger */}
                  <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-[8px] transition-all duration-200"
                    style={{
                      background: mobileOpen ? "rgba(59,126,248,0.12)" : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    aria-label="Toggle menu"
                  >
                    <motion.span
                      className="block w-4 h-px rounded-full bg-white"
                      animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="block w-4 h-px rounded-full bg-white"
                      animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="block w-4 h-px rounded-full bg-white"
                      animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </div>

              {/* Mobile dropdown menu */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2 p-3 rounded-[16px]"
                    style={{
                      background: "rgba(8,15,32,0.95)",
                      backdropFilter: "blur(28px)",
                      WebkitBackdropFilter: "blur(28px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Nav links */}
                    <div className="flex flex-col gap-1 mb-3">
                      {navLinks.map(([label, href]) => (
                        <a
                          key={label}
                          href={href}
                          className="mobile-menu-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {label}
                        </a>
                      ))}
                    </div>

                    {/* Divider */}
                    <div
                      className="mb-3"
                      style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
                    />

                    {/* CTA buttons */}
                    <div className="flex flex-col gap-2">
                      <a
                        href="#cta"
                        className="block text-center py-3 rounded-[10px] text-[14px] font-medium transition-all duration-200"
                        style={{ color: "rgba(180,188,210,0.85)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        Log in
                      </a>
                      <a
                        href="#cta"
                        className="nav-btn-primary block text-center py-3 rounded-[10px] text-[14px] font-semibold"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get Demo
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}