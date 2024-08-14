"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Qualities() {
    const [lastScroll, setLastScroll] = useState(0);
    const [displace, setDisplace] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const handleAnimationOnScroll = () => {
        if (timer !== null) {
            clearTimeout(timer);
        }
        setTimer(
            setTimeout(function () {
                // do something
                if (window.scrollY < lastScroll) {
                    if (lastScroll - window.scrollY > 10) {
                        setDisplace(50);
                    }
                } else {
                    if (window.scrollY - lastScroll > 10) {
                        setDisplace(-50);
                    }
                }
                setLastScroll(window.scrollY);
            }, 1)
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setDisplace(0);
        }, 200);
    }, [displace]);

    useEffect(() => {
        window.addEventListener("scroll", handleAnimationOnScroll);

        return () => {
            window.removeEventListener("scroll", handleAnimationOnScroll);
        };
    });

    return (
        <section className="mb-42 relative text-center md:mx-60 md:mb-72">
            <motion.img
                initial={{
                    rotate: 220,
                }}
                animate={{
                    y: [0, 10, 0], // Keyframes for horizontal float
                    transition: {
                        delay: 1,
                        repeat: Infinity, // Infinite animation
                        duration: 2, // Animation duration
                        ease: "easeInOut", // Easing function
                    },
                }}
                className="absolute -left-28 -top-36 hidden h-[200px] w-[200px] lg:block"
                src="/Qualities/ring1.png"
            ></motion.img>
            <motion.img
                animate={{
                    y: [0, 10, 0], // Keyframes for horizontal float
                    transition: {
                        delay: 2.5,
                        repeat: Infinity, // Infinite animation
                        duration: 2, // Animation duration
                        ease: "easeInOut", // Easing function
                    },
                }}
                className="absolute -right-40 -top-32 hidden h-[200px] w-[200px] lg:block"
                src="/Qualities/ring2.png"
            ></motion.img>
            <motion.img
                animate={{
                    y: [0, 10, 0], // Keyframes for horizontal float
                    transition: {
                        repeat: Infinity, // Infinite animation
                        duration: 2, // Animation duration
                        ease: "easeInOut", // Easing function
                    },
                }}
                className="absolute -bottom-52 left-1/2 hidden h-[200px] w-[250px] lg:block"
                src="/Qualities/ring3.png"
            ></motion.img>

            <h1 className="text-[40px] font-bold">Best of All</h1>
            <p className="text-[25px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                suscipit non tenetur aut ullam ad beatae qui reprehenderit
                maiores rem. Debitis asperiores enim molestias, quidem atque et
                delectus nostrum exercitationem sint repellat fuga optio earum.
                Consequuntur delectus voluptatem earum obcaecati tenetur,
                officia ipsa eius ratione, minus incidunt distinctio tempora.
                Nam.
            </p>
        </section>
    );
}
