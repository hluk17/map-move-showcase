import { useEffect, useState } from "react";

interface GoogleMapsLoaderProps {
  apiKey: string;
  children: (loaded: boolean) => React.ReactNode;
}

const GoogleMapsLoader = ({ apiKey, children }: GoogleMapsLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      setLoaded(false);
      return;
    }

    // Check if already loaded
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => {
      console.error("Google Maps yüklenirken hata oluştu");
      setLoaded(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(
        `script[src^="https://maps.googleapis.com/maps/api/js"]`
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [apiKey]);

  return <>{children(loaded)}</>;
};

export default GoogleMapsLoader;
