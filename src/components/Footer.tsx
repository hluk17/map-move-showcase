import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Hızlı Taşımacılık</h3>
            <p className="text-primary-foreground/80 mb-4">
              Güvenilir ve profesyonel ev taşıma hizmetlerinde yanınızdayız.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="text-primary-foreground/80">0555 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="text-primary-foreground/80">info@hizlitasimacilik.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-primary-foreground/80">Merkez Mah. Ticaret Cad. No:123, İstanbul</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Pazartesi - Cuma: 08:00 - 18:00</p>
              <p>Cumartesi: 09:00 - 16:00</p>
              <p>Pazar: Kapalı</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Hızlı Taşımacılık. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
