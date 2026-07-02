import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import { Role } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });



async function main() {

    //Development ADMIN account

    
     const hashedPassword = await bcrypt.hash("admin123", 10);

     await prisma.user.upsert({
        where: {
            email: "admin@evently.com"
        },
        update: {},
        create: {
            name: "Admin",
            email: "admin@evently.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
     });

     console.log("Admin created");
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});