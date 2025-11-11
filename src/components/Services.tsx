import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Briefcase, Package, Network } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Şehir İçi",
    description: "İl sınırları içerisinde hızlı ve güvenli ev taşıma hizmetleri.",
  },
  {
    icon: MapPin,
    title: "Şehirler Arası",
    description: "Türkiye'nin her yerine profesyonel şehirler arası taşımacılık.",
  },
  {
    icon: Briefcase,
    title: "Ofis Taşımacılığı",
    description: "İş yerinizi minimum aksama ile yeni adresinize taşıma hizmeti.",
  },
  {
    icon: Package,
    title: "Ufak Büyük Eşya Taşıma",
    description: "Küçük mobilyalardan beyaz eşyaya kadar her türlü eşya taşıma.",
  },
  {
    icon: Network,
    title: "Lojistik",
    description: "Depolama, dağıtım ve nakliye lojistik çözümleri.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Hizmetlerimiz</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Taşınma sürecinizin her aşamasında yanınızdayız
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
