import type{ Request, Response } from "express";
import { signupSchema } from "./auth.schema";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";


export const signup = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).json({
        success: false,
        message: "Field error"
    })
  }

  const {name, email, password} = result.data;
  console.log(result.data);
  const existingEmail = await prisma.user.findUnique({
    where:{
        email,
    }
  })
  if(existingEmail) {
    return res.status(409).json({
        message: "Email already exists"
    })
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
   data: {
    name,
    email,
    password: hashedPassword
   } 
  })
  return res.status(201).json({
  success: true,
  data: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

}