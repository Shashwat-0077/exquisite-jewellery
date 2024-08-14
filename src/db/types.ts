import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { products, categories, orders, users } from "./schema";

export const UserSchema = createInsertSchema(users);

export const ProductSchema = createSelectSchema(products);
export const ProductInsertSchema = createInsertSchema(products, {
    title: z.string({
        required_error: "Title is required and cannot be null.",
    }),
    description: z.string({
        required_error: "Description is required and cannot be null.",
    }),
    price: z.number({
        required_error: "Price is required and must be a valid number.",
    }),
    image: z.string({
        required_error: "Image URL is required and cannot be null.",
    }),
    category: z.number({
        required_error: "Category is required and must be a valid category ID.",
    }),
}).omit({ ID: true });
export const ProductEditSchema = ProductInsertSchema.partial();

export const CategorySchema = createSelectSchema(categories);
export const CategoryInsertSchema = createInsertSchema(categories, {
    name: z.string({
        required_error: "Name is required and cannot be null.",
    }),
}).omit({ ID: true });
export const CategoryEditSchema = CategoryInsertSchema.partial();

export const OrderSchema = createSelectSchema(orders);
export const OrderInsertSchema = createInsertSchema(orders, {
    country: z.string({
        required_error: "Country is required and cannot be null.",
    }),
    ownerName: z.string({
        required_error: "Owner's Name is required and cannot be null.",
    }),
    apartment: z.string({
        required_error: "Apartment is required and cannot be null.",
    }),
    landmark: z.string({
        required_error: "Landmark is required and cannot be null.",
    }),
    city: z.string({
        required_error: "City is required and cannot be null.",
    }),
    PINcode: z.string({
        required_error: "PIN code is required and cannot be null.",
    }),
    district: z.string({
        required_error: "District is required and cannot be null.",
    }),
    state: z.string({
        required_error: "State is required and cannot be null.",
    }),
    phoneNumber: z.string({
        required_error: "Phone number is required and cannot be null.",
    }),
}).omit({ ID: true, createdAt: true });
export const OrderEditSchema = OrderInsertSchema.partial();
