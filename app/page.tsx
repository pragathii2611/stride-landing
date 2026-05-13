import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientTicker from "@/components/ClientTicker";
import FlipCounter from "@/components/FlipCounter";
import FeatureCarousel from "@/components/FeatureCarousel";
import JourneySteps from "@/components/JourneySteps";
import MacbookSection from "@/components/MacbookSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTAForm from "@/components/CTAForm";
import Footer from "@/components/Footer";
import ScrollGlow from "@/components/ScrollGlow";

function SectionWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 -8px 40px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollGlow />
      <Navbar />
      <main style={{ background: "#020810" }}>
        <Hero />
        <SectionWrap><ClientTicker /></SectionWrap>
        <SectionWrap><FlipCounter /></SectionWrap>
        <SectionWrap><FeatureCarousel /></SectionWrap>
        <SectionWrap><JourneySteps /></SectionWrap>
        <SectionWrap><MacbookSection /></SectionWrap>
        <SectionWrap><Pricing /></SectionWrap>
        <SectionWrap><Testimonials /></SectionWrap>
        <SectionWrap><CTAForm /></SectionWrap>
      </main>
      <Footer />
    </>
  );
}