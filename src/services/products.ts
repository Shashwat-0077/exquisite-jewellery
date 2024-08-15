import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { categories, products } from "@/db/schema";

export const getProductsByFilters = async ({
    filterLimit,
    random,
    filterMinPrice,
    filterMaxPrice,
    filterCategories,
}: {
    filterLimit?: number;
    random?: boolean;
    filterMinPrice?: number;
    filterMaxPrice?: number;
    filterCategories?: string[];
}) => {
    // Combine the queries for minPrice, maxPrice, and categories
    const [maxPriceResult, minPriceResult, categoriesResult] =
        await Promise.all([
            !filterMaxPrice
                ? db
                      .select({
                          value: sql<number>`MAX(${products.price})`,
                      })
                      .from(products)
                : Promise.resolve([{ value: NaN }]),
            !filterMinPrice
                ? db
                      .select({
                          value: sql<number>`MIN(${products.price})`,
                      })
                      .from(products)
                : Promise.resolve([{ value: NaN }]),
            !filterCategories || filterCategories.length === 0
                ? db.select({ name: categories.name }).from(categories)
                : Promise.resolve([]),
        ]);

    const maxPrice = filterMaxPrice ?? maxPriceResult[0].value;
    const minPrice = filterMinPrice ?? minPriceResult[0].value;
    const cats =
        filterCategories && filterCategories.length > 0
            ? filterCategories
            : categoriesResult.map((val) => val.name);

    const query = db
        .select({
            ID: products.ID,
            title: products.title,
            description: products.description,
            image: products.image,
            price: products.price,
            categoryName: categories.name,
        })
        .from(products)
        .innerJoin(categories, eq(products.category, categories.ID))
        .where(
            and(
                gte(products.price, minPrice),
                lte(products.price, maxPrice),
                inArray(categories.name, cats)
            )
        );

    if (random) {
        query.orderBy(sql`RANDOM()`);
    }
    if (filterLimit) {
        query.limit(filterLimit);
    }

    const data = await query;
    return data;
};
