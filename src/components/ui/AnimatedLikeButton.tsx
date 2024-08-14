"use client";
import { useState } from "react";

import { useWishlistStore } from "@/store/wishlist";

type ParamsTypes = {
    width: number;
    height: number;
    productID: string;
    parentOnclick?: () => void;
};

// BUG : Animation triggers on reload, it should not 🙂🙂

export default function AnimatedLikeButton({
    width,
    height,
    productID,
    parentOnclick,
}: ParamsTypes) {
    const { wishlistIds, addWishlistId, removeWishlistId } = useWishlistStore();

    const [isChecked, setIsChecked] = useState(
        wishlistIds?.includes(productID) ? true : false
    );

    function handleOnClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        if (!isChecked) {
            addWishlistId(productID);
        } else {
            removeWishlistId(productID);
        }
        setIsChecked(!isChecked);

        if (parentOnclick) {
            parentOnclick();
        }
    }

    return (
        <div
            className={`relative [transition-duration:0.3s]`}
            style={{
                width: (width ?? 50) + "px",
                height: (height ?? 50) + "px",
            }}
        >
            <input
                type="checkbox"
                className="absolute left-0 top-0 z-20 h-full w-full cursor-pointer opacity-0"
                onClick={handleOnClick}
            />
            <div className="flex h-full w-full items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute stroke-[rgb(255,91,137)]"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <svg
                    viewBox="0 0 24 24"
                    stroke="rgb(255,91,137)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgb(255,91,137)"
                    className={`absolute animate-[keyframes-svg-filled_1s] ${
                        isChecked ? "block" : "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <svg
                    className={`absolute animate-[keyframes-svg-celebrate_0.5s] stroke-[2px] [animation-fill-mode:forwards] ${
                        isChecked ? "block" : "hidden"
                    }`}
                    viewBox="0 0 100 100"
                    stroke="rgb(255,91,137)"
                    fill="rgb(255,91,137)"
                    width={width * 2}
                    height={height * 2}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
    );
}
