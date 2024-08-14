import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { CategoryInsertSchema } from "@/db/types";

const app = new Hono().post(
    "/",
    zValidator(
        "json",
        // TODO : ADD UTH
        CategoryInsertSchema.array()
    ),
    async (c) => {
        const cats = c.req.valid("json");

        for (let cat of cats) {
            await db.insert(categories).values(cat);
        }

        return c.json({ message: "Inserted all entries" });
    }
);

export default app;
