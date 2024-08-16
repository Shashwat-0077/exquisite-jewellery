import React from "react";
import Link from "next/link";

import MyLOGO from "@/SVGs/MyLOGO";

export default async function AdminNavbar() {
    return (
        <div className="sticky top-0 flex h-svh flex-col items-center pt-12 shadow-2xl">
            <div>
                <MyLOGO width={"10em"} />
                <ul className="pt-10">
                    <Link href={"/admin/"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Home
                        </li>
                    </Link>
                    <Link href={"/admin/orders"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Orders
                        </li>
                    </Link>
                    <Link href={"/admin/products"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Products
                        </li>
                    </Link>
                    <Link href={"/admin/customers"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Customers
                        </li>
                    </Link>
                    <Link href={"/admin/analytics"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Analytics
                        </li>
                    </Link>
                    {/* For Coupons */}
                    <Link href={"/admin/marketing"}>
                        <li className="rounded-lg px-4 py-2 hover:bg-gray-200">
                            Marketing
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
