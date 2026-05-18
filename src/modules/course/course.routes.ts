import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import { loadOrganizationContext } from "../../middleware/organization.middleware";

import { authorizePermission } from "../../middleware/permission.middleware";

import {
  createCourseController,
  getOrganizationCoursesController,
} from "./course.controller";

import { PERMISSIONS } from "../../constants/permissions";

const router = Router();

router.post(
  "/organizations/:organizationId/courses",
  authenticate,
  loadOrganizationContext,
  authorizePermission(PERMISSIONS.COURSE_CREATE),
  createCourseController,
);

router.get(
  "/organizations/:organizationId/courses",
  authenticate,
  loadOrganizationContext,
  getOrganizationCoursesController,
);

export default router;
