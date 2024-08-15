import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const GetBulkSchema = z.object({
    ids: z
        .string({ required_error: "IDs are required" })
        .transform<string[]>((val) => {
            try {
                return JSON.parse(val);
            } catch (error) {
                throw new HTTPException(400, { message: "Invalid Query" });
            }
        }),
});

export const GetByQuerySchema = z.object({
    minPrice: z
        .string()
        .transform<number>((val) => parseInt(val))
        .optional(),
    maxPrice: z
        .string()
        .transform<number>((val) => parseInt(val))
        .optional(),
    categories: z
        .string()
        .transform<string[]>((val) => JSON.parse(val))
        .optional(),
    limit: z.number().optional(),
    random: z.boolean().optional(),
});
