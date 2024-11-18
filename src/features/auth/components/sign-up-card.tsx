"use client";
import React from "react";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMedia } from "react-use";
import { Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

// TODO : Styles correction
export function SignUpCard() {
    const { mutate, isPending } = useRegister();
    const isMobile = useMedia("(max-width: 640px)", false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = form.handleSubmit(
        (data: z.infer<typeof registerSchema>) => {
            mutate({ json: data });
        }
    );

    return (
        <Card className="mx-auto max-w-md p-6">
            <CardHeader>
                <CardTitle className="mb-4 text-center text-2xl font-bold">
                    Welcome !!!!
                </CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <FormLabel
                            className="mb-1 block text-sm font-medium"
                            htmlFor="name"
                        >
                            Name
                        </FormLabel>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="name"
                                            className={`w-full rounded border px-3 py-2 ${form.formState.errors.name ? "border-red-500" : ""}`}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormLabel
                            className="mb-1 block text-sm font-medium"
                            htmlFor="email"
                        >
                            Email
                        </FormLabel>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            id="email"
                                            className={`w-full rounded border px-3 py-2 ${form.formState.errors.email ? "border-red-500" : ""}`}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <Label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="password"
                        >
                            Password
                        </Label>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            id="password"
                                            className={`w-full rounded border ${form.formState.errors.password ? "border-red-500" : ""}`}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {!isPending ? (
                        <Button
                            type="submit"
                            className="w-full rounded py-2 text-white"
                        >
                            Sign Up
                        </Button>
                    ) : (
                        <Loader2 className="size-4 animate-spin" />
                    )}
                    <div className="mt-4 flex justify-between gap-3">
                        <Button
                            className="w-full rounded px-8 py-2 text-white sm:px-4"
                            disabled={isPending}
                        >
                            <FcGoogle /> {!isMobile ? "Sign up with " : ""}
                            Google
                        </Button>
                        <Button
                            className="w-full rounded bg-black px-8 py-2 text-white sm:px-4"
                            disabled={isPending}
                        >
                            <ImAppleinc />
                            {!isMobile ? "Sign up with " : ""}
                            Apple
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                <span>Already have an account?&nbsp;</span>
                <Link href="/sign-in" className="text-blue-500 hover:underline">
                    Sign in
                </Link>
            </div>
        </Card>
    );
}
