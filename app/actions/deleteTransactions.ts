"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function deleteTransactions(
  ids: string[], // Accept array of ids
  type: string
) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    for (const id of ids) {
      await prisma.transaction.delete({
        where: {
          id,
          type,
        },
      });
    }

    revalidatePath("/");
    return { success: "Transactions deleted" };
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return { error: "Failed to delete transactions" };
  }
}
