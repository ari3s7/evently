import { z } from 'zod';

export const bookingSchema = z.object({
    eventId: z.coerce
    .number()
    .int()
    .positive("Event ID must be positive"),
    quantity: z.number(),
})