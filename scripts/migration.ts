import { createClient } from "@libsql/client";
import consola from "consola";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import "dotenv/config";

const client = createClient({
    url:
        process.argv.slice(2)[0] === "production"
            ? process.env.TURSO_CONNECTION_URL!
            : process.env.TURSO_LOCAL_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client);

const main = async () => {
    try {
        consola.info("Running Migration");
        await migrate(db, { migrationsFolder: "drizzle" });
        consola.success("Migration completed");
    } catch (error) {
        consola.error("Error during migration:", error);
        process.exit(1);
    }
};
main();
