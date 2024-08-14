import Image from "next/image";
import React from "react";

const IMAGES = ["earrings", "bracelet", "necklace", "ring", "luxe"];

export default function Categories() {
    return (
        <>
            <section className="mb-40 mt-40 flex flex-col items-center justify-center md:mb-72">
                <h1 className="relative mb-10 flex w-full justify-center text-[40px]">
                    <div className="w-min bg-white px-8">Categories</div>
                    <div className="absolute top-1/2 -z-10 h-[2px] w-[calc(100%-50px)] bg-black sm:w-[calc(100%-200px)]" />
                </h1>
                <div className="grid w-full max-w-[1600px] grid-cols-1 sm:px-7 md:grid-cols-5">
                    {IMAGES.map((image, index) => (
                        <div
                            key={index}
                            className="group relative h-full w-full overflow-hidden bg-cover bg-center transition-all"
                        >
                            <div className="relative aspect-[3.5/5] w-full overflow-hidden">
                                <Image
                                    className="absolute -z-10 h-full w-full object-cover transition-all group-hover:scale-125"
                                    src={`/${image}.jpg`}
                                    fill
                                    alt={image}
                                />
                                <p className="grid h-full w-full place-content-center bg-black/70 text-center text-[20px] font-thin uppercase text-white transition-all [transition-delay:50ms] group-hover:bg-black/10 lg:text-[30px]">
                                    {image}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
