import { CircleHelp } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export default function Cart() {
    // TODO : Add a Dialogue box for the Shipping charges help/QuestionMark button
    // TODO : Disable navbar cart when on the cart page

    return (
        <div className="mt-20 min-h-[calc(100svh-80px)] md:px-32">
            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Product</TableHead>
                        <TableHead className="hidden w-[100px] text-center font-bold md:table-cell">
                            Price
                        </TableHead>
                        <TableHead className="hidden w-[300px] text-center font-bold md:table-cell">
                            Quantity
                        </TableHead>
                        <TableHead className="text-center font-bold">
                            Total
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {data.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="max-w-[100px] flex-shrink-0 flex-grow-0">
                                        <div className="relative my-4 h-[100px] w-[100px] overflow-hidden rounded">
                                            <Image
                                                src={"/ring.jpg"}
                                                fill
                                                alt="image"
                                                className="object-cover"
                                            />
                                        </div>
                                        <QuantityCounter className="w-full md:hidden" />
                                    </div>
                                    <h2>{value.title}</h2>
                                </div>
                            </TableCell>
                            <TableCell className="hidden text-center md:table-cell">
                                {value.price}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="grid place-content-center">
                                    <QuantityCounter />
                                </div>
                            </TableCell>
                            <TableCell className="w-[100px] text-center">
                                {1}
                            </TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
            <div className="mb-20 flex flex-col justify-between gap-5 px-10 md:flex-row">
                <div className="basis-1/2">
                    <Textarea
                        className="max-h-[300px] rounded-lg border-gray-400"
                        placeholder="Note to seller"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="flex w-full justify-between md:gap-52">
                        <p>Cart Total</p>
                        <p>400</p>
                    </div>
                    <div className="flex w-full justify-between md:gap-52">
                        <p className="flex items-center">
                            Shipping Chargers
                            <CircleHelp
                                size={20}
                                color="rgb(156 163 175)"
                                className="ml-2"
                            />
                        </p>
                        <p>200</p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                    <div className="flex w-full justify-between md:gap-52">
                        <p>Estimated Total</p>
                        <p>400</p>
                    </div>
                    <div className="flex self-start">
                        <p className="text-[12px]">
                            Coupons can be applied at checkout{" "}
                            <span className="inline-block h-[1px] text-[30px] text-red-600">
                                *
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
