import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

import ProductsSection from "@/components/store/ProductsSection";
import Filters from "@/components/store/filters";
import { getProductsByFilters } from "@/services/products";

export default async function Store({
    searchParams,
}: {
    searchParams: { min: string; max: string; categories: string };
}) {
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
            const data = getProductsByFilters({
                filterMaxPrice: parsedMaxPrice,
                filterMinPrice: parsedMinPrice,
                filterCategories: parsedCategory,
            });
            // console.log(data); // Debugging log
            return data;
        },
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <div className="mt-10 flex min-h-[calc(100svh-80px)] px-7 lg:gap-10">
            <Filters />
            <HydrationBoundary state={dehydratedState}>
                <ProductsSection />
            </HydrationBoundary>
        </div>
    );
}
