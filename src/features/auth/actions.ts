import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

import { env } from "@/lib/env";

import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
    try {
        const client = new Client()
            .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) {
            return null;
        }

        client.setSession(session.value);
        const account = new Account(client);

        return await account.get();
    } catch {
        return null;
    }
};
