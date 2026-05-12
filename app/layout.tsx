import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stride — Your AI Team is Ready",
  description:
    "Stride provides businesses with the tools needed to automate real conversations across WhatsApp, email and web — backed by a CRM that keeps everything in sync.",
  keywords: ["CRM", "AI", "WhatsApp", "sales automation", "Singapore", "omnichannel"],
  openGraph: {
    title: "Stride — Your AI Team is Ready",
    description: "Sales, Admin, Customer Service — all in one omnichannel CRM.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}