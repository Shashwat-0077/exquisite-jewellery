"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useCartStore from "@/store/cartStore";

import QuantityCounter from "../ui/QuantityCounter";
import { Button } from "../ui/button";

type Props = {
    prodID: string;
    prodPrice: number;
    prodImage: string;
    prodTitle: string;
};

export default function AddToCart({
    prodID,
    prodPrice,
    prodImage,
    prodTitle,
}: Props) {
    const [prodCount, setProdCount] = useState(1);
    const queryClient = useQueryClient();
    const {
        cartItems,
        addItemToCart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
    } = useCartStore();

    useEffect(() => {
        setProdCount(getItemQuantity(prodID) || 1);
    }, [cartItems, prodID, getItemQuantity]);

    return (
        <>
            <QuantityCounter
                className="w-full"
                counter={prodCount}
                setCounter={setProdCount}
                onIncrement={() => {
                    increaseItemQuantity(prodID);
                }}
                onDecrement={() => {
                    decreaseItemQuantity(prodID);
                }}
            />
            <Button
                variant={"outline"}
                className="mt-0 block h-full w-full border-black"
                onClick={(e) => {
                    e.preventDefault();
                    addItemToCart(
                        prodID,
                        prodPrice,
                        prodCount,
                        prodImage,
                        prodTitle
                    );
                    queryClient.invalidateQueries({
                        queryKey: ["cart-items"],
                    });
                }}
            >
                Add to cart
            </Button>
        </>
    );
}
