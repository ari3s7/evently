import type{ Request, Response } from "express"
import { venueSchema, venueIdSchema, updateVenueSchema } from "./venue.schema"
import { prisma } from "../../config/prisma";
import { paginationSchema } from "../../common/pagination.schema";

export const createVenue = async (req: Request, res: Response) => {
    try {
    const result = venueSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Field Error",
        })
    }
    const { name, address, capacity } = result.data;

    const venue = await prisma.venue.create ({
        data: {
            name,
            address,
            capacity
        }
})
    return res.status(201).json({
        success: true,
        data: venue
   });
     } catch (error) {
      return res.status(500).json({
        success:false,
        message: "Internal Server error"
    });
}
};

export const getAllVenues = async (req: Request,res: Response) => {
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
        const venues = await prisma.venue.findMany({
            skip,
            take: limit,
        });

        const total = await prisma.venue.count();
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
           success: true,
           currentPage: page,
           limit,
           total,
           totalPages,
           hasNextPage: page < totalPages,
           hasPreviousPage: page > 1,
           data: venues
   })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        });
    }
};

export const getVenueById = async (req: Request, res: Response) => {
   try {
     const result = venueIdSchema.safeParse(req.params);
    if(!result.success) {
        return res.status(400).json({
            success: false,
            message: "Field error"
        });
    }
    const {id} = result.data;

    const venue = await prisma.venue.findUnique({
        where: {
            id,
        }
    }); 
    if (!venue) {
           return res.status(404).json({
            success: false,
            message: "Venue not found",
  });
}
    return res.status(200).json({
        success:true,
        data: venue
    })}
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        });
    }
};

export const updateVenue = async (req: Request, res: Response) => {
    try {
    const idResult = venueIdSchema.safeParse(req.params);

    if(!idResult.success) {
        return res.status(400).json ({
            success: false,
            message: "Field Error"
        });
    }
    const {id} = idResult.data;

    const bodyResult = updateVenueSchema.safeParse(req.body);

    if(!bodyResult.success){
         return res.status(400).json ({
            success: false,
            message: "Field Error"
        });
    }
    const existingVenue = await prisma.venue.findUnique({
      where: {
        id,
      },
    });

    if (!existingVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    const venue = await prisma.venue.update({
        where: {
            id,
        },
        data: bodyResult.data,
    })
     return res.status(200).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

};

export const deleteVenue = async (req: Request, res: Response) => {
    try {
    const idResult = venueIdSchema.safeParse(req.params);

     if(!idResult.success) {
        return res.status(400).json ({
            success: false,
            message: "Field Error"
        });
    }
    const { id } = idResult.data;

    const existingVenue = await prisma.venue.findUnique({
      where: {
        id,
      },
    });

    if (!existingVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }
    const venue = await prisma.venue.delete({
        where: {
            id,
        }
    })
    return res.status(200).json({
       success: true,
       message: "Venue deleted successfully",
});
} catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}
}
