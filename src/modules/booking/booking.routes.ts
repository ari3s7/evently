import Router from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { createBooking, myBookings, getBookings, getBookingById } from "../booking/booking.controller"
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '../../generated/prisma/enums';

const router = Router();


router.post("/", authenticate, createBooking);
router.get("/me", authenticate, myBookings);
router.get("/", authenticate, authorize(Role.ADMIN), getBookings);
router.get("/:id", authenticate, getBookingById);

export default router;