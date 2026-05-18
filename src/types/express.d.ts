import { Membership, Organization, User } from "../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;

      organization?: Organization;

      membership?: Membership;
    }
  }
}
