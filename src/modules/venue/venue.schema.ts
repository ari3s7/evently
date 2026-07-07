import { z } from 'zod';

export const venueSchema = z.object({
    name: z.string().trim().min(3, "Venue name must be at least 3 characters").max(100, "Venue name cannot exceed 100 characters"),
    address: z.string().trim().min(3, "Address must be atleast ").max(255, "Venue address cannot exceed 255 characters"),
    capacity: z.number().int().positive("Capacity must be greater than 0"),
});

export const updateVenueSchema = venueSchema.partial();

export const venueIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Venue ID must be positive"),
});

export const venueSortSchema = z.object({
  sortBy: z.enum([
    "name",
    "capacity",
    "createdAt",
  ]).default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),
})