import { config } from "dotenv";
import { defineConfig, type Config } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url:
            process.env.NODE_ENV === "production"
                ? process.env.TURSO_CONNECTION_URL!
                : process.env.TURSO_LOCAL_CONNECTION_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
    verbose: true,
    strict: true,
} satisfies Config);
