import { z } from "zod";

// Define client-accessible environment variables
const clientEnvSchema = z.object({
    NEXT_PUBLIC_PORT: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string(),
});

// Parse and validate client environment variables
const parsedClientEnv = clientEnvSchema.safeParse({
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
});

// Handle validation errors with detailed messages
if (!parsedClientEnv.success) {
    const formattedErrors = parsedClientEnv.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n\t");

    // eslint-disable-next-line no-console
    console.error(
        "Client environment variables validation failed:",
        formattedErrors
    );

    throw new Error(
        `Invalid client environment variables: \n\t${formattedErrors}`
    );
}

// Export validated client environment variables
export const envClient = parsedClientEnv.data;
