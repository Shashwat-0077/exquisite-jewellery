"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";

import LikeButton from "@/components/ui/AnimatedLikeButton";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import useCartStore from "@/store/cartStore";

type ProductParams = {
    title: string;
    price: number;
    imgSrc: string;
    id: string;
    className?: string;
};

export default function ProductCard({
    title,
    price,
    imgSrc,
    id,
    className,
}: ProductParams) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { addItemToCart } = useCartStore();
    const [clicked, setClicked] = useState(false);

    const handleAddToCartClick = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {
        e.preventDefault();
        addItemToCart(id, price, 1, imgSrc, title);
        queryClient.invalidateQueries({ queryKey: ["cart-items"] });
        setClicked(true);
    };

    useEffect(() => {
        if (clicked) {
            const timer = setTimeout(() => {
                setClicked(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [clicked]);

    return (
        <div className={className}>
            <div>
                <ImageWithFallback
                    key={"image" + id}
                    onClick={() => {
                        router.push(`/products/${id}`);
                    }}
                    src={imgSrc}
                    alt={imgSrc}
                    aspectRatio={1 / 1.2}
                    className="overflow-hidden hover:cursor-pointer"
                />
            </div>
            <div>
                <div className="flex flex-col items-start justify-between">
                    <div className="text-xl capitalize">{title}</div>
                    <div className="text-md">&#8377;{price}</div>
                </div>
                <div className="flex gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <LikeButton
                                    key={"like" + id}
                                    width={25}
                                    height={25}
                                    productID={id}
                                    parentOnclick={() => {
                                        // consola.info(id);
                                    }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to wishlist</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                {clicked ? (
                                    <Check />
                                ) : (
                                    <ShoppingCart
                                        onClick={handleAddToCartClick}
                                    />
                                )}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add to Cart</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
        // <Card
        //     className={cn(
        //         `overflow-hidden rounded-none border-0 shadow-none`,
        //         className,
        //     )}
        // >
        //     <CardHeader className="p-0">
        //         <ImageWithFallback
        //             key={"image" + id}
        //             onClick={() => {
        //                 router.push(`/products/${id}`);
        //             }}
        //             src={imgSrc}
        //             alt={imgSrc}
        //             aspectRatio={1 / 1.2}
        //             className="overflow-hidden hover:cursor-pointer"
        //         />
        //     </CardHeader>
        //     <CardContent className="mt-3 flex items-start justify-between p-0">
        //         <div className="flex flex-col items-start justify-between">
        //             <CardTitle className="text-xl capitalize">
        //                 {title}
        //             </CardTitle>
        //             <CardDescription className="text-md">
        //                 &#8377;{price}
        //             </CardDescription>
        //         </div>

        //         <div className="flex gap-3">
        //             <TooltipProvider>
        //                 <Tooltip>
        //                     <TooltipTrigger>
        //                         <LikeButton
        //                             key={"like" + id}
        //                             width={25}
        //                             height={25}
        //                             productID={id}
        //                             parentOnclick={() => {
        //                                 // consola.info(id);
        //                             }}
        //                         />
        //                     </TooltipTrigger>
        //                     <TooltipContent>
        //                         <p>Add to wishlist</p>
        //                     </TooltipContent>
        //                 </Tooltip>
        //                 <Tooltip>
        //                     <TooltipTrigger>
        //                         {clicked ? (
        //                             <Check />
        //                         ) : (
        //                             <ShoppingCart
        //                                 onClick={handleAddToCartClick}
        //                             />
        //                         )}
        //                     </TooltipTrigger>
        //                     <TooltipContent>
        //                         <p>Add to Cart</p>
        //                     </TooltipContent>
        //                 </Tooltip>
        //             </TooltipProvider>
        //         </div>
        //     </CardContent>
        // </Card>
    );
}
