// import SwiperCarousel from "@/components/ui/SwiperCarousel";

import { getProductsByFilters } from "@/services/products";

import SwiperCarousel from "../ui/SwiperCarousel";

export default async function Products() {
    // TODO : make different data for both sliders
    const data = await getProductsByFilters({ filterLimit: 7, random: true });

    return (
        <section className="mb-40 flex flex-col items-center justify-center gap-5 px-10 sm:px-20 lg:px-40">
            <div className="flex w-full flex-col gap-5">
                <h1 className="w-full text-left text-4xl font-bold">
                    Top Picks
                </h1>
                <SwiperCarousel data={data} />
            </div>
            <div className="flex w-full flex-col gap-5">
                <h1 className="w-full text-left text-4xl font-bold">
                    New Releases
                </h1>
                <SwiperCarousel data={data} />
            </div>
        </section>
    );
}
