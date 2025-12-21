"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

interface LocationTilesProps {
  location: string;
  onLocationChange: (newLocation: string) => void;
}

const LocationTiles: React.FC<LocationTilesProps> = ({
  location,
  onLocationChange,
}) => {
  const t = useTranslations("Cities");

  const locations = [
    { slug: "bialystok", key: "bialystok" },
    { slug: "warsaw", key: "warsaw" },
  ];

  return (
    <div className="flex flex-row gap-2">
      {locations.map((loc) => (
        <Button
          key={loc.slug}
          variant={location === loc.slug ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => onLocationChange(loc.slug)}
        >
          <MapPin className="h-4 w-4" />
          {t(loc.key)}
        </Button>
      ))}
    </div>
  );
};

export default LocationTiles;
