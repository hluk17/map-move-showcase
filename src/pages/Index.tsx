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
      const aboutSection = document.getElementById("about");
      
      if (hero && aboutSection) {
        const heroHeight = hero.offsetHeight;
        const scrollY = window.scrollY;
        
        // Transition happens during the first screen height of scrolling
        const transitionProgress = Math.min(scrollY / heroHeight, 1);
        
        // Apply dark mode when transition is more than 50% complete
        if (transitionProgress > 0.5) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        
        // Make hero sticky during transition, then release
        if (transitionProgress < 1) {
          hero.style.position = "sticky";
          hero.style.top = "0";
        } else {
          hero.style.position = "relative";
          hero.style.top = "auto";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
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
