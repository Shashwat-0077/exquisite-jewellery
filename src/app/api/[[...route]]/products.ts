import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq, inArray } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { products } from "@/db/schema";
import { getProductsByFilters } from "@/services/products";
import { ProductEditSchema, ProductInsertSchema } from "@/db/types";

import { GetBulkSchema, GetByQuerySchema } from "./schema/products";

const app = new Hono()
    //  Get by query
    .get("/", zValidator("query", GetByQuerySchema), async (c) => {
        const { minPrice, maxPrice, categories, limit, random } =
            c.req.valid("query");

        const data = await getProductsByFilters({
            filterLimit: limit,
            filterMinPrice: minPrice,
            filterMaxPrice: maxPrice,
            filterCategories: categories,
            random,
        });

        return c.json({ data });
    })
    // Get bulk by id
    .get("/bulk", zValidator("query", GetBulkSchema), async (c) => {
        const { ids } = c.req.valid("query");

        const data = await db
            .select()
            .from(products)
            .where(inArray(products.ID, ids));

        return c.json({ data });
    })
    // Get by id
    .get(
        "/:id",
        zValidator("param", z.object({ id: z.string() })),
        async (c) => {
            const { id } = c.req.valid("param");
            const [data] = await db
                .select()
                .from(products)
                .where(eq(products.ID, id));

            return c.json({ data: data });
        }
    )
    .post("/", zValidator("json", ProductInsertSchema), async (c) => {
        const { title, price, description, category, image } =
            c.req.valid("json");

        // By default drizzle always return the array as the SQl's also returns the array, if want a single entry, we have to know that's that entry is unique and destructure the first result with an array destructuring
        const [data] = await db
            .insert(products)
            .values({
                title,
                price,
                description,
                category,
                image,
            })
            .returning();

        return c.json({ data });
    })
    .post(
        "/insert-many",
        zValidator("json", z.array(ProductInsertSchema)),
        async (c) => {
            const values = c.req.valid("json");
            let count = 0;

            for (let product of values) {
                await db
                    .insert(products)
                    .values({
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        image: product.image,
                    })
                    .returning();
                count++;
            }

            return c.json({ msg: `Inserted ${count} item(s)` });
        }
    )
    .put(
        "/:id",
        zValidator("param", z.object({ id: z.string() })),
        zValidator("json", ProductEditSchema),
        async (c) => {
            const { id } = c.req.valid("param");
            const values = c.req.valid("json");

            await db.update(products).set(values).where(eq(products.ID, id));

            return c.json({ message: "yet to be implemented" });
        }
    )
    .delete(
        "/:id",
        zValidator("param", z.object({ id: z.string() })),
        async (c) => {
            const { id } = c.req.valid("param");

            const [data] = await db
                .delete(products)
                .where(eq(products.ID, id))
                .returning({ prodID: products.ID });

            return c.json({ message: data.prodID + " is deleted" });
        }
    );

export default app;
