"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import getMonthHistory from "@/app/actions/getTransactions";

// Function to fetch and transform chart data
async function fetchChartData() {
  const allIncomeResult = await getMonthHistory();
  const allIncome = allIncomeResult.monthHistory || [];

  const incomeData = allIncome.map((income) => ({
    expense: income.expense,
    income: income.income,
  }));

  return incomeData;
}

const chartConfig = {
  income: {
    label: "Income",
    color: "#007bff",
    icon: TrendingUp,
  },
  expense: {
    label: "Expense",
    color: "#fd7e14",
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export function TransactionsBarChart() {
  const {
    data: chartData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (isError) {
    return <div>Error loading chart data: {error?.message}</div>;
  }

  if (!chartData) {
    return <div>No chart data available.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income monthly view </CardTitle>
        <CardDescription>Income for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[200px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing income for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
