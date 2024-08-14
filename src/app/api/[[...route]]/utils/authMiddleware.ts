import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

import { auth } from "@/auth";

export const authMiddleWare = async (c: Context, next: () => Promise<void>) => {
    const session = await auth();

    if (!session?.user) {
        throw new HTTPException(401, {
            res: c.json({ error: "Unauthorized" }, 401),
        });
    }
    c.set("user", session.user);
    await next();
};
