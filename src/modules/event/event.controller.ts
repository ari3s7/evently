import type{Request, Response} from 'express';
import { eventIdSchema, eventSchema, updateEventSchema } from './event.schema';
import { prisma } from "../../config/prisma";


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

  export const getEventById = async(req: Request, res: Response) => {
    try {
    const resultId = eventIdSchema.safeParse(req.params);

    if(!resultId.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { id } = resultId.data;
    const event = await prisma.event.findUnique({
        where: {
            id,
        }, 
        include : {
            venue: true,
            organizer: {
             select:{
                id: true,
                name: true
             }
            }
        }
    })
    if(!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      })  
    }
    return res.status(200).json({
        success: true,
        data: event
    })
  } catch (error) {
    return res.status(500).json({
        success:  false,
        message: "Internal Server Error"
    });
  }
}

export const updateEvent = async(req: Request, res: Response) => {
    try {
    const idResult = eventIdSchema.safeParse(req.params);
    if(!idResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    }
    const { id } = idResult.data;

    const eventResult = updateEventSchema.safeParse(req.body);

    if(!eventResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field Error"
        });
    } 
    
    const existingEvent = await prisma.event.findUnique ({
        where: {
            id,
        }
    })

    if(!existingEvent) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        })
    }

    const event = await prisma.event.update({
        where: {
            id
        },
        data: eventResult.data,
    })

    return res.status(200).json ({
        success: true,
        data: event,
    })
 } catch(error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
 }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
    const idResult = eventIdSchema.safeParse(req.params);

    if(!idResult.success) {
        return res.status(400).json({
            success: false,
            message: "Field error"
        });
    }
    const { id } = idResult.data;
    const event = await prisma.event.findUnique({
        where: {
            id,
        }
    });
    if(!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found"
        });
    }
    await prisma.event.delete( {
        where: {
            id
        }
    })
    return res.status(200).json({
        success: true,
        message: "Event deleted successfully"
    });
  } catch(error){ 
       return res.status(500).json({
        success: false,
        message: "Internal server error"
       });
  }
};