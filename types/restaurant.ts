export interface Restaurant {
  id: number;
  osmId: string;
  name: string;
  description?: string | null;
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
  comments?: Comment[];
  slug: string;
}

export interface Rating {
  id: number;
  value: number;
  userId: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  userId: string;
  restaurantId: number;
  createdAt: Date;
  user: User;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  password: string;
  dateOfBirth?: Date | null;
  location?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
