"use client";

import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

import { useEffect } from "react";
import { Toaster } from "./ui/toaster";
import { DEFAULT_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Socials() {
    const searchParams = useSearchParams();
    const isCallbackError = searchParams.get("error") === "OAuthCallbackError";
    const { toast } = useToast();

    useEffect(() => {
        console.log("error : " + isCallbackError);
        if (isCallbackError) {
            console.log("triggered toast");
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive",
            });
        }
    }, [isCallbackError, toast]);

    const onSignIngClick = (provider: "google" | "apple") => {
        signIn(provider, {
            callbackUrl: DEFAULT_REDIRECT,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className="flex select-none items-center gap-2 rounded-md bg-[#4285F4] px-6 py-2 text-center text-white hover:bg-[#3367D6]"
                onClick={() => onSignIngClick("google")}
            >
                <FaGoogle className="h-5 w-5" />
                Sign in with Google
            </div>
            <Toaster />
        </div>
    );
}
