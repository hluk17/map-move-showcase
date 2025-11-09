import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    deliveryAddress: "",
    pickupFloor: "",
    deliveryFloor: "",
    pickupElevator: "",
    deliveryElevator: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your Google Maps API and backend
    console.log("Form submitted:", formData);
    toast.success("Teklifiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      pickupAddress: "",
      deliveryAddress: "",
      pickupFloor: "",
      deliveryFloor: "",
      pickupElevator: "",
      deliveryElevator: "",
      notes: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="quote" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Ücretsiz Teklif Alın</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Formu doldurun, size en uygun fiyatı hemen gönderelim
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle>Teklif Formu</CardTitle>
            <CardDescription>Taşınma ihtiyaçlarınız hakkında bilgi verin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">İletişim Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ahmet Yılmaz"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon Numarası *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="0555 123 45 67"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Mevcut Adres
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Taşınacak Adres *</Label>
                  <Input
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="Örnek Mahallesi, Sokak No:1, İlçe, İl"
                  />
                  <p className="text-sm text-muted-foreground">Not: Buraya Google Maps entegrasyonu eklenebilir</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupFloor">Kat Numarası</Label>
                    <Input
                      id="pickupFloor"
                      name="pickupFloor"
                      value={formData.pickupFloor}
                      onChange={handleInputChange}
                      placeholder="örn: 3. kat"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupElevator">Asansör Var mı?</Label>
                    <Select
                      value={formData.pickupElevator}
                      onValueChange={(value) => setFormData({ ...formData, pickupElevator: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Var</SelectItem>
                        <SelectItem value="no">Yok</SelectItem>
                        <SelectItem value="not-applicable">Müstakil/Zemin Kat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Varış Adresi
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Taşınacak Adres *</Label>
                  <Input
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="Yeni Mahallesi, Cadde No:10, İlçe, İl"
                  />
                  <p className="text-sm text-muted-foreground">Not: Buraya Google Maps entegrasyonu eklenebilir</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFloor">Kat Numarası</Label>
                    <Input
                      id="deliveryFloor"
                      name="deliveryFloor"
                      value={formData.deliveryFloor}
                      onChange={handleInputChange}
                      placeholder="örn: Zemin kat"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryElevator">Asansör Var mı?</Label>
                    <Select
                      value={formData.deliveryElevator}
                      onValueChange={(value) => setFormData({ ...formData, deliveryElevator: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Var</SelectItem>
                        <SelectItem value="no">Yok</SelectItem>
                        <SelectItem value="not-applicable">Müstakil/Zemin Kat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Ek Notlar</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Özel istekleriniz, kırılabilir eşyalar veya ek bilgiler..."
                  rows={4}
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Teklif Talebini Gönder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteForm;
