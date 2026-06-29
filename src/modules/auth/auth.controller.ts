import type{ Request, Response } from "express";
import { signupSchema } from "./auth.schema";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res: Response) => {
  try {const result = signupSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).json({
        success: false,
        message: "Field error"
    })
  }

  const {name, email, password} = result.data;
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
});} catch (error) {
  return res.status(500).json({
    message:"Internal Server Error"
  });
}
}

export const signin = async (req: Request, res: Response) => {
     try {const {email, password} = req.body;

     const user = await prisma.user.findUnique({
      where: {
        email
      }
     })
      if(!user) {
        return res.status(401).json ({
          message: "Invalid email or password"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password"
        });
      }
      const token = jwt.sign(
        {
        id: user.id,
        role: user.role,
        }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      }
      );
      return res.status(200).json({
       success: true,
       token,
       user: {
           id: user.id,
           name: user.name,
           email: user.email,
           role: user.role,
  },
}); } catch (error) {
  return res.status(500).json({
    message: "Internal server error"
  });
}
}