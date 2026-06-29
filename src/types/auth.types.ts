import { Role } from "../generated/prisma/enums"

export interface AuthPayload {
    id: number;
    role: Role;
}