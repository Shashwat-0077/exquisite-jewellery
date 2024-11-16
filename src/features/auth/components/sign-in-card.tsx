"use client";
import React from "react";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
import { loginSchema } from "@/features/auth/schemas";

import { useLogin } from "../api/use-login";

// TODO : Styles correction
export function SignInCard() {
    const { mutate } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = form.handleSubmit((data: z.infer<typeof loginSchema>) => {
        mutate({ json: data });
    });

    return (
        <Card className="mx-auto max-w-md p-6">
            <CardHeader>
                <CardTitle className="mb-4 text-center text-2xl font-bold">
                    Welcome Back
                </CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={onSubmit}>
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
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full rounded py-2 text-white"
                    >
                        Sign In
                    </Button>
                    <div className="mt-4 flex justify-between">
                        <Button className="mr-2 w-full rounded py-2 text-white">
                            <FcGoogle /> Sign in with Google
                        </Button>
                        <Button className="ml-2 w-full rounded bg-black py-2 text-white">
                            <ImAppleinc />
                            Sign in with Apple
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                <span>Don&apos;t have an account?&nbsp;</span>
                <Link href="/sign-up" className="text-blue-500 hover:underline">
                    Create one
                </Link>
            </div>
        </Card>
    );
}
