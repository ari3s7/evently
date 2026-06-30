import type{ Request, Response } from "express"
import { venueSchema, venueIdSchema } from "./venue.schema"
import { prisma } from "../../config/prisma";

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
        const venues = await prisma.venue.findMany();

   return res.status(200).json({
    success: true,
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
}
