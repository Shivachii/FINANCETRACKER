"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Transactions = {
  id: string;
  amount: number;
  category: string;
  date: Date;
  //   updatedAt: Date;
  description: string;
  type: string;
  categoryIcon: string;
  //   status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Transactions>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <div className=" font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "Ksh",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      const capitalizeFirstWord = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };
      return (
        <div className="font-medium">{capitalizeFirstWord(description)}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="r">Category</div>,
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      const capitalizeFirstWord = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };

      return (
        <div className=" font-medium">{capitalizeFirstWord(category)}</div>
      );
    },
  },
  {
    accessorKey: "categoryIcon",
    header: () => <div className="text-center">Category Icon</div>,
    cell: ({ row }) => {
      const categoryIcon = row.getValue("categoryIcon") as string;

      return <div className="text-center font-medium">{categoryIcon}</div>;
    },
  },
];
