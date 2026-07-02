import { z } from 'zod';
import { Role } from '../../generated/prisma/enums';



 export const userIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("Event ID must be positive"),
});

export const updateRoleSchema = z.object({
    role: z.enum(Role),
});