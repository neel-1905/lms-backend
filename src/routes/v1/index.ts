import { Router } from "express";

import authRoutes from "../../modules/auth/auth.routes";
import organizationRoutes from "../../modules/organization/organization.routes";
import courseRoutes from "../../modules/course/course.routes";
import roleRoutes from "../../modules/role/role.routes";
import memberRoutes from "../../modules/member/member.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/organization", organizationRoutes);
router.use(courseRoutes);
router.use(roleRoutes);
router.use(memberRoutes);

export default router;
