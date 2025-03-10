"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncome() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // console.log("Querying incomes for:", { userId, type: "income" });
    const allIncome = await prisma.transaction.findMany({
      where: {
        userId,
        type: "income",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { allIncome };
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return { error: "Failed to fetch income" };
  }
}

async function getIncomeAggregate() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    console.log("Calculating income aggregate for:", {
      userId,
      type: "income",
    });

    const aggregate = await prisma.transaction.aggregate({
      where: {
        userId,
        type: "income",
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncome = aggregate._sum.amount || 0; // Handle null case.
    return { totalIncome };
  } catch (error) {
    console.error("Error calculating income aggregate:", error);
    return { error: "Failed to calculate income aggregate" };
  }
}

async function getIncomesByCategory() {
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
        type: "income",
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

export { getIncome, getIncomeAggregate, getIncomesByCategory };
