import Router from 'express';
import { createEvent, getEvents } from "../event/event.controller"
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '../../generated/prisma/enums';


const router = Router();

router.post("/", authenticate, authorize(Role.ADMIN, Role.ORGANIZER), createEvent);
router.get("/", getEvents);

export default router;