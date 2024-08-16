import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";

import { db } from "./db/drizzle";
import authConfig from "./auth.config";
import { users } from "./db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },

    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.id, token.sub));
            if (!user) {
                return token;
            }

            token.role = user.role!;

            return token;
        },
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
