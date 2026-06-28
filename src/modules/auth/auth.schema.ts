import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters")
                        .max(32, "Password cannot exceed 32 characters")
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                        .regex(/[0-9]/, "Password must contain at least one digit")
                        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});