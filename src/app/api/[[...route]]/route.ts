import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

import orders from "./orders";
import products from "./products";
import categories from "./categories";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse();
    }

    return c.json({ error: "Internal error" }, 500);
});

const routes = app
    .route("/products", products)
    .route("/orders", orders)
    .route("/categories", categories);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
