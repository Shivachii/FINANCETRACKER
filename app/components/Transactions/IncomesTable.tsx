"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getIncome } from "@/app/actions/getIncome";
import { SkeletonLoader } from "../Loader/Skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function IncomesDataTable() {
  const { isPending, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: ["getIncome"],
    queryFn: getIncome,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="font-semibold text-gray-600 animate-pulse mb-4">
          Loading Incomes...
        </div>
        <SkeletonLoader className="w-full max-w-4xl h-[300px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-red-500">
        <p className="font-semibold">
          Error: {error?.message || "An error occurred"}
        </p>
        <Button onClick={() => refetch()} className="mt-4">
          <RefreshCcw className="mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <Button
        onClick={() => refetch()}
        disabled={isFetching}
        className="mb-4 flex items-center gap-2"
      >
        <RefreshCcw className={isFetching ? "animate-spin" : ""} />
        {isFetching ? "Refreshing..." : "Refresh"}
      </Button>

      <DataTable columns={columns} data={data?.allIncome || []} />
    </div>
  );
}
