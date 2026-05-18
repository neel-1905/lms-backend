import prisma from "../../lib/prisma";
import { CreateCourseInput } from "./course.validation";

type CreateCourseServiceInput = CreateCourseInput & {
  organizationId: string;
  membershipId: string;
};

export async function createCourse(data: CreateCourseServiceInput) {
  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      organizationId: data.organizationId,
      createdByMembershipId: data.membershipId,
    },
  });

  return course;
}

export async function getOrganizationCourses(organizationId: string) {
  const courses = await prisma.course.findMany({
    where: {
      organizationId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return courses;
}
