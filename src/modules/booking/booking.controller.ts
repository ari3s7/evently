import type{Request, Response} from "express";
import { bookingIdSchema, bookingSchema } from "./booking.schema";
import { prisma } from "../../config/prisma";
import { Role } from "../../generated/prisma/enums";

export const createBooking = async (req: Request, res: Response) => {
    try {
    const bookingResult = bookingSchema.safeParse(req.body);
    if(!bookingResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field error"
        });
    }
    const { eventId, quantity } = bookingResult.data;

    const event = await prisma.event.findUnique({
        where: {
            id: eventId,
        }
    })
    if(!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        });
    }
    const booking = await prisma.booking.create({
       data: {
        quantity,
        userId: req.user!.id,
        eventId,
        totalAmount: event.price * quantity,
       }
    });

    return res.status(201).json({
        success: true,
        data: booking
    });
} catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    })
   }
}
export const myBookings = async (req: Request, res: Response) => {
    try {
    const bookings = await prisma.booking.findMany({
        where: {
            userId: req.user!.id,
        },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    startTime: true,
                    banneUrl: true,
                }
            }
        }
    })
    return res.status(200).json({
        success: true,
        data: bookings
    })
  } catch(error) {
    return res.status(500).json ({
        success:false,
        message: "Internal Server error"
    });
  }
}
export const getBookings = async (req: Request, res: Response) => {
    try {
    const bookings = await prisma.booking.findMany({
          include: {
            user: {
                select: {
                id: true,
                name: true,
                email: true,
                },
            },
            event: {
                select: {
                    id: true,
                    title: true,
                    startTime: true,
                },
                booking: {
                    id: true,
                    quantity: true,
                    totalAmount: true,
                    status: true,
                    createdAt: true
                }
            }
          }
    }) 

    return res.status(200).json ({
        success: true,
        data: bookings
    });
 } catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
 } 
}

export const getBookingById = async (req: Request, res: Response) => {
    try {
    const bookingIdResult = bookingIdSchema.safeParse(req.params);

    if(!bookingIdResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { id } = bookingIdResult.data;

    const booking = await prisma.booking.findUnique({
        where: {
            id,
        }
    })
    if (!booking) {
        return res.status(404).json({
        success: false,
        message: "Booking not found",
  });
}
    if(req.user!.role !== Role.ADMIN && booking.userId !== req.user!.id) {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        })
    }
    const getBooking = await prisma.booking.findUnique({
        where: {
            id,
        }, include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            event: {
                select: {
                    id: true,
                    title: true,
                    startTime: true,
                    bannerUrl: true,
                }
            }
        }
    })
    return res.status(200).json({
        success: true,
        data: getBooking
    });
  } catch(error){
    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    });
  }
}

export const deleteBooking = async(req: Request, res: Response) => {
    try {
    const idResult = bookingIdSchema.safeParse(req.params);

    if(!idResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }

    const { id } = idResult.data;

    const booking = await prisma.booking.findUnique({
        where: {
            id,
        }
    })
    if(!booking) {
        return res.status(404).json({
            success: false,
            message: "Booking not found"
        });
    }
    
    if(req.user!.role !== Role.ADMIN && booking.userId !== req.user!.id) {
        return res.status(403).json ({
            success: false,
            message: "Forbidden"
        });
    }

    await prisma.booking.delete({
        where: {
            id,
        }
    })

    return res.status(200).json({
        success: true,
        message: "Booking Deleted successfully"
    }); 
   } catch(error) {
    return res.status(500).json({
        success: true,
        message: "Internal Server Error"
    });
 }
}