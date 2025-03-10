"use client";

import { getExpensesAggregate } from "@/app/actions/getExpenses";
import { getIncomeAggregate } from "@/app/actions/getIncome";
import { formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../Loader/Skeleton";

interface TotalCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  bgColor: string;
}

const TotalCard = ({ title, amount, icon, bgColor }: TotalCardProps) => (
  <Card className="flex flex-row w-full gap-0 items-center">
    <CardHeader>
      <CardTitle className={`${bgColor} rounded-md p-2`}>{icon}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-1">
      <span className="text-slate-500 font-semibold">{title}</span>
      <span className="font-semibold">{formatCurrency(amount)}</span>
    </CardContent>
  </Card>
);

export function Totals() {
  const {
    isPending: isIncomePending,
    isError: isIncomeError,
    data: incomeData,
    error: incomeError,
  } = useQuery({
    queryKey: ["incomeAggregate"],
    queryFn: getIncomeAggregate,
  });

  const {
    isPending: isExpensesPending,
    isError: isExpensesError,
    data: expensesData,
    error: expensesError,
  } = useQuery({
    queryKey: ["expensesAggregate"],
    queryFn: getExpensesAggregate,
  });

  const isLoading = isIncomePending || isExpensesPending;
  const isError = isIncomeError || isExpensesError;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <SkeletonLoader className="h-[100px] w-full" />
        <SkeletonLoader className="h-[100px] w-full" />
        <SkeletonLoader className="h-[100px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <span className="text-red-500 font-semibold">
        Error: {incomeError?.message || expensesError?.message}
      </span>
    );
  }

  const incomeTotal = incomeData?.totalIncome || 0;
  const expenseTotal = expensesData?.totalExpense || 0;
  const balance = incomeTotal - expenseTotal;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      <TotalCard
        title="Total Income"
        amount={incomeTotal}
        icon={<TrendingUp width={50} height={50} />}
        bgColor="bg-emerald-600"
      />
      <TotalCard
        title="Total Expenses"
        amount={expenseTotal}
        icon={<TrendingDown width={50} height={50} />}
        bgColor="bg-rose-600"
      />
      <TotalCard
        title="Total Balance"
        amount={balance}
        icon={<Wallet width={50} height={50} />}
        bgColor="bg-blue-300"
      />
    </div>
  );
}
