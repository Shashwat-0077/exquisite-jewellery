import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
    Account,
    Client,
    Databases,
    Storage,
    Models,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType,
} from "node-appwrite";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { env } from "@/lib/env";

type AuthContext = {
    Variables: {
        account: AccountType;
        databases: DatabasesType;
        storage: StorageType;
        users: UsersType;
        user: Models.User<Models.Preferences>;
    };
};

export const sessionMiddleware = createMiddleware<AuthContext>(
    async (c, next) => {
        // NOTE : This is a session based Appwrite SDK, which is used to authenticate the user.
        const client = new Client()
            .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

        const session = getCookie(c, AUTH_COOKIE);

        if (!session) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        // IMPORTANT: This client session should not be powerful enough to have the API key or change user data. It should only have the permissions of the currently logged-in user and should not have the rights to change data of other users.

        client.setSession(session);

        const account = new Account(client);
        const databases = new Databases(client);
        const storage = new Storage(client);

        const user = await account.get();

        c.set("account", account);
        c.set("databases", databases);
        c.set("storage", storage);
        c.set("user", user);

        await next();
    }
);
