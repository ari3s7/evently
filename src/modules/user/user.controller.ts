import type { Request, Response } from "express";
import { updateRoleSchema, userIdSchema } from "./user.schema";
import { prisma } from "../../config/prisma";
import { paginationSchema } from "../../common/pagination.schema";

export const getMe = async(req: Request, res: Response) => {
    try {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user!.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found",
    });
}
    return res.status(200).json({
        success: true,
        data: user
    })
   } catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    });
   } 
}

export const getAll = async (req: Request, res: Response) =>{
    try {
    const paginationResult = paginationSchema.safeParse(req.query);
        
        if(!paginationResult.success){
            return res.status(400).json({
                success: false,
                message: "Invalid pagination parameters"
             })
        }
        
    const {page, limit} = paginationResult.data;
    const skip = (page-1)*limit;
    const total = await prisma.user.count();
    const totalPages = Math.ceil(total / limit);
    const users = await prisma.user.findMany({
        skip,
        take: limit,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return res.status(200).json({
        success: true,
        currentPage: page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        data: users,
    })
   } catch(error){
    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    })
   }
}

export const getById = async(req: Request, res: Response) => {
    try {
    const idResult = userIdSchema.safeParse(req.params);

    if(!idResult.success){
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }

    const { id } = idResult.data;

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })
    return res.status(200).json({
        success: true,
        data: user,
    })
   } catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    });
   }
}
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