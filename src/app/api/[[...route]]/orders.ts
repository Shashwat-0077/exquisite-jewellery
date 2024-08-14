import { Hono } from "hono";
import { sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { OrderInsertSchema } from "@/db/types";
import { orders, ordersToProducts, products } from "@/db/schema";

const app = new Hono()
    .get("/", async (_c) => {})
    .post("/", zValidator("form", OrderInsertSchema), (c) => {
        return c.json({ message: "Yet to implement" });
    })
    // NOTE : This is only for development
    // TODO : Remove this
    .post("/bulk", zValidator("json", OrderInsertSchema.array()), async (c) => {
        let count = 0;
        const orderList = c.req.valid("json");
        const orderIDs = [];

        for (let order of orderList) {
            const [or] = await db
                .insert(orders)
                .values(order)
                .returning({ ID: orders.ID });

            orderIDs.push(or.ID);
            count++;
        }

        for (let orderID of orderIDs) {
            const prods = await db
                .select({ ID: products.ID })
                .from(products)
                .orderBy(sql`RANDOM()`)
                .limit(3);

            for (let prodID of prods) {
                await db.insert(ordersToProducts).values({
                    orderID: orderID,
                    productID: prodID.ID,
                });
            }
        }

        return c.json({ message: `Inserted ${count} records` });
    });

export default app;
