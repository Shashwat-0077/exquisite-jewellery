export const adminMiddleware = async (next: () => Promise<void>) => {
    // TODO : implement the admin check
    await next();
};
