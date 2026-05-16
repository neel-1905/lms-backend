import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import organizationRoutes from "../../modules/organization/organization.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/organization", organizationRoutes);

export default router;
