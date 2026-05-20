import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { loadOrganizationContext } from "../../middleware/organization.middleware";
import { authorizePermission } from "../../middleware/permission.middleware";
import { PERMISSIONS } from "../../constants/permissions";
import {
  assignPermissionsController,
  createRoleController,
  getRolesController,
  updateRolePermissionsController,
} from "./role.controller";

const router = Router();

router.post(
  "/organizations/:organizationId/roles",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.ROLE_MANAGE),
  createRoleController,
);

router.post(
  "/organizations/:organizationId/roles/:roleId/permissions",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.ROLE_MANAGE),
  assignPermissionsController,
);

router.get(
  "/organizations/:organizationId/roles",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.ROLE_MANAGE),
  getRolesController,
);

router.put(
  "/organizations/:organizationId/roles/:roleId/permissions",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.ROLE_MANAGE),
  updateRolePermissionsController,
);

export default router;
