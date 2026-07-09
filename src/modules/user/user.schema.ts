import { z } from 'zod';
import { Role } from '../../generated/prisma/enums';
import { paginationSchema } from '../../common/pagination.schema';



 export const userIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Event ID must be positive"),
});

export const updateRoleSchema = z.object({
    role: z.enum(Role),
});

export const userSortSchema = z.object({
    sortBy: z.enum([
        "name",
        "email",
        "createdAt",
    ]).default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
});

export const userSearchSchema = z.object({
  search: z.string().trim().min(1).optional(),
});

export const userFilterSchema = z.object({
    role: z.enum(Role).optional(),
});

export const userQuerySchema = z.object({
    ...paginationSchema.shape,
    ...userSortSchema.shape,
    ...userSearchSchema.shape,
    ...userFilterSchema.shape,
});