import consola from "consola";
import { migrate } from "drizzle-orm/libsql/migrator";

import { db } from "@/db/drizzle";

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
