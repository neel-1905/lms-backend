import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { createOrganization } from "./organization.controller";

const router = Router();

router.post("/", authenticate, createOrganization);

export default router;
