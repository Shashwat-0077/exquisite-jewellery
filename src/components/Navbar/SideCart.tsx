"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import useCartStore from "@/store/cartStore";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";

import CartItemCard from "./CartItemCard";

export default function SideCart({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const { cartItems, totalPrice } = useCartStore();

    return (
        <Sheet open={open} onOpenChange={handleOpen}>
            <SheetContent className="flex w-[300px] max-w-[auto] flex-col justify-between gap-0 p-0 text-black sm:w-[450px] sm:max-w-[auto]">
                <div className="p-6 pb-0 pr-0">
                    <SheetHeader>
                        <SheetTitle className="text-left text-2xl">
                            Shopping Cart
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>

                    <ScrollArea className="!scrollbar-track-gray-100 !scrollbar-thumb-red-700 h-[calc(100svh-210px)] pr-6">
                        <div className="grid grid-cols-[2fr_1fr] gap-x-3 gap-y-5">
                            {cartItems?.map((val, index) => (
                                <CartItemCard
                                    key={index}
                                    prodID={val.id}
                                    prodImage={val.image}
                                    prodPrice={val.price}
                                    prodTitle={val.title}
                                    prodQuant={val.quantity}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <SheetFooter className="w-full p-6 pt-0 [box-shadow:rgba(0,_0,_0,_0.35)_0px_5px_15px]">
                    <div className="w-full">
                        <div className="flex justify-between px-2 py-6">
                            <p className="text-xl font-bold">Subtotal</p>
                            <p className="text-xl font-bold">
                                &#8377;{totalPrice}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button className="w-full py-6">Check out</Button>
                            <Button
                                className="w-full py-6"
                                onClick={() => {
                                    router.push("/cart");
                                }}
                            >
                                View Cart
                            </Button>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
