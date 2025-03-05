"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export type Categories = {
  type: string;
  name: string;
  icon: string;
  // userId: string;
  // createdAt: Date;
};

export const columns: ColumnDef<Categories>[] = [
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
    accessorKey: "name",
    header: () => <div className="">Category</div>,
    cell: ({ row }) => {
      const category = row.getValue("name") as string;
      const capitalizeFirstWord = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      };

      return (
        <div className=" font-medium">{capitalizeFirstWord(category)}</div>
      );
    },
  },
  {
    accessorKey: "icon",
    header: () => <div className="text-center">Category Icon</div>,
    cell: ({ row }) => {
      const categoryIcon = row.getValue("icon") as string;

      return <div className="text-center font-medium">{categoryIcon}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => (
      <div className="text-center">Category Icon (Based on Transaction)</div>
    ),
    cell: ({ row }) => {
      const categoryIcon = row.getValue("type") as string;

      return <div className="text-center font-medium">{categoryIcon}</div>;
    },
  },
];
