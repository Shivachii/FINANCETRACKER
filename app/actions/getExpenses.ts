"use server";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getExpenses() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // console.log("Querying expenses for:", { userId, type: "expense" });
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
    console.log("Calculating expense aggregate for:", {
      userId,
      type: "expense",
    });

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
    console.log(totalExpense);

    return { totalExpense };
  } catch (error) {
    console.error("Error calculating expense aggregate:", error);
    return { error: "Failed to calculate expense aggregate" };
  }
}

export { getExpenses, getExpensesAggregate };
