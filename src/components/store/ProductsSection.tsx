"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";

import ProductCard from "../ui/ProductCard";

export default function ProductsSection() {
    // TODO : Add a functionality to add offset for the image while adding the image to the db so that the admin can choose how the picture will look in the page

    const searchParams = useSearchParams();
    const filterMin = searchParams.get("min");
    const filterMax = searchParams.get("max");
    const filterCategories = searchParams.get("categories");

    const { data, isLoading, error } = useQuery({
        queryKey: [
            "products",
            {
                min: filterMin || "",
                max: filterMax || "",
                categories: filterCategories || [],
            },
        ],
        queryFn: async () => {
            const response = await client.api.products.$get({
                query: {
                    minPrice: filterMin ?? undefined,
                    maxPrice: filterMax ?? undefined,
                    categories: filterCategories ?? undefined,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const { data } = await response.json();
            return data;
        },
    });

    if (isLoading) {
        return "loading...";
    }
    if (error) {
        return <p>{JSON.stringify(error)}</p>;
    }

    return (
        <div className="grid w-full grid-cols-2 gap-x-9 gap-y-12 lg:grid-cols-3">
            {/* TODO : add a np product found template */}
            {data?.length === 0 ? "No products found" : ""}
            {data?.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    price={product.price}
                    imgSrc={product.image}
                    id={product.ID}
                />
            ))}
        </div>
    );
}
