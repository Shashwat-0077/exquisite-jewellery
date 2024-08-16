"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Coupons } from "../../marketing/page";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// TODO : add a functionality to sort 2 cols simultaneously

export const columns: ColumnDef<Coupons>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "col_id",
        header: "ID",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "isActive",
        header: "Active",
    },
    {
        accessorKey: "discountAmount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const disType = row.getValue("discountType");
            const amount = parseFloat(row.getValue("discountAmount"));

            if (disType === "FIXED") {
                return amount + " $";
            }

            return amount + " %";
        },
    },
    {
        accessorKey: "discountType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Discount Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
];
