"use client";

import Link from "next/link";
import Image from "next/image";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Heart, Loader2, Search, ShoppingCart, UserRound } from "lucide-react";

import { useNavStore } from "@/store/navBarState";

import ImageWithFallback from "../ui/ImageWithFallback";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import NavItemsSheet from "./NavItemsSheet";
import SideCart from "./SideCart";

const hiddenOnPathNames = ["/checkout"];
const adminRoute = "/admin";

export default function Navbar() {
    // TODO : close the sheet when we redirect
    const router = useRouter();
    const pathName = usePathname();

    const { data, status } = useSession();

    const [cartOpen, setCartOpen] = useState(false);
    const [lastScroll, setLastScroll] = useState(-999);
    const { isVisible, setIsVisible } = useNavStore((state) => state);
    const isMobile = useMedia("(max-width: 768px)", false);

    const handleNavScroll = () => {
        if (window.scrollY < 80) {
            setIsVisible(true);
            return;
        }
        if (window.scrollY < lastScroll) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        setLastScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNavScroll);

        return () => {
            window.removeEventListener("scroll", handleNavScroll);
        };
    });

    return hiddenOnPathNames.includes(pathName) ||
        pathName.startsWith(adminRoute) ? (
        <></>
    ) : (
        <nav
            className={`sticky left-0 top-0 z-50 flex items-center justify-between bg-primary px-14 py-2 ${
                !isVisible ? "-translate-y-full" : ""
            } transition-all duration-200`}
        >
            {isMobile ? (
                <div className="flex w-full items-center justify-between">
                    <NavItemsSheet />
                    <Link className="relative h-[70px] w-[70px]" href={"/"}>
                        <Image
                            fill
                            priority
                            src="/logo.png"
                            alt="logo"
                            className="object-cover hover:cursor-pointer"
                        />
                    </Link>
                    <ShoppingCart
                        className="cursor-pointer"
                        color="#fff"
                        strokeWidth={1.5}
                        onClick={() => setCartOpen(true)}
                        absoluteStrokeWidth
                    />
                </div>
            ) : (
                <>
                    <div className="flex w-auto justify-start space-x-5">
                        <Link className="relative h-[70px] w-[70px]" href={"/"}>
                            <Image
                                fill
                                priority
                                src="/logo.png"
                                alt="logo"
                                className="object-cover hover:cursor-pointer"
                            />
                        </Link>
                        <ul className="hidden items-center space-x-5 pt-2 text-white md:flex">
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"earrings"%5D`}
                                >
                                    <p>Earrings</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"rings"%5D`}
                                >
                                    <p>Rings</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"necklaces"%5D`}
                                >
                                    <p>Necklaces</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"bracelets"%5D`}
                                >
                                    <p>Bracelets</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                            <li className="group cursor-pointer">
                                <Link
                                    href={`/products?categories=%5B"luxe"%5D`}
                                >
                                    <p>Luxe</p>
                                    <div className="h-[1px] w-0 bg-white transition-all group-hover:w-full"></div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden items-center space-x-5 pt-2 text-white md:flex">
                        <Heart
                            className="cursor-pointer"
                            strokeWidth={1.5}
                            absoluteStrokeWidth
                            onClick={() => {
                                router.push("/wishlist");
                            }}
                        />
                        <Search
                            className="cursor-pointer"
                            strokeWidth={1.5}
                            absoluteStrokeWidth
                        />
                        <ShoppingCart
                            className="cursor-pointer"
                            color="#fff"
                            strokeWidth={1.5}
                            absoluteStrokeWidth
                            onClick={() => setCartOpen(true)}
                        />

                        {status !== "loading" ? (
                            status === "unauthenticated" ? (
                                <Link href={"/auth/login"}>
                                    <UserRound
                                        className="cursor-pointer"
                                        strokeWidth={1.5}
                                        absoluteStrokeWidth
                                    />
                                </Link>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="size-7 overflow-hidden rounded-full">
                                        <ImageWithFallback
                                            src={data?.user?.image || ""}
                                            alt="user"
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => {
                                                signOut();
                                            }}
                                        >
                                            Sing Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                    </div>
                </>
            )}

            <SideCart open={cartOpen} handleOpen={setCartOpen} />
        </nav>
    );
}
