import React from "react";

import { DataTable } from "../_components/data-table";
import { columns } from "../_components/data-table/columns";

// TODO : Remove this
// NOTE : Dummy Data
export type Coupons = {
    col_id: string;
    code: string;
    isActive: boolean;
    discountType: "FIXED" | "PERCENTAGE";
    discountAmount: number;
};

const coupons: Coupons[] = [
    {
        col_id: "728ed52f",
        code: "15",
        isActive: true,
        discountAmount: 100,
        discountType: "FIXED",
    },
    {
        col_id: "489e1d42",
        code: "FUCK80",
        isActive: false,
        discountAmount: 69,
        discountType: "PERCENTAGE",
    },
    {
        col_id: "a3b24d6e",
        code: "SAVE50",
        isActive: true,
        discountAmount: 50,
        discountType: "FIXED",
    },
    {
        col_id: "c9f2e739",
        code: "DISCOUNT10",
        isActive: true,
        discountAmount: 10,
        discountType: "PERCENTAGE",
    },
    {
        col_id: "e7a3b8d1",
        code: "SUMMER2024",
        isActive: false,
        discountAmount: 20,
        discountType: "PERCENTAGE",
    },
    {
        col_id: "f5d3c76b",
        code: "FREESHIP",
        isActive: true,
        discountAmount: 5,
        discountType: "FIXED",
    },
    {
        col_id: "64b6e9f1",
        code: "BLACKFRIDAY",
        isActive: true,
        discountAmount: 30,
        discountType: "PERCENTAGE",
    },
    {
        col_id: "12d7f4c9",
        code: "WELCOME10",
        isActive: true,
        discountAmount: 10,
        discountType: "FIXED",
    },
];
export default function Marketing() {
    return (
        <div className="overflow-hidden pl-20 pt-12">
            <h1 className="text-2xl font-semibold">Coupons</h1>
            <DataTable columns={columns} data={coupons} />
            <h1 className="text-2xl font-semibold">Expired Coupons</h1>
            <DataTable columns={columns} data={coupons} />
        </div>
    );
}
