import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-dvh bg-neutral-100">
            <div className="mx-auto grid min-h-dvh max-w-screen-2xl place-content-center p-4">
                {children}
            </div>
        </main>
    );
}
