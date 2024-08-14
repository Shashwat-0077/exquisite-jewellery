import { and, eq, gte, inArray, lte, sql } from "drizzle-orm";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

import ProductsSection from "@/components/store/ProductsSection";
import Filters from "@/components/store/filters";
import { db } from "@/db/drizzle";
import { categories, products } from "@/db/schema";

export default async function Store({
    searchParams,
}: {
    searchParams: { min: string; max: string; categories: string };
}) {
    // TODO : The backend server is not being used as much by the client and server components maybe drop the server get requests all together ??
    //  OR MAYBE
    // We can use fetch function that nextjs provides
    const {
        min: filterMinPrice,
        max: filterMaxPrice,
        categories: filterCategories,
    } = searchParams;

    // Pre processing
    const parsedMinPrice = parseInt(filterMinPrice) || undefined;
    const parsedMaxPrice = parseInt(filterMaxPrice) || undefined;
    let parsedCategory: string[] | undefined;
    try {
        parsedCategory = JSON.parse(filterCategories);
    } catch (error) {
        parsedCategory = undefined;
    }

    // fetching
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [
            "products",
            {
                min: filterMinPrice || "",
                max: filterMaxPrice || "",
                categories: filterCategories,
            },
        ],
        queryFn: async () => {
            const [minPriceResult, maxPriceResult, categoriesResult] =
                await Promise.all([
                    !parsedMinPrice
                        ? db
                              .select({
                                  value: sql<number>`MIN(${products.price})`,
                              })
                              .from(products)
                        : Promise.resolve([{ value: NaN }]),
                    !parsedMaxPrice
                        ? db
                              .select({
                                  value: sql<number>`MAX(${products.price})`,
                              })
                              .from(products)
                        : Promise.resolve([{ value: NaN }]),
                    !parsedCategory || parsedCategory.length === 0
                        ? db.select({ name: categories.name }).from(categories)
                        : Promise.resolve([]),
                ]);

            const minPrice = parsedMinPrice ?? minPriceResult[0].value;
            const maxPrice = parsedMaxPrice ?? maxPriceResult[0].value;
            const cats =
                parsedCategory && parsedCategory.length > 0
                    ? parsedCategory
                    : categoriesResult.map((val) => val.name);

            const data = await db
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
            // console.log(data); // Debugging log
            return data;
        },
    });

    const dehydratedState = dehydrate(queryClient);
    // console.log("Dehydrated state:", dehydratedState); // Debugging log

    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] px-7 lg:gap-10">
            <Filters />
            <HydrationBoundary state={dehydratedState}>
                <ProductsSection />
            </HydrationBoundary>
        </div>
    );
}
