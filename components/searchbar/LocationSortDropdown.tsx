"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface LocationSortDropdownsProps {
  location: string;
  sortOrder: "asc" | "desc";
  onLocationChange: (newLocation: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
}

const LocationSortDropdowns: React.FC<LocationSortDropdownsProps> = ({
  location,
  sortOrder,
  onLocationChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onLocationChange("Białystok")}>
            Białystok
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onLocationChange("Warszawa")}>
            Warszawa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onSortChange("asc")}>
            A-Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("desc")}>
            Z-A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocationSortDropdowns;
