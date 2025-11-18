import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      
      if (hero) {
        const heroHeight = hero.offsetHeight;
        const scrollY = window.scrollY;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.min(scrollY / heroHeight, 1);
        
        // Parallax effect - hero moves slower (0.5x speed)
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        
        // Apply dark mode when hero is completely scrolled past
        if (scrollProgress >= 0.95) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        
        // Create gradient overlay that intensifies with scroll
        const overlay = document.getElementById("scroll-overlay");
        if (overlay) {
          overlay.style.opacity = `${scrollProgress}`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Gradient overlay for smooth color transition */}
      <div 
        id="scroll-overlay" 
        className="fixed inset-0 bg-gradient-to-b from-background to-background pointer-events-none z-[5]"
        style={{ opacity: 0 }}
      />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <QuoteForm />
      <Footer />
    </div>
  );
};

export default Index;
