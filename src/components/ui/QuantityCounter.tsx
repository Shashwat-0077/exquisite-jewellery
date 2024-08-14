"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    className: string;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

export default function QuantityCounter({
    className,
    counter,
    setCounter,
    onIncrement,
    onDecrement,
}: Props) {
    const increaseCounter = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setCounter((prevState) => {
            return prevState + 1;
        });
        onIncrement && onIncrement();
    };

    const decreaseCounter = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (!(counter > 1)) {
            return;
        }

        setCounter((prevState) => {
            return prevState - 1;
        });
        onDecrement && onDecrement();
    };

    return (
        <div
            className={cn(
                "flex w-[120px] items-center justify-between overflow-hidden rounded-md bg-[#f2f2f2]",
                className
            )}
        >
            <Button
                className="bg-transparent px-2 text-black shadow-none hover:bg-transparent md:px-4"
                onClick={decreaseCounter}
            >
                <Minus size={15} />
            </Button>
            <p className="basis-[100px] text-center">{counter}</p>
            <Button
                className="bg-transparent px-2 text-black shadow-none hover:bg-transparent md:px-4"
                onClick={increaseCounter}
            >
                <Plus size={15} />
            </Button>
        </div>
    );
}
