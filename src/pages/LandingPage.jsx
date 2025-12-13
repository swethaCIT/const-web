import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import ServicesCarousel from "../components/ServicesCarousel";
import Footer from "../components/Footer";


export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <ServicesCarousel />
      <Footer />
    </>
  );
}
