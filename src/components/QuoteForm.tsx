import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { MapPin, Home, Briefcase, Truck, Package } from "lucide-react";

type ServiceType = "ev-tasima" | "profil-tasima" | "arac-kiralama" | "lojistik" | null;

const QuoteForm = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);
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
    profileType: "",
    profileQuantity: "",
    vehicleType: "",
    rentalDuration: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { service: selectedService, ...formData });
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
      profileType: "",
      profileQuantity: "",
      vehicleType: "",
      rentalDuration: "",
      notes: "",
    });
    setSelectedService(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const serviceOptions = [
    { value: "ev-tasima", label: "Ev Taşıma", icon: Home, description: "Ev eşyalarınızın güvenli taşınması" },
    { value: "profil-tasima", label: "Profil Taşıma", icon: Briefcase, description: "Profesyonel ekipman taşımacılığı" },
    { value: "arac-kiralama", label: "Araç Kiralama", icon: Truck, description: "İhtiyacınıza uygun araç kiralama" },
    { value: "lojistik", label: "Lojistik", icon: Package, description: "Lojistik ve kargo hizmetleri" },
  ];

  return (
    <section id="quote" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Ücretsiz Teklif Alın</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hizmet türünü seçin ve formu doldurun
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Service Selection */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Hizmet Türünü Seçin</CardTitle>
              <CardDescription>Size en uygun hizmeti belirleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedService === option.value;
                  return (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-primary ring-2 ring-primary shadow-lg' 
                          : 'hover:border-primary hover:shadow-soft'
                      }`}
                      onClick={() => setSelectedService(option.value as ServiceType)}
                    >
                      <CardContent className="p-6 text-center space-y-3">
                        <Icon className={`w-12 h-12 mx-auto transition-colors ${isSelected ? 'text-primary' : 'text-primary/70'}`} />
                        <h3 className="font-semibold text-lg text-foreground">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            selectedService ? 'max-h-[5000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            {selectedService && (
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Teklif Formu - {serviceOptions.find(s => s.value === selectedService)?.label}</CardTitle>
                      <CardDescription>Bilgilerinizi doldurun</CardDescription>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedService(null)}>
                      Değiştir
                    </Button>
                  </div>
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

                  {/* Service-specific fields */}
                  {selectedService === "ev-tasima" && (
                    <>
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pickupFloor">Kat Numarası *</Label>
                            <Input
                              id="pickupFloor"
                              name="pickupFloor"
                              value={formData.pickupFloor}
                              onChange={handleInputChange}
                              required
                              placeholder="örn: 3. kat"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pickupElevator">Asansör Var mı? *</Label>
                            <Select
                              value={formData.pickupElevator}
                              onValueChange={(value) => setFormData({ ...formData, pickupElevator: value })}
                              required
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="deliveryFloor">Kat Numarası *</Label>
                            <Input
                              id="deliveryFloor"
                              name="deliveryFloor"
                              value={formData.deliveryFloor}
                              onChange={handleInputChange}
                              required
                              placeholder="örn: Zemin kat"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deliveryElevator">Asansör Var mı? *</Label>
                            <Select
                              value={formData.deliveryElevator}
                              onValueChange={(value) => setFormData({ ...formData, deliveryElevator: value })}
                              required
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
                    </>
                  )}

                  {selectedService === "profil-tasima" && (
                    <>
                      {/* Addresses */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          Adres Bilgileri
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="pickupAddress">Başlangıç Adresi *</Label>
                            <Input
                              id="pickupAddress"
                              name="pickupAddress"
                              value={formData.pickupAddress}
                              onChange={handleInputChange}
                              required
                              placeholder="Örnek Mahallesi, Sokak No:1, İlçe, İl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deliveryAddress">Hedef Adres *</Label>
                            <Input
                              id="deliveryAddress"
                              name="deliveryAddress"
                              value={formData.deliveryAddress}
                              onChange={handleInputChange}
                              required
                              placeholder="Yeni Mahallesi, Cadde No:10, İlçe, İl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Profile Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Profil Detayları</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="profileType">Profil Türü *</Label>
                            <Input
                              id="profileType"
                              name="profileType"
                              value={formData.profileType}
                              onChange={handleInputChange}
                              required
                              placeholder="örn: Alüminyum, Cam Balkon"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="profileQuantity">Adet *</Label>
                            <Input
                              id="profileQuantity"
                              name="profileQuantity"
                              type="number"
                              value={formData.profileQuantity}
                              onChange={handleInputChange}
                              required
                              placeholder="örn: 50"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedService === "arac-kiralama" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Araç Kiralama Detayları</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vehicleType">Araç Türü *</Label>
                          <Select
                            value={formData.vehicleType}
                            onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="panelvan">Panelvan</SelectItem>
                              <SelectItem value="kamyonet">Kamyonet</SelectItem>
                              <SelectItem value="kamyon">Kamyon</SelectItem>
                              <SelectItem value="tir">Tır</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rentalDuration">Kiralama Süresi *</Label>
                          <Input
                            id="rentalDuration"
                            name="rentalDuration"
                            value={formData.rentalDuration}
                            onChange={handleInputChange}
                            required
                            placeholder="örn: 1 gün, 3 saat"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedService === "lojistik" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Adres Bilgileri
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupAddress">Başlangıç Adresi *</Label>
                          <Input
                            id="pickupAddress"
                            name="pickupAddress"
                            value={formData.pickupAddress}
                            onChange={handleInputChange}
                            required
                            placeholder="Örnek Mahallesi, Sokak No:1, İlçe, İl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryAddress">Hedef Adres *</Label>
                          <Input
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleInputChange}
                            required
                            placeholder="Yeni Mahallesi, Cadde No:10, İlçe, İl"
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
