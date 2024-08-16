import { v4 as uuid } from "uuid";
import {
    integer,
    primaryKey,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const users = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: text("emailVerified"),
    image: text("image"),
    role: text("role", { enum: ["ADMIN", "USER"] }).default("USER"),
});
export type UserRoleType = "ADMIN" | "USER";
export const userRelations = relations(users, ({ many }) => ({
    accounts: many(account),
}));

export const account = sqliteTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type"),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);
export const accountRelations = relations(account, ({ one }) => ({
    user: one(users, {
        fields: [account.userId],
        references: [users.id],
    }),
}));

export const products = sqliteTable("products", {
    ID: text("id")
        .primaryKey()
        .$defaultFn(() => uuid()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    category: integer("category")
        .notNull()
        .references(() => categories.ID),
});

export const categories = sqliteTable("categories", {
    ID: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
});

export const orders = sqliteTable("orders", {
    ID: text("id")
        .primaryKey()
        .$defaultFn(() => uuid()),
    country: text("country").notNull(),
    ownerName: text("owners_name").notNull(),
    apartment: text("apartment").notNull(),
    landmark: text("landmark").notNull(),
    city: text("city").notNull(),
    PINcode: text("PINcode").notNull(),
    district: text("district").notNull(),
    state: text("state").notNull(),
    createdAt: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    phoneNumber: text("phone_number").notNull(),
    discountCodeID: text("discount_code_id").references(() => Coupons.ID, {
        onDelete: "restrict",
    }),
});

export const ordersToProducts = sqliteTable(
    "orders_to_products",
    {
        orderID: text("order_ID")
            .notNull()
            .references(() => orders.ID),
        productID: text("product_ID")
            .notNull()
            .references(() => products.ID),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.orderID, table.productID] }),
    })
);

export const Coupons = sqliteTable("coupons", {
    ID: text("id")
        .primaryKey()
        .$defaultFn(() => uuid()),
    code: text("code").unique().notNull(),
    discountAmount: integer("discount_amount").notNull(),
    uses: integer("uses").default(0),
    isActive: integer("is_active", { mode: "boolean" }).default(true),
    allProducts: integer("all_products", { mode: "boolean" }).default(false),
    createdAt: text("created_at")
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    expiresAt: text("expires_at"),
    discountType: text("discount_type", { enum: ["FIXED", "PERCENTAGE"] }),
});
export type CouponType = "FIXED" | "PERCENTAGE";

export const CouponsToProducts = sqliteTable(
    "coupons_to_products",
    {
        couponID: text("coupon_ID")
            .notNull()
            .references(() => Coupons.ID),
        productID: text("product_ID")
            .notNull()
            .references(() => products.ID),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.couponID, table.productID] }),
    })
);
