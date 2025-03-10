"use client";
import { getIncomesByCategory } from "@/app/actions/getIncome";
import { useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../../Loader/Skeleton";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IncomesByCategory() {
  const {
    isLoading: isIncomesLoading,
    isPending: isIncomesPending,
    isError: isIncomesError,
    data: IncomesData,
    error: IncomesError,
  } = useQuery({
    queryKey: ["incomeByCategory"],
    queryFn: getIncomesByCategory,
  });

  if (isIncomesLoading || isIncomesPending) {
    return (
      <Card className="w-[300px] md:w-[450px] p-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-4">
            Income by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-center text-gray-600 animate-pulse font-semibold">
            {isIncomesLoading ? "Loading Totals..." : "Refreshing Totals..."}
          </span>
          <SkeletonLoader className="h-4 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }

  if (isIncomesError) {
    return (
      <span className="text-red-500 font-semibold">
        Error: {IncomesError?.message}
      </span>
    );
  }

  // ✅ Ensure Data Exists
  const incomeCategoryTotal = IncomesData?.categoryTotals || [];
  const totalIncome = incomeCategoryTotal.reduce(
    (sum, item) => sum + (item._sum.amount || 0),
    0
  );

  return (
    <Card className="w-[300px] md:w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-4">
          Income by Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        {incomeCategoryTotal.length === 0 ? (
          <p className="text-gray-500">No income recorded yet.</p>
        ) : (
          incomeCategoryTotal.map((item, index) => {
            const percentage = totalIncome
              ? (((item._sum.amount ?? 0) / totalIncome) * 100).toFixed(1)
              : 0;

            return (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-gray-500">{percentage}%</span>
                </div>
                <Progress
                  value={parseFloat(percentage.toString())}
                  className="h-3 bg-gray-200 [&>div]:bg-emerald-500"
                />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
