import { z } from 'zod';

export const eventSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description cannot exceed 1000 characters"),
    price: z.number().positive(),
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
    venueId: z.number(),
    bannerUrl: z.url().optional(),
 });

 export const eventIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Event ID must be positive"),
});

export const eventSortingSchema = z.object ({
    sortBy: z.enum(['title', 'price', 'startTime', 'createdAt']).default('createdAt'),
    order: z.enum(["asc", "desc"]).default("desc"),
})

export const updateEventSchema = eventSchema.partial()