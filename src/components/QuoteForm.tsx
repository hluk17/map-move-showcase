import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MapPin, Map, Navigation } from "lucide-react";
import GoogleMapsLoader from "./GoogleMapsLoader";
import AddressAutocomplete from "./AddressAutocomplete";
import RouteMap from "./RouteMap";
import { Alert, AlertDescription } from "@/components/ui/alert";

const QuoteForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    deliveryAddress: "",
    pickupPlaceId: "",
    deliveryPlaceId: "",
    pickupFloor: "",
    deliveryFloor: "",
    pickupElevator: "",
    deliveryElevator: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      distance,
      duration,
    };
    console.log("Form submitted:", submissionData);
    toast.success("Teklifiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      pickupAddress: "",
      deliveryAddress: "",
      pickupPlaceId: "",
      deliveryPlaceId: "",
      pickupFloor: "",
      deliveryFloor: "",
      pickupElevator: "",
      deliveryElevator: "",
      notes: "",
    });
    setShowMap(false);
    setDistance("");
    setDuration("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (name: string, value: string, placeId?: string) => {
    setFormData({
      ...formData,
      [name]: value,
      [`${name}PlaceId`]: placeId || "",
    });
    setShowMap(false);
  };

  const handleCalculateRoute = () => {
    if (formData.pickupAddress && formData.deliveryAddress && apiKey) {
      setShowMap(true);
    } else {
      toast.error("Lütfen her iki adresi de girin ve API anahtarını ekleyin.");
    }
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
            <div className="mb-6">
              <Alert>
                <Map className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold">Google Maps API Anahtarı</p>
                    <Input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Google Maps API anahtarınızı buraya girin"
                    />
                    <p className="text-xs text-muted-foreground">
                      API anahtarınızı{" "}
                      <a
                        href="https://console.cloud.google.com/google/maps-apis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Cloud Console
                      </a>
                      'dan alabilirsiniz.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

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
                <GoogleMapsLoader apiKey={apiKey}>
                  {(loaded) =>
                    loaded ? (
                      <AddressAutocomplete
                        id="pickupAddress"
                        name="pickupAddress"
                        label="Taşınacak Adres *"
                        value={formData.pickupAddress}
                        onChange={(value, placeId) => handleAddressChange("pickupAddress", value, placeId)}
                        required
                        placeholder="Adres yazın veya haritadan seçin"
                        apiKey={apiKey}
                      />
                    ) : (
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
                    )
                  }
                </GoogleMapsLoader>
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
                <GoogleMapsLoader apiKey={apiKey}>
                  {(loaded) =>
                    loaded ? (
                      <AddressAutocomplete
                        id="deliveryAddress"
                        name="deliveryAddress"
                        label="Taşınacak Adres *"
                        value={formData.deliveryAddress}
                        onChange={(value, placeId) => handleAddressChange("deliveryAddress", value, placeId)}
                        required
                        placeholder="Adres yazın veya haritadan seçin"
                        apiKey={apiKey}
                      />
                    ) : (
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
                    )
                  }
                </GoogleMapsLoader>
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

              {/* Route Calculation */}
              {apiKey && formData.pickupAddress && formData.deliveryAddress && (
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCalculateRoute}
                    className="w-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Rota ve Mesafeyi Hesapla
                  </Button>

                  {showMap && (
                    <GoogleMapsLoader apiKey={apiKey}>
                      {(loaded) =>
                        loaded ? (
                          <div className="space-y-4">
                            <RouteMap
                              origin={formData.pickupAddress}
                              destination={formData.deliveryAddress}
                              apiKey={apiKey}
                              onDistanceCalculated={(dist, dur) => {
                                setDistance(dist);
                                setDuration(dur);
                              }}
                            />
                            {distance && duration && (
                              <Alert>
                                <Navigation className="h-4 w-4" />
                                <AlertDescription>
                                  <div className="space-y-1">
                                    <p className="font-semibold">Rota Bilgileri</p>
                                    <p className="text-sm">Mesafe: {distance}</p>
                                    <p className="text-sm">Tahmini Süre: {duration}</p>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        ) : null
                      }
                    </GoogleMapsLoader>
                  )}
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
      </div>
    </section>
  );
};

export default QuoteForm;
