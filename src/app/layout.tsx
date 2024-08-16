import "./globals.scss";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";

import { QueryProvider } from "@/providers/queryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Exquisite Jewellery",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // [ ] : Safe guard you api endpoints (for eg : ddos)

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <QueryProvider>
                        <Navbar />
                        {children}
                        {process.env.NODE_ENV === "development" ? (
                            <ReactQueryDevtools initialIsOpen={false} />
                        ) : (
                            ""
                        )}
                        <Footer />
                    </QueryProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
