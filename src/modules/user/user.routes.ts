import Router from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { Role } from "../../generated/prisma/enums";
import { updateRole } from "../user/user.controller";

const router = Router();

router.put("/:id/role", authenticate, authorize(Role.ADMIN), updateRole)


export default router;