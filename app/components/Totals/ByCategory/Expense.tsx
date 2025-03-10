"use client";
import { getExpensesByCategory } from "@/app/actions/getExpenses";
import { useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../../Loader/Skeleton";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExpensesByCategory() {
  const {
    isLoading: isExpensesLoading,
    isPending: isExpensesPending,
    isError: isExpensesError,
    data: expensesData,
    error: expensesError,
  } = useQuery({
    queryKey: ["expenseByCategory"],
    queryFn: getExpensesByCategory,
  });

  if (isExpensesLoading || isExpensesPending) {
    return (
      <Card className="w-[300px] md:w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-4">
            Expenses by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-center text-gray-600 animate-pulse font-semibold">
            {isExpensesLoading ? "Loading Totals..." : "Refreshing Totals..."}
          </span>
          <SkeletonLoader className="h-4 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }

  // **Error State**
  if (isExpensesError) {
    return (
      <span className="text-red-500 font-semibold">
        Error: {expensesError?.message}
      </span>
    );
  }

  // **Ensure Data Exists**
  const expenseCategoryTotal = expensesData?.categoryTotals || [];
  const totalExpense = expenseCategoryTotal.reduce(
    (sum, item) => sum + (item._sum.amount || 0),
    0
  );

  return (
    <Card className="w-[300px] md:w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-4">
          Expenses by Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        {expenseCategoryTotal.length === 0 ? (
          <p className="text-gray-500">No expenses recorded yet.</p>
        ) : (
          expenseCategoryTotal.map((item, index) => {
            const percentage = totalExpense
              ? (((item._sum.amount ?? 0) / totalExpense) * 100).toFixed(1)
              : 0; // Avoid division by zero

            return (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-gray-500">{percentage}%</span>
                </div>
                <Progress
                  value={parseFloat(percentage.toString())}
                  className="h-3 bg-gray-200 [&>div]:bg-rose-500"
                />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
