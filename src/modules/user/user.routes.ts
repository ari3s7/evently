import Router from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { Role } from "../../generated/prisma/enums";
import { updateRole, getMe, getAll, getById } from "../user/user.controller";

const router = Router();

router.put("/:id/role", authenticate, authorize(Role.ADMIN), updateRole);
router.get("/me", authenticate, getMe);
router.get("/", authenticate, authorize(Role.ADMIN), getAll);
router.get("/:id", authenticate, authorize(Role.ADMIN), getById);


export default router;