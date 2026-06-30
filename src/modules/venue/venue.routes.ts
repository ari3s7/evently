import Router from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue } from "./venue.controller"
import { authorize } from "../../middleware/authorize.middleware";
import { Role } from "../../generated/prisma/enums"

const router = Router();

router.post("/",authenticate, authorize(Role.ADMIN), createVenue);
router.get("/", getAllVenues);
router.get("/:id", getVenueById);
router.put("/:id", authenticate, authorize(Role.ADMIN), updateVenue);
router.delete("/:id", authenticate, authorize(Role.ADMIN), deleteVenue);

export default router;