import { z } from 'zod';

export const eventSortingSchema = z.object ({
    sortBy: z.enum(['title', 'price', 'startTime', 'createdAt']).default('createdAt'),
    order: z.enum(["asc", "desc"]).default("desc"),
})