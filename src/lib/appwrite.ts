import "server-only"; // This file will only be included in the server build

import { Client, Account } from "node-appwrite";

import { env } from "@/lib/env";

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(env.NEXT_APPWRITE_API_KEY);

    return {
        get account() {
            return new Account(client);
        },
    };
}
