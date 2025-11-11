import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Hızlı Taşımacılık</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </button>
            <button onClick={() => scrollToSection("services")} className="text-foreground hover:text-primary transition-colors">
              Hizmetlerimiz
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-foreground hover:text-primary transition-colors">
              Galeri
            </button>
            <button onClick={() => scrollToSection("reviews")} className="text-foreground hover:text-primary transition-colors">
              Yorumlar
            </button>
            <Button variant="accent" onClick={() => scrollToSection("quote")}>
              Teklif Al
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in slide-in-from-top">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Hizmetlerimiz
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Galeri
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
            >
              Yorumlar
            </button>
            <div className="px-4">
              <Button variant="accent" className="w-full" onClick={() => scrollToSection("quote")}>
                Teklif Al
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
