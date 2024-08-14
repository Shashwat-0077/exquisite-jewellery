"use client";
import React, { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/components/ui/ProductCard";

import "swiper/css";

export default function SwiperCarousel({
    data,
}: {
    data: {
        ID: string;
        title: string;
        price: number;
        image: string;
    }[];
}) {
    const [currIndex, setCurrIndex] = useState(0);

    return (
        <Swiper
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            loop
            // spaceBetween={30}
            className="group mb-12 w-full select-none"
            modules={[Autoplay, Pagination, Navigation]}
            onSlideChange={(swiper) => {
                setCurrIndex(swiper.realIndex);
            }}
            navigation={{
                prevEl: `.arrow-prev`,
                nextEl: `.arrow-next`,
            }}
        >
            {data.map((value, index) => (
                <SwiperSlide key={index}>
                    <ProductCard
                        className="px-2"
                        id={value.ID}
                        title={value.title}
                        price={value.price}
                        imgSrc={value.image}
                    />
                </SwiperSlide>
            ))}
            <div
                className={`mt-3 flex justify-center gap-2 opacity-0 transition-all duration-500 md:group-hover:opacity-100`}
            >
                {data.map((_value, index) => (
                    <span
                        key={index}
                        className={`size-2 bg-primary ${
                            index === currIndex ? "w-6" : ""
                        } rounded-full transition-all`}
                    ></span>
                ))}
            </div>
            {/* Custom navigation buttons */}
            <div
                className={`arrow-prev absolute -left-full top-1/2 z-10 -translate-y-1/2 transform cursor-pointer select-none rounded-full bg-gray-800 p-3 text-white transition-all duration-300 md:group-hover:left-4`}
            >
                <ChevronLeft />
            </div>
            <div
                className={`arrow-next absolute -right-full top-1/2 z-10 -translate-y-1/2 transform cursor-pointer select-none rounded-full bg-gray-800 p-3 text-white duration-300 md:group-hover:right-4`}
            >
                <ChevronRight />
            </div>
        </Swiper>
    );
}
