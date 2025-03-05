"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getIncome } from "@/app/actions/getIncome";
import { SkeletonLoader } from "../Loader/Skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function IncomesDataTable() {
  const { isPending, isError, data, error, isFetching, isSuccess, refetch } =
    useQuery({
      queryKey: ["getIncome"],
      queryFn: getIncome,
    });

  if (isPending) {
    return (
      <div className="container mx-auto py-6">
        <div className="font-semibold text-gray-600 mx-5 animate-pulse">
          Loading Incomes...
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
        <DataTable columns={columns} data={data?.allIncome || []} />
      </div>
    );
  }

  // Add a fallback in case of unexpected states
  return <div>Unexpected state</div>;
}
