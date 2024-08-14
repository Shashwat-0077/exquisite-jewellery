import Image from "next/image";
import React from "react";

import Quotes from "@/SVGs/Quotes";

export default function Testimonials() {
    return (
        <section className="relative flex flex-col items-center justify-center px-10 font-[arial] 2xl:px-60">
            <h1 className="flex flex-col items-center text-center text-4xl font-bold text-primary">
                Testimonials
                <div className="mt-5 h-[1px] w-[100px] bg-primary md:w-[400px]"></div>
            </h1>
            <div className="flex flex-col md:gap-10 lg:flex-row">
                <div className="mt-20 flex basis-1/3 flex-col items-center rounded-lg bg-[#EDEFEC] pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute h-[100px] w-[100px] -translate-y-1/2 rounded-full border-[10px] border-white bg-white object-cover"
                    />
                    <p className="relative mx-16 mt-16 text-center text-[16px] leading-relaxed">
                        <Quotes className="mr-2 inline w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline w-[20px] -translate-y-1/3 rotate-180" />
                    </p>
                </div>
                <div className="mt-20 flex basis-1/3 flex-col items-center rounded-lg bg-[#EDEFEC] pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute h-[100px] w-[100px] -translate-y-1/2 rounded-full border-[10px] border-white bg-white object-cover"
                    />
                    <p className="relative mx-16 mt-16 text-center text-[16px] leading-relaxed">
                        <Quotes className="mr-2 inline w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline w-[20px] -translate-y-1/3 rotate-180" />
                    </p>
                </div>
                <div className="mt-20 flex basis-1/3 flex-col items-center rounded-lg bg-[#EDEFEC] pb-10">
                    <Image
                        src={"/ring.jpg"}
                        width={100}
                        height={100}
                        alt="Person"
                        className="absolute h-[100px] w-[100px] -translate-y-1/2 rounded-full border-[10px] border-white bg-white object-cover"
                    />
                    <p className="relative mx-16 mt-16 text-center text-[16px] leading-relaxed">
                        <Quotes className="mr-2 inline w-[20px] -translate-y-1/3" />
                        Like this video and ask you questions in comment
                        section, don&apos;t forget to Subscribe Easy Tutorials
                        Youtube channel to watch more videos of website
                        designing, digital marketing and photoshop sda &nbsp;
                        <Quotes className="inline w-[20px] -translate-y-1/3 rotate-180" />
                    </p>
                </div>
            </div>
        </section>
    );
}
