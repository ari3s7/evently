import { z } from 'zod';
import { BookingStatus } from '../../generated/prisma/enums';
import { paginationSchema } from '../../common/pagination.schema';

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

export const bookingSortSchema = z.object({
    sortBy: z.enum([
        "createdAt",
        "totalAmount",
        "status",
    ]).default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
})

export const bookFilterSchema = z.strictObject({
    status: z.enum(BookingStatus).optional(),
    eventId: z.coerce.number().int().positive().optional(),
    userId: z.coerce.number().int().positive().optional(),
})

export const bookQuerySchema = z.object({
    ...paginationSchema.shape,
    ...bookingSortSchema.shape,
    ...bookFilterSchema.shape,
})