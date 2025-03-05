"use server";

import prisma from "@/lib/db";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function deleteCategories(names: string[]) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    for (const name of names) {
      await prisma.category.deleteMany({
        where: {
          name,
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
