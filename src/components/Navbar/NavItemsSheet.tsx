import { Heart, Menu, UserRound } from "lucide-react";
import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NavItemsSheet() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu color="#ffffff" className="md:hidden" />
            </SheetTrigger>
            <SheetContent
                side={"left"}
                className="flex flex-col justify-between"
            >
                <div>
                    <SheetHeader>
                        <SheetTitle className="text-left">
                            Navigation
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <ul className="flex flex-col items-start space-y-2 pt-2 text-black">
                        <li className="group cursor-pointer">
                            <Link href={"/store?q=earrings"}>
                                <p>Earrings</p>
                                <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                            </Link>
                        </li>
                        <li className="group cursor-pointer">
                            <Link href={"/store?q=rings"}>
                                <p>Rings</p>
                                <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                            </Link>
                        </li>
                        <li className="group cursor-pointer">
                            <Link href={"/store?q=necklace"}>
                                <p>Necklace</p>
                                <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                            </Link>
                        </li>
                        <li className="group cursor-pointer">
                            <Link href={"/store?q=bracelets"}>
                                <p>Bracelets</p>
                                <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                            </Link>
                        </li>
                        <li className="group cursor-pointer">
                            <Link href={"/store?q=luxe"}>
                                <p>Luxe</p>
                                <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <SheetFooter className="flex !flex-col">
                    <Input type="search" className="border-black" />
                    <div className="!m-0 flex justify-between gap-2 pt-5">
                        <Button className="w-full">
                            <Heart
                                className="cursor-pointer"
                                strokeWidth={1.5}
                                absoluteStrokeWidth
                            />
                        </Button>
                        <Button className="w-full">
                            <UserRound
                                className="cursor-pointer"
                                strokeWidth={1.5}
                                absoluteStrokeWidth
                            />
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
