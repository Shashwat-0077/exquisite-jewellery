import { eq } from "drizzle-orm";

import AddToCart from "@/components/Product Page/AddToCart";
import HeroCarousel from "@/components/Product Page/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { products } from "@/db/schema";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const [product] = await db
        .select()
        .from(products)
        .where(eq(products.ID, id));

    return (
        <div className="container min-h-[calc(100svh-80px)]">
            <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-start justify-start pt-3 md:flex-row md:gap-7">
                {/* // TODO : Modify the schema so that a single product can have multiple images  */}
                <HeroCarousel images={[product.image]} />
                <section id="product-details" className="flex w-full flex-col">
                    <section id="product-info">
                        <h1 className="mb-5 text-2xl font-bold">
                            {product.title}
                        </h1>
                        <p>&#8377;{product.price}</p>
                        <p>{product.description}</p>
                    </section>
                    <section
                        id="product-actions"
                        className="mt-7 grid gap-x-5 gap-y-5 md:grid-cols-[30%_70%]"
                    >
                        <AddToCart
                            prodID={product.ID}
                            prodPrice={product.price}
                            prodImage={product.image}
                            prodTitle={product.title}
                        />
                        <Button className="block h-12 w-full md:col-span-2">
                            Buy Now
                        </Button>
                    </section>
                    <section id="product-details" className="mt-7">
                        <h1 className="text-xl font-bold">Product Details</h1>
                        <Table>
                            <TableBody>
                                <TableRow className="border-none">
                                    <TableCell className="pl-0">
                                        <p className="flex items-center justify-center gap-1 font-bold">
                                            Something
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maiores, perspiciatis.
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-none">
                                    <TableCell className="pl-0">
                                        <p className="flex items-center justify-center gap-1 font-bold">
                                            Something
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maiores, perspiciatis.
                                    </TableCell>
                                </TableRow>
                                <TableRow className="border-none">
                                    <TableCell className="pl-0">
                                        <p className="flex items-center justify-center gap-1 font-bold">
                                            Something
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maiores, perspiciatis.
                                    </TableCell>
                                </TableRow>
                                <TableRow className="place-content-start border-none">
                                    <TableCell className="pl-0">
                                        <p className="flex items-center justify-center gap-1 font-bold">
                                            Something
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Maiores, perspiciatis.
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </section>
                    <section id="product-about" className="mt-7">
                        <h1 className="mb-2 text-xl font-bold">
                            About This Product
                        </h1>

                        <ul className="list-outside pl-4">
                            <li className="relative before:absolute before:left-0 before:top-2 before:size-2 before:-translate-x-4 before:rounded-full before:bg-black">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id officia dignissimos dolorem
                                tempora, ex totam quibusdam enim ea aut
                                corporis?
                            </li>
                            <li className="relative before:absolute before:left-0 before:top-2 before:size-2 before:-translate-x-4 before:rounded-full before:bg-black">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id officia dignissimos dolorem
                                tempora, ex totam quibusdam enim ea aut
                                corporis?
                            </li>
                            <li className="relative before:absolute before:left-0 before:top-2 before:size-2 before:-translate-x-4 before:rounded-full before:bg-black">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id officia dignissimos dolorem
                                tempora, ex totam quibusdam enim ea aut
                                corporis?
                            </li>
                            <li className="relative before:absolute before:left-0 before:top-2 before:size-2 before:-translate-x-4 before:rounded-full before:bg-black">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id officia dignissimos dolorem
                                tempora, ex totam quibusdam enim ea aut
                                corporis?
                            </li>
                            <li className="relative before:absolute before:left-0 before:top-2 before:size-2 before:-translate-x-4 before:rounded-full before:bg-black">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Id officia dignissimos dolorem
                                tempora, ex totam quibusdam enim ea aut
                                corporis?
                            </li>
                        </ul>
                    </section>
                </section>
            </div>
            <section className="mb-40 mt-32 flex flex-col items-center justify-center gap-5">
                <div className="flex w-full flex-col gap-5">
                    <h1 className="w-full text-left text-4xl font-bold">
                        You Might Also Like
                    </h1>
                    {/* <SwiperCarousel data={data} /> */}
                </div>
            </section>
        </div>
    );
}
