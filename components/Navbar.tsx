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

   const onMouseMove = (e: MouseEvent) => {
  // Show navbar on any cursor movement anywhere on screen
  setVisible(true);
};

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]?.clientY < 80) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn-primary:hover {
          box-shadow: 0 0 24px rgba(59,126,248,0.5), 0 0 48px rgba(0,242,96,0.2);
          transform: translateY(-1px);
        }
        .nav-link {
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(180,188,210,0.85);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: white;
          background: rgba(255,255,255,0.07);
        }
        .mobile-link {
          display: block;
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(180,188,210,0.85);
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
        }
        .mobile-link:hover, .mobile-link:active {
          color: white;
          background: rgba(255,255,255,0.06);
        }
      `}</style>

      <motion.div
  className="fixed top-0 left-0 right-0 z-[500]"
  style={{ padding: "14px clamp(12px,3vw,24px) 0" }}
  animate={{
    y: visible ? 0 : -120,
    opacity: visible ? 1 : 0,
  }}
  transition={{
    y: { duration: visible ? 0.35 : 0.3, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: visible ? 0.12 : 0.2, ease: "linear" },
  }}
>
            <div className="mx-auto" style={{ maxWidth: 1180 }}>

              {/* ── MAIN PILL ── */}
              <div
                className="flex items-center relative overflow-hidden"
                style={{
                  height: "clamp(58px,7vw,68px)",
                  padding: "0 clamp(16px,3vw,28px)",
                  borderRadius: "24px",
                  background: "rgba(8,15,32,0.72)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.45), 0 0 80px rgba(59,126,248,0.08), 0 0 160px rgba(0,242,96,0.04)",
                }}
              >
                {/* ── AURORA ── */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    width: "60%", height: "100%",
                    top: 0, left: "-10%",
                    background: "radial-gradient(ellipse at 50% -20%, rgba(59,126,248,0.18) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                  animate={{ x: [0, 30, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    width: "50%", height: "100%",
                    top: 0, right: "-5%",
                    background: "radial-gradient(ellipse at 50% -20%, rgba(0,242,96,0.1) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                  animate={{ x: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Logo */}
                
                <a
                  href="#"
                  className="flex-shrink-0 relative z-10"
                  style={{ marginRight: "clamp(20px,4vw,40px)" }}
                >
                  <img
                    src="/images/strideLogoDark.png"
                    alt="Stride"
                    style={{
                      width: "auto",
                      height: "clamp(28px,4vw,36px)",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </a>

                {/* Desktop nav links */}
                <ul
                  className="hidden md:flex items-center list-none flex-1 justify-center relative z-10"
                  style={{ gap: "4px" }}
                >
                  {navLinks.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="nav-link">{label}</a>
                    </li>
                  ))}
                </ul>
                {/* Desktop right */}
                <div className="hidden md:flex items-center flex-shrink-0 relative z-10" style={{ gap: "12px", marginLeft: "auto" }}>
                  <a href="#cta" className="nav-link" style={{ color: "rgba(180,188,210,0.85)" }}>
                    Log in
                  </a>
                  
                  <a
                    href="#cta"
                    className="nav-btn-primary"
                    style={{
                      padding: "10px 22px",
                      borderRadius: "14px",
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Get Demo
                  </a>
                </div>
                {/* Mobile right */}
                <div className="flex md:hidden items-center flex-shrink-0 relative z-10" style={{ gap: "10px", marginLeft: "auto" }}>
                  
                  <a
                    href="#cta"
                    className="nav-btn-primary"
                    style={{
                      padding: "9px 18px",
                      borderRadius: "12px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Get Demo
                  </a>
                  {/* Hamburger */}
                  <button
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-label="Toggle menu"
                    style={{
                      width: 42, height: 42,
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      background: mobileOpen ? "rgba(59,126,248,0.12)" : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      flexShrink: 0,
                    }}
                  >
                    <motion.span className="block rounded-full bg-white" style={{ width: 18, height: 1.5 }}
                      animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.22 }}
                    />
                    <motion.span className="block rounded-full bg-white" style={{ width: 18, height: 1.5 }}
                      animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.22 }}
                    />
                    <motion.span className="block rounded-full bg-white" style={{ width: 18, height: 1.5 }}
                      animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.22 }}
                    />
                  </button>
                </div>
              </div>

              {/* ── MOBILE DROPDOWN ── */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      marginTop: "8px",
                      padding: "12px",
                      borderRadius: "22px",
                      background: "rgba(8,15,32,0.96)",
                      backdropFilter: "blur(32px)",
                      WebkitBackdropFilter: "blur(32px)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.09), 0 20px 60px rgba(0,0,0,0.55)",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "10px" }}>
                      {navLinks.map(([label, href]) => (
                        <a key={label} href={href} className="mobile-link" onClick={() => setMobileOpen(false)}>
                          {label}
                        </a>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        
                        <a
                          href="#cta"
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: "block", textAlign: "center",
                            padding: "13px", borderRadius: "14px",
                            fontSize: "15px", fontWeight: 500,
                            color: "rgba(180,188,210,0.85)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            textDecoration: "none", minHeight: 48,
                          }}
                        >
                          Log in
                        </a>
                        
                        <a
                          href="#cta"
                          className="nav-btn-primary"
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: "block", textAlign: "center",
                            padding: "13px", borderRadius: "14px",
                            fontSize: "15px", fontWeight: 600, minHeight: 48,
                          }}
                        >
                          Get Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
    </>
  );
}