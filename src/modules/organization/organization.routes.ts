import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import {
  createOrganization,
  getOrganizationController,
} from "./organization.controller";
import { loadOrganizationContext } from "../../middleware/organization.middleware";

const router = Router();

router.post("/", authenticate, createOrganization);
router.get(
  "/:organizationId",
  authenticate,
  loadOrganizationContext,
  getOrganizationController,
);

export default router;
