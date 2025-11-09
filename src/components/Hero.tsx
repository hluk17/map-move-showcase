import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-logistics.jpg";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToQuote = () => {
    const element = document.getElementById("quote");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional logistics delivery truck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            Evinize Taşınırken
            <span className="text-primary block">Yanınızdayız</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl">
            Yılların deneyimiyle ev ve ofis taşımacılığında profesyonel hizmet. Eşyalarınızı güvenle yeni adresinize taşıyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="accent" onClick={scrollToQuote} className="group">
              Ücretsiz Teklif Al
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Hizmetlerimiz
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
