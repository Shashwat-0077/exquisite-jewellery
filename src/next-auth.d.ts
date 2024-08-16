import { type DefaultSession } from "next-auth";
// eslint-disable-next-line
import { JWT } from "next-auth/jwt";
import { UserRoleType } from "./db/schema";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRoleType;
};

declare module "next-auth" {
    // eslint-disable-next-line
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    // eslint-disable-next-line
    interface JWT {
        role?: UserRoleType;
    }
}
