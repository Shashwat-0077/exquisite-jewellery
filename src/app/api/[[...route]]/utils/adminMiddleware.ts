import { Context } from "hono";

export const adminMiddleware = async (
    c: Context,
    next: () => Promise<void>,
) => {
    // TODO : implement the admin check
    await next();
};
