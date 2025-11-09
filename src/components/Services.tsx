import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Clock, Shield } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Ev Taşıma",
    description: "Mobilyalarınız ve eşyalarınızla birlikte yeni evinize güvenli taşınma.",
  },
  {
    icon: Package,
    title: "Eşya Paketleme",
    description: "Profesyonel paketleme malzemeleri ile eşyalarınızın korunması.",
  },
  {
    icon: Clock,
    title: "Ofis Taşıma",
    description: "İş yerinizi minimum aksama ile yeni adresinize taşıma hizmeti.",
  },
  {
    icon: Shield,
    title: "Sigortalı Taşıma",
    description: "Tüm eşyalarınız nakliye sigortası kapsamında güvence altında.",
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
