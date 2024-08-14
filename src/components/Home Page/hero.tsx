import Image from "next/image";

import { Button } from "../ui/button";

export default function Hero() {
    return (
        <>
            {/* 
                //NOTE: Navbar height is approx 80px 
            */}
            <section className='flex min-h-[calc(100svh-80px)] flex-col items-center justify-start !bg-cover !bg-center pt-10 [background:linear-gradient(rgba(255,255,255,0.5),_rgba(255,255,255,0.5)),_url("/hero-bg.jpg")]'>
                <Image
                    src="/hero-logo.png"
                    width={200}
                    height={200}
                    alt="LOGO"
                />
                <h1 className="text-center text-[40px] font-black text-primary">
                    Exquisite Jewellery
                </h1>
                <h2 className="mt-20 text-center text-[40px] font-bold text-primary">
                    Where Luxury Meets <br />
                    Perfection
                </h2>
                <p className="mt-4 text-center text-[20px]">
                    Anti tarnish | Hypoallergenic | 18K Gold <br /> plated |
                    Waterproof
                </p>
                <Button className="mt-16 rounded-full bg-primary px-12 py-7 text-[30px]">
                    Get Started
                </Button>
            </section>
        </>
    );
}
