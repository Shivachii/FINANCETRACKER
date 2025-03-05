"use server";
import prisma from "@/lib/db";
import { TransactionTypes } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

async function getCategories(type: TransactionTypes) {
  const { userId } = await auth();
  if (!userId) {
    return {
      error: "User not found",
    };
  }
  try {
    // console.log("Querying categories for:", { userId, type });
    const allCategories = await prisma.category.findMany({
      where: {
        userId: userId,
        type: type,
      },
    });

    // console.log(allCategories);
    return { allCategories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

export default getCategories;

export async function getAllCategories() {
  const { userId } = await auth();
  if (!userId) {
    return {
      error: "User not found",
    };
  }
  try {
    // console.log("Querying categories for:", { userId, type });
    const allCategories = await prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    // console.log(allCategories);
    return { allCategories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}
