import { z } from "zod";
import { EventStatus } from "../../generated/prisma/enums";
import { paginationSchema } from "../../common/pagination.schema";

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

export const updateEventSchema = eventSchema.partial();

export const eventSearchSchema = z.object({
    search: z.string().trim().min(1).optional(),
});

export const eventFilterSchema = z.object({
  status: z.enum(EventStatus).optional(),
  venueId: z.coerce.number().int().positive().optional(),
  organizerId: z.coerce.number().int().positive().optional(),
});
export const eventSortingSchema = z.object ({
    sortBy: z.enum(['title', 'price', 'startTime', 'createdAt']).default('createdAt'),
    order: z.enum(["asc", "desc"]).default("desc"),
})

export const eventQuerySchema = z.object({
    ...paginationSchema.shape,
    ...eventSortingSchema.shape,
    ...eventSearchSchema.shape,
    ...eventFilterSchema.shape,
})
   
