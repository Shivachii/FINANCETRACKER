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

export { getIncome, getIncomeAggregate };
