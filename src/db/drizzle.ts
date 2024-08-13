import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const client = createClient({
    url:
        process.env.NODE_ENV === "production"
            ? process.env.TURSO_CONNECTION_URL!
            : process.env.TURSO_LOCAL_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client, { schema });
