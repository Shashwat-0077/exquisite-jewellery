"use client";
import consola from "consola";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import * as Slider from "@radix-ui/react-slider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// fetch it from server
const moreFilters = ["Rings", "Earrings", "Necklaces", "Bracelets", "Luxe"];

// TODO : fetch these values from the server
const MIN = 100;
const MAX = 15000;

export default function Filters() {
    // TODO : Make the the filter sheet, and make it responsive, item will be visible when screen is big, and hidden when screen is small

    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const [localCategories, setLocalCategories] = useState<string[]>([]);

    useEffect(() => {
        const items = JSON.parse(searchParams.get("categories") || "[]");
        try {
            setLocalCategories((prevArray) => {
                if (prevArray !== items) {
                    return items;
                }
                return prevArray;
            });
        } catch {
            setLocalCategories([]);
        }
    }, [searchParams]);

    // here the size of the array will always be 2 and first item will always be min and second item will always be max
    const [localMinmax, setLocalMinmax] = useState<[number, number]>([
        MIN,
        MAX,
    ]);

    // Checkboxes
    const handleCheckboxChange = (checked: CheckedState, value: string) => {
        value = value.toLowerCase();
        if (checked) {
            setLocalCategories([...localCategories, value]);
        } else {
            setLocalCategories(
                localCategories.filter((option) => option !== value)
            );
        }
    };

    // Two way slider
    const handleSliderChange = (newValues: [number, number]) => {
        setLocalMinmax(newValues);
        consola.info(localMinmax);
    };

    // Apply Changes
    const addQueryParam = () => {
        const params = new URLSearchParams();
        params.set("min", String(localMinmax[0]));
        params.set("max", String(localMinmax[1]));
        params.set("categories", JSON.stringify(localCategories));
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div
            className={
                "hidden max-h-svh min-w-[300px] max-w-[300px] basis-1/4 flex-col items-center space-y-10 overflow-hidden rounded-xl bg-gray-100 px-10 py-10 transition-all lg:flex"
            }
        >
            <h1 className="text-2xl">Filters</h1>
            <div className="flex items-center justify-center gap-3">
                <Checkbox />
                <Label>Include Out of Stock items</Label>
            </div>

            {/* TWO WAY SLIDER */}
            <div className="w-full space-y-3 self-start">
                <h2 className="pl-4">Price</h2>

                <div className={`flex w-full flex-col items-center`}>
                    <Slider.Root
                        className="relative flex h-5 w-full items-center"
                        value={localMinmax}
                        onValueChange={handleSliderChange}
                        min={MIN}
                        max={MAX}
                        step={1}
                    >
                        <Slider.Track className="relative h-1 flex-grow rounded-full bg-gray-300">
                            <Slider.Range className="absolute h-full rounded-full bg-black" />
                        </Slider.Track>
                        {localMinmax.map((value, index) => (
                            <Slider.Thumb
                                key={index}
                                defaultValue={value}
                                className={`block h-5 w-5 cursor-pointer rounded-full border-2 border-black bg-white ring-primary/30 transition-[box-shadow,_transform] focus-within:scale-125 focus-within:shadow-none focus-within:outline-none focus-within:ring`}
                            />
                        ))}
                    </Slider.Root>
                    <output className="flex items-center justify-center gap-3">
                        <Input
                            // defaultValue={localMinmax[0]}
                            value={localMinmax[0]}
                            type="number"
                            onChange={(e) => {
                                e.preventDefault();
                                setLocalMinmax([
                                    parseInt(e.target.value || "0") ?? 0,
                                    localMinmax[1],
                                ]);
                            }}
                            max={1500}
                            min={0}
                        />
                        <span>-</span>
                        <Input
                            // defaultValue={localMinmax[1]}
                            value={localMinmax[1]}
                            type="number"
                            onChange={(e) => {
                                e.preventDefault();
                                // if(e.target.value)
                                setLocalMinmax([
                                    localMinmax[0],
                                    parseInt(e.target.value || "0") ?? 0,
                                ]);
                            }}
                            max={1500}
                            min={0}
                        />
                    </output>
                </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 self-start">
                <h1 className="pl-4">More Filters</h1>
                <ul className="space-y-2">
                    {moreFilters.map((value, index) => (
                        <li key={index} className="flex gap-3">
                            <Checkbox
                                id={`filter-${value}`}
                                onCheckedChange={(checked) => {
                                    handleCheckboxChange(checked, value);
                                }}
                                checked={localCategories.includes(
                                    value.toLowerCase()
                                )}
                            />
                            <Label htmlFor={`filter-${value}`}>{value}</Label>
                        </li>
                    ))}
                </ul>
            </div>
            <Button onClick={addQueryParam}>Apply</Button>
        </div>
    );
    {
        /* // TODO : Make the side component for the filter for the mobile view */
    }
    <div className=""></div>;
}
