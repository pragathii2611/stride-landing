import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FlipCounter from "@/components/FlipCounter";
import ClientTicker from "@/components/ClientTicker";
import FeatureCarousel from "@/components/FeatureCarousel";

import JourneySteps from "@/components/JourneySteps";
// import Pipeline from "@/components/Pipeline";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTAForm from "@/components/CTAForm";
import Footer from "@/components/Footer";
import ScrollGlow from "@/components/ScrollGlow";

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollGlow />
      <Navbar />
      <main>
        <Hero />
        <FlipCounter />
        <ClientTicker />
        <FeatureCarousel />
        
        <JourneySteps />
        {/* <Pipeline /> */}
        <Pricing />
        <Testimonials />
        <CTAForm />
      </main>
      <Footer />
    </>
  );
}
