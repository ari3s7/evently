import type { Request, Response } from "express";
import { updateRoleSchema, userIdSchema } from "./user.schema";
import { prisma } from "../../config/prisma";

export const updateRole = async (req: Request , res: Response) => {

    try {
    const idResult = userIdSchema.safeParse(req.params);

    if(!idResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { id } = idResult.data;

     const user = await prisma.user.findUnique({
        where:{
            id,
        }
    })
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const roleResult = updateRoleSchema.safeParse(req.body);

    if(!roleResult.success){
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { role } = roleResult.data;

    const update = await prisma.user.update({
        where :{
            id
        },
        data:{
            role,
        },
         select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
  },
    })

    return res.status(200).json({
        success: true,
        data: update
    })
   } catch(error) {
     return res.status(500).json({
        success: false,
        message: "Internal server error"
     });
}
};