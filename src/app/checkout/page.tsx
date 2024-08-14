"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import consola from "consola";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const CheckoutSchema = z.object({
    email: z
        .string({
            required_error: "Email is required.",
        })
        .email({
            message: "Invalid email address.",
        }),
    country: z.string({ required_error: "First name is required." }),
    firstName: z.string({
        required_error: "First name is required.",
    }),
    lastName: z.string({
        required_error: "Last name is required.",
    }),
    apartment: z.string({
        required_error: "Apartment is required.",
    }),
    address: z.string({
        required_error: "Address is required.",
    }),
    city: z.string({
        required_error: "City is required.",
    }),
    PINcode: z
        .string({
            required_error: "Phone number is required.",
        })
        .regex(/^\d{6}$/, {
            message: "Should be a 6 digit number.",
        }),
    district: z.string({
        required_error: "District is required.",
    }),
    state: z.string({
        required_error: "State is required.",
    }),
    phoneNumber: z
        .string({
            required_error: "Phone number is required.",
        })
        .regex(/^[6-9]\d{9}$/, {
            message:
                "Invalid phone number. It should be a 10-digit number starting with 6-9.",
        }),
});

export default function Checkout() {
    // TODO : These inputs styles are bit clunky with animation, give a thought about changing them

    const form = useForm<z.infer<typeof CheckoutSchema>>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            email: "",
            country: "",
            firstName: "",
            lastName: "",
            apartment: "",
            address: "",
            city: "",
            PINcode: "",
            district: "",
            state: "",
            phoneNumber: "",
        },
    });

    function onSubmit(data: z.infer<typeof CheckoutSchema>) {
        consola.log("hello");
        consola.log(data);
    }

    return (
        <div className="container mt-10 flex min-h-[calc(100svh-80px)] gap-10 px-32">
            <div className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-7"
                    >
                        <div>
                            <h1 className="mb-3 text-2xl font-bold">Contact</h1>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="Username"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <h1 className="mb-3 text-2xl font-bold">
                                Delivery
                            </h1>
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-12 border-gray-400 !ring-primary focus:outline-none focus:ring-2 focus-visible:ring-1">
                                                    <SelectValue placeholder="Select a Country" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="India">
                                                    India
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="First Name"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="Last Name"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="apartment"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="Apartment, Flat no."
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="Address, Landmark"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            variant="fancyLabel"
                                            label="City"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="PINcode"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="PIN Code"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="District"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                variant="fancyLabel"
                                                label="State"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            variant="fancyLabel"
                                            label="Phone Number"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="h-12">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="w-full rounded-xl bg-gray-100 px-10 py-7">
                <section className="flex flex-col gap-3">
                    {/* {data.slice(0, 3).map((product, index) => (
                        <div
                            key={index}
                            className="grid w-full grid-cols-[1fr_1fr_3fr] items-center gap-3"
                        >
                            <div className="w-[75px] overflow-hidden rounded-lg">
                                <ImageWithFallback
                                    src={product.img}
                                    alt={product.img}
                                />
                            </div>
                            <p>{product.title}</p>
                            <p className="justify-self-end">{product.price}</p>
                        </div>
                    ))} */}
                </section>
                <section className="mt-6 flex items-center gap-3">
                    <Input
                        name="discount"
                        className="h-12 w-full bg-white"
                        placeholder="Discount Code"
                    />
                    <Button className="h-12 px-10">Apply</Button>
                </section>
                {/* //TODO : Payment Gateway */}
            </div>
        </div>
    );
}
