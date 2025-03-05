"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getMonthHistory() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const monthHistory = await prisma.monthHistory.findMany();
    return { monthHistory };
  } catch (error) {
    console.error("Error fetching month history:", error);
    return {
      error: "Failed to fetch month history",
    };
  }
}

export default getMonthHistory;
