import { NextFunction, Request, Response } from "express";
import { createCourseSchema } from "./course.validation";
import { createCourse, getOrganizationCourses } from "./course.service";

export async function createCourseController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createCourseSchema.parse(req.body);

    const course = await createCourse({
      ...validatedData,
      membershipId: req.membership!.id,
      organizationId: req.organization!.id,
    });

    return res.status(201).json({
      success: true,

      data: course,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrganizationCoursesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const courses = await getOrganizationCourses(req.organization!.id);

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
}
