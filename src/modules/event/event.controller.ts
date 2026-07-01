import type{Request, Response} from 'express';
import { eventSchema } from './event.schema';
import { prisma } from "../../config/prisma";
import { EventStatus } from '../../generated/prisma/enums';


export const createEvent = async (req: Request, res: Response) => {
    try {
        const resultEvent = eventSchema.safeParse(req.body);

    if(!resultEvent.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { title, description, price, startTime, endTime, venueId, bannerUrl } = resultEvent.data;

    const venue = await prisma.venue.findUnique({
     where: {
    id: venueId,
     },
   });

  if (!venue) {
  return res.status(404).json({
    success: false,
    message: "Venue not found",
     });
   }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            price,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            venueId,
            organizerId: req.user!.id,
            bannerUrl,
            
        }
    })

    return res.status(201).json({
     success: true,
     data: event,
   });  } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
   }
  }

  export const getEvents = async (req: Request, res: Response) => {
    try{
    const events = await prisma.event.findMany({
        include: {
            venue: true,
            organizer :{
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });

    return res.status(200).json({
        success: true,
        data: events
    })
         } catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
  }