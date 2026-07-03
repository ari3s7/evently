import Router from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { createBooking, myBookings } from "../booking/booking.controller"

const router = Router();


router.post("/", authenticate, createBooking);
router.get("/me", authenticate, myBookings);

export default router;