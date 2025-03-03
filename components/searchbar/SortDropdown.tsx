"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SortDropdownProps {
  sortOrder: string;
  onSortChange: (order: "asc" | "desc") => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
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
  );
};

export default SortDropdown;
