import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { loadOrganizationContext } from "../../middleware/organization.middleware";
import { authorizePermission } from "../../middleware/permission.middleware";
import { PERMISSIONS } from "../../constants/permissions";
import { addMemberController } from "./member.controller";

const router = Router();

router.post(
  "/organizations/:organizationId/members",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.MEMBER_INVITE),
  addMemberController,
);

export default router;
