import { useEffect, useRef } from "react";

interface RouteMapProps {
  origin: string;
  destination: string;
  apiKey: string;
  onDistanceCalculated?: (distance: string, duration: string) => void;
}

const RouteMap = ({ origin, destination, apiKey, onDistanceCalculated }: RouteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !origin || !destination || !window.google) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 7,
        center: { lat: 39.9334, lng: 32.8597 }, // Ankara center
      });
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapInstanceRef.current);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);
          
          // Calculate distance and duration
          const route = result.routes[0];
          if (route && route.legs[0]) {
            const distance = route.legs[0].distance?.text || "";
            const duration = route.legs[0].duration?.text || "";
            onDistanceCalculated?.(distance, duration);
          }
        } else {
          console.error("Rota hesaplanamadı:", status);
        }
      }
    );
  }, [origin, destination, apiKey, onDistanceCalculated]);

  return (
    <div className="space-y-2">
      <div ref={mapRef} className="w-full h-[400px] rounded-lg border border-border" />
    </div>
  );
};

export default RouteMap;
