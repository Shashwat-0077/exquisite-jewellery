"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import useCartStore from "@/store/cartStore";

import ImageWithFallback from "../ui/ImageWithFallback";
import QuantityCounter from "../ui/QuantityCounter";

type PropType = {
    prodImage: string;
    prodTitle: string;
    prodID: string;
    prodQuant: number;
    prodPrice: number;
};

export default function CartItemCard({
    prodID,
    prodTitle,
    prodImage,
    prodPrice,
    prodQuant,
}: PropType) {
    const {
        cartItems,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemQuantity,
    } = useCartStore();

    const [prodCount, setProdCount] = useState(prodQuant);

    useEffect(() => {
        setProdCount(getItemQuantity(prodID));
    }, [cartItems, prodID, getItemQuantity]);

    return (
        <React.Fragment>
            <div className="flex gap-2">
                <div className="w-[80px] flex-shrink-0">
                    <ImageWithFallback
                        src={prodImage}
                        alt="image"
                        aspectRatio={1 / 1}
                    />
                </div>
                <div className="mb-1 flex flex-col justify-center gap-2">
                    <h1 className="mb-1 font-bold">{prodTitle}</h1>
                    <Trash2
                        size={18}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => {
                            removeItemFromCart(prodID);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-end justify-center">
                <p className="pr-3">&#8377; {prodPrice}</p>
                <QuantityCounter
                    className="mt-2"
                    counter={prodCount}
                    setCounter={setProdCount}
                    onIncrement={() => {
                        increaseItemQuantity(prodID);
                    }}
                    onDecrement={() => {
                        decreaseItemQuantity(prodID);
                    }}
                />
            </div>
        </React.Fragment>
    );
}
