import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import organizationRoutes from "../../modules/organization/organization.routes";
import courseRoutes from "../../modules/course/course.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/organization", organizationRoutes);
router.use(courseRoutes);

export default router;
