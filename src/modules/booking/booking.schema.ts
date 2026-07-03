import { z } from 'zod';

export const bookingSchema = z.object({
    eventId: z.coerce
    .number()
    .int()
    .positive("Event ID must be positive"),
    quantity: z.number(),
})

export const bookingIdSchema = z.object({
    id: z.coerce
    .number()
    .int()
    .positive("Booking ID must be positive"),
})