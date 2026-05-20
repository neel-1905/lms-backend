import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import organizationRoutes from "../../modules/organization/organization.routes";
import courseRoutes from "../../modules/course/course.routes";
import roleRoutes from "../../modules/role/role.routes";
import memberRoutes from "../../modules/member/member.routes";
import { rateLimit } from "../../middleware/rate-limit.middleware";

const router = Router();

router.use(
  "/auth",
  rateLimit({ maxRequests: 3, windowInSeconds: 60 }),
  authRoutes,
);
router.use("/organization", organizationRoutes);
router.use(courseRoutes);
router.use(roleRoutes);
router.use(memberRoutes);

export default router;
