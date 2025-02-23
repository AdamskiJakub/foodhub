export interface Restaurant {
  id: number;
  osmId: string;
  name: string;
  latitude?: number;
  longitude?: number;
  city: string;
  country: string;
  street: string;
  housenumber?: string | null;
  postcode?: string | null;
  cuisine?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  operator?: string | null;
  openingHours?: string | null;
  coordinates: unknown | null;
  building?: string | null;
  buildingLevels?: string | null;
  buildingMaterial?: string | null;
  checkDate?: string | null;
  outdoorSeating?: boolean | null;
  smoking?: string | null;
  takeaway?: boolean | null;
  delivery?: boolean | null;
  wheelchair?: string | null;
  reservation?: boolean | null;
  paymentMethods?: unknown | null;
  contactEmail?: string | null;
  contactFacebook?: string | null;
  contactInstagram?: string | null;
  contactMobile?: string | null;
  contactWebsite?: string | null;
  officialName?: string | null;
  dietVegetarian?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  ratings?: Rating[];
}

export interface Rating {
  id: number;
  value: number;
  userId: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}
