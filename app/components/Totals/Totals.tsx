"use client";

import { getExpensesAggregate } from "@/app/actions/getExpenses";
import { getIncomeAggregate } from "@/app/actions/getIncome";
// import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../Loader/Skeleton";

export function Totals() {
  const {
    isPending: isIncomePending,
    isError: isIncomeError,
    data: incomeData,
    error: incomeError,

    isRefetching: isRefetchingIncome,
  } = useQuery({
    queryKey: ["incomeAggregate"],
    queryFn: getIncomeAggregate,
  });

  const {
    isPending: isExpensesPending,
    isError: isExpensesError,
    data: expensesData,
    error: expensesError,

    isRefetching: isRefetchingExpenses,
  } = useQuery({
    queryKey: ["expensesAggregate"],
    queryFn: getExpensesAggregate,
  });

  const isLoading = isIncomePending || isExpensesPending;
  const isError = isIncomeError || isExpensesError;
  const isRefetching = isRefetchingIncome || isRefetchingExpenses;

  if (isLoading) {
    return (
      <span className="text-center text-gray-600 animate-pulse font-semibold">
        Loading Totals...
      </span>
    );
  }

  if (isError) {
    return <span>Error: {incomeError?.message || expensesError?.message}</span>;
  }

  if (isRefetching) {
    return (
      <div className="">
        <span className="text-center text-gray-600 animate-pulse font-semibold">
          Refreshing...
        </span>
        <SkeletonLoader />
      </div>
    );
  }

  const incomeTotal = incomeData?.totalIncome || 0;
  const expenseTotal = expensesData?.totalExpense || 0;
  const balance = incomeTotal - expenseTotal;

  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {/* INCOME */}
        <Card className="flex flex-row w-full">
          <CardHeader className="">
            <CardTitle className="bg-green-300/50 rounded-md p-1">
              <TrendingUp width={60} height={60} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-semibold">Total Income</span>
              <span className="font-semibold">
                {formatCurrency(incomeTotal)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* EXPENSES */}
        <Card className="flex flex-row w-full">
          <CardHeader>
            <CardTitle className="bg-red-300/50 rounded-md p-1">
              <TrendingDown width={60} height={60} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-semibold">
                Total Expenses
              </span>
              <span className="font-semibold">
                {formatCurrency(expenseTotal)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* BALANCE */}
        <Card className="flex flex-row w-full">
          <CardHeader>
            <CardTitle className="bg-blue-300/50 rounded-md p-1">
              <Wallet width={60} height={60} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 font-semibold">
                Total Balance
              </span>
              <span className="font-semibold">{formatCurrency(balance)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
