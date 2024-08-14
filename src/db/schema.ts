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
});
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
    }),
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
        .references(() => categories.ID)
        .notNull(),
});
export const productsRelations = relations(products, ({ one, many }) => ({
    ordersToProducts: many(ordersToProducts),
    category: one(categories, {
        fields: [products.category],
        references: [categories.ID],
    }),
}));

export const categories = sqliteTable("categories", {
    ID: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
});
export const categoryRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));

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
});
export const ordersRelations = relations(orders, ({ many }) => ({
    ordersToProducts: many(ordersToProducts),
}));

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

export const OrderToProductRelations = relations(
    ordersToProducts,
    ({ one }) => ({
        orders: one(orders, {
            fields: [ordersToProducts.orderID],
            references: [orders.ID],
        }),
        products: one(products, {
            fields: [ordersToProducts.productID],
            references: [products.ID],
        }),
    })
);
