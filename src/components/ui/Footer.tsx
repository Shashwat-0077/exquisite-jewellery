"use client";
import { usePathname } from "next/navigation";
import React from "react";

const hiddenOnPathNames = ["/checkout"];

export default function Footer() {
    const pathName = usePathname();

    return hiddenOnPathNames.includes(pathName) ? (
        <></>
    ) : (
        <section className="mt-10 grid min-h-[200px] place-content-center bg-[#D9D9D9]">
            Footer
        </section>
    );
}
