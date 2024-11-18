"use client";
import React from "react";
import { Loader, LogOut } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export default function UserButton() {
    const { data: user, isLoading, isFetching, isPending } = useCurrent();
    const { mutate: logout } = useLogout();
    const queryClient = useQueryClient();

    if (isLoading || isFetching || isPending) {
        return (
            <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!user) {
        // IMPORTANT : we are invalidating the "current" here because after the very first login, the "current" is cached in react query, so when the user tries to login again, the cached version of "current" (which is null because of logout) is used, so because of that it will not refetch the user with "\me" route, thats why it will show "User not found" instead of the UserButton, so here we will forcefully fetch the user after logging in.
        queryClient.invalidateQueries({ queryKey: ["current"] });
        return <p>User Not found!</p>;
    }

    const { name, email } = user;

    const avatarFallBack = name
        ? name.charAt(0).toUpperCase()
        : (email.charAt(0).toUpperCase() ?? "U");

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative outline-none">
                <Avatar className="size-10 cursor-pointer select-none border border-neutral-300 transition hover:opacity-75">
                    <AvatarFallback className="flex w-full items-center justify-center bg-neutral-200 font-medium text-neutral-500">
                        {avatarFallBack}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={10}
                side="bottom"
                className="w-60 rounded-lg shadow-2xl"
            >
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-[52px] select-none border border-neutral-300 transition hover:opacity-75">
                        <AvatarFallback className="flex w-full items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
                            {avatarFallBack}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-neutral-900">
                            {name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500">{email}</p>
                    </div>
                </div>
                <DropdownMenuItem
                    onSelect={() => logout({})}
                    className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
                >
                    <LogOut className="mr-2 size-4" /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
