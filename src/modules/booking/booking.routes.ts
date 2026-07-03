import Router from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { createBooking, myBookings, getBookings, getBookingById, deleteBooking } from "../booking/booking.controller"
import { authorize } from '../../middleware/authorize.middleware';
import { Role } from '../../generated/prisma/enums';

const router = Router();


router.post("/", authenticate, createBooking);
router.get("/me", authenticate, myBookings);
router.get("/", authenticate, authorize(Role.ADMIN), getBookings);
router.get("/:id", authenticate, getBookingById);
router.delete("/:id", authenticate, deleteBooking);

export default router;