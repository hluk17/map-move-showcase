import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressAutocompleteProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string, placeId?: string) => void;
  required?: boolean;
  placeholder?: string;
  apiKey: string;
}

const AddressAutocomplete = ({
  id,
  name,
  label,
  value,
  onChange,
  required,
  placeholder,
  apiKey,
}: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current || !apiKey || !window.google) return;

    const autocompleteInstance = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "tr" },
      fields: ["place_id", "formatted_address", "geometry"],
    });

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address, place.place_id);
      }
    });

    setAutocomplete(autocompleteInstance);

    return () => {
      if (autocompleteInstance) {
        google.maps.event.clearInstanceListeners(autocompleteInstance);
      }
    };
  }, [apiKey, onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AddressAutocomplete;
