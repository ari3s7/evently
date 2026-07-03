import Router from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { createBooking } from "../booking/booking.controller"

const router = Router();


router.post("/", authenticate, createBooking);

export default router;