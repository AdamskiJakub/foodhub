import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  city: z.string().min(1, "City is required"),
  slug: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  houseNumber: z.string().min(1, "House number is required"),
  cuisine: z.string().min(1, "Cuisine is required"),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  phone: z.string().min(6, "Phone number is required"),
  website: z.string().url("Invalid URL").or(z.literal("")).optional(),
  openingHours: z.string().min(1, "Opening hours are required"),
  delivery: z.boolean().optional(),
  takeaway: z.boolean().optional(),
  reservation: z.boolean().optional(),
  wheelchair: z.boolean().optional(),
});

export type RestaurantFormValues = z.infer<typeof restaurantSchema>;
