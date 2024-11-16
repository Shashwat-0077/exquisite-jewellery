import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.string(),
    NEXT_PUBLIC_PORT: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsedEnv.success) {
    // eslint-disable-next-line no-console
    console.error(
        "Environment variables validation failed:",
        parsedEnv.error.format()
    );
    throw new Error("Invalid NEXT_PUBLIC environment variables");
}

export const env = parsedEnv.data;
