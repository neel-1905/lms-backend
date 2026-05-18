export const PERMISSIONS = {
  ORGANIZATION_MANAGE: "organization.manage",

  ROLE_MANAGE: "role.manage",

  MEMBER_INVITE: "member.invite",

  COURSE_CREATE: "course.create",

  COURSE_UPDATE: "course.update",

  COURSE_DELETE: "course.delete",
} as const;

export const PERMISSIONS_ARRAY = Object.values(PERMISSIONS);
