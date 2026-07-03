import type{Request, Response} from "express";
import { bookingSchema } from "./booking.schema";
import { prisma } from "../../config/prisma";

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