import Image from "next/image";

import { Button } from "../ui/button";

export default function InstaPromo() {
    return (
        <section className="mb-20 mt-40">
            <div className="hidden grid-cols-2 gap-20 lg:grid lg:px-60">
                <div className="relative h-[400px] overflow-hidden rounded-md">
                    <Image
                        src={"/earrings.jpg"}
                        fill
                        alt="insta reviews pic"
                        className="object-cover"
                    />
                </div>
                <div className="bassi-1/2">
                    <h1 className="text-[40px] font-semibold">
                        Our Insta Page
                    </h1>
                    <p className="pb-8 pt-4 xl:text-[20px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Unde quia alias, sed tempore iste dolor ipsa ad ducimus,
                        fuga molestias illo! Explicabo recusandae eius ducimus,
                        ipsam alias accusamus aut aperiam.
                    </p>
                    <Button
                        variant={"default"}
                        className="h-auto rounded-full bg-[linear-gradient(45deg,_#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] p-[3px]"
                    >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white px-10 text-black">
                            <Image
                                src={"/instaLogo.png"}
                                alt="Insta logo"
                                width={30}
                                height={30}
                                className="mr-5"
                            />
                            {/* //BUG: THE IMAGE IS NOT CENTERED, CROP IT OR DO SOMETHING ELSE THEN PLACE IT */}
                            <Image
                                src={"/instaText.png"}
                                width={100}
                                height={400}
                                alt="InstaGram"
                            />
                        </div>
                    </Button>
                </div>
            </div>
            <div className="mx-auto aspect-square w-[500px] bg-[url('/earrings.jpg')] bg-cover lg:hidden">
                <div className="grid h-full place-content-center bg-[rgba(0,0,0,0.5)]">
                    <Button
                        variant={"default"}
                        className="h-auto rounded-full bg-[linear-gradient(45deg,_#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] p-[3px]"
                    >
                        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 text-black">
                            <Image
                                src={"/instaLogo.png"}
                                alt="Insta logo"
                                width={30}
                                height={30}
                                className="mr-5"
                            />
                            {/* //BUG: THE IMAGE IS NOT CENTERED, CROP IT OR DO SOMETHING ELSE THEN PLACE IT */}
                            <Image
                                src={"/instaText.png"}
                                width={100}
                                height={400}
                                alt="InstaGram"
                            />
                        </div>
                    </Button>
                </div>
            </div>
        </section>
    );
}
