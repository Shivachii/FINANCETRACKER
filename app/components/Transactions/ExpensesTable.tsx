"use client";

import { getExpenses } from "@/app/actions/getExpenses";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SkeletonLoader } from "../Loader/Skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ExpensesDataTable() {
  const { isPending, isError, data, error, isFetching, isSuccess, refetch } =
    useQuery({
      queryKey: ["getExpenses"],
      queryFn: getExpenses,
    });

  if (isPending) {
    return (
      <div className="container mx-auto py-6">
        <div className="font-semibold text-gray-600 mx-5 animate-pulse">
          Loading Expenses...
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-6">
        <div>Error: {error?.message || "An error occurred"}</div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full py-6">
        <Button onClick={() => refetch()} disabled={isFetching}>
          <RefreshCcw className={`${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? (
            <span className="">Refreshing ...</span>
          ) : (
            <span>Refresh</span>
          )}
        </Button>
        <DataTable columns={columns} data={data?.allExpenses || []} />
      </div>
    );
  }

  // Add a fallback in case of unexpected states
  return (
    <div className="text-center font-bold">
      Sorry an un expected error occurred. Please Try again later
    </div>
  );
}
