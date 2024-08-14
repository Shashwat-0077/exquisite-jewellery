import React from "react";

import Qualities from "@/components/Home Page/qualities";
import Hero from "@/components/Home Page/hero";
import Categories from "@/components/Home Page/categories";
import Products from "@/components/Home Page/products";
import Testimonials from "@/components/Home Page/testimonials";
import InstaPromo from "@/components/Home Page/instaPromo";

export default function HomePage() {
    // NOTE : We can make the navbar and footer placed in the each component so that they render each time and with that we can get full screen loading page

    return (
        <>
            <Hero />
            <Categories />
            <Qualities />
            <Products />
            <Testimonials />
            <InstaPromo />
        </>
    );
}
