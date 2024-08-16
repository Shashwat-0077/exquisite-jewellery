import { redirect } from "next/navigation";

import { auth } from "@/auth";

import AdminNavbar from "./_components/Navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    // NOTE : only admins are allowed to see this
    if (!(session?.user.role && session?.user.role === "ADMIN")) {
        redirect("/?error=notAllowed");
    }

    return (
        <div className="grid grid-cols-[300px_1fr]">
            <AdminNavbar />
            {children}
        </div>
    );
}
