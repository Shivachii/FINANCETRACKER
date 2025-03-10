"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getExpenses() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const allExpenses = await prisma.transaction.findMany({
      where: {
        userId,
        type: "expense",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { allExpenses };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return { error: "Failed to fetch expenses" };
  }
}

async function getExpensesAggregate() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    console.log("Calculating total expense for:", { userId });

    // Get total expenses
    const aggregate = await prisma.transaction.aggregate({
      where: {
        userId,
        type: "expense",
      },
      _sum: {
        amount: true,
      },
    });

    const totalExpense = aggregate._sum.amount || 0; // Handle null case.
    console.log("Total Expense:", totalExpense);

    return { totalExpense };
  } catch (error) {
    console.error("Error calculating total expenses:", error);
    return { error: "Failed to calculate total expenses" };
  }
}

async function getExpensesByCategory() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    console.log("Fetching expense totals by category for:", { userId });

    // Group expenses by category and calculate total for each category
    const categoryTotals = await prisma.transaction.groupBy({
      by: ["category"], // Group by category
      where: {
        userId,
        type: "expense",
      },
      _sum: {
        amount: true, // Sum the amount for each category
      },
      orderBy: {
        _sum: {
          amount: "desc", // Sort by highest spending category
        },
      },
    });

    return { categoryTotals };
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    return { error: "Failed to fetch category-wise expenses" };
  }
}

export { getExpenses, getExpensesAggregate, getExpensesByCategory };
