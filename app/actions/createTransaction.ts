"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  description: string;
  category: string;
  amount: number;
  type: string;
  categoryIcon?: string;
  date: Date;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const transactionErrorMessages = {
  missingDescription: "Transaction description is missing",
  missingAmount: "Transaction amount is missing",
  missingCategory: "Transaction category is missing",
  missingType: "Transaction type is missing",
  invalidAmount: "Invalid transaction amount",
  missingDate: "Transaction date is missing",
  invalidDate: "Invalid transaction date",
  userNotFound: "User not found",
  categoryNotFound: "Category not found",
  unknownError: "An unknown error occurred",
};

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const description = formData.get("description")?.toString() || "";
  const amount = formData.get("amount")?.toString() || "";
  const category = formData.get("category")?.toString() || "";
  const dialogType = formData.get("dialogType")?.toString() || "";
  const dateString = formData.get("date")?.toString() || "";

  if (!description) {
    return { error: transactionErrorMessages.missingDescription };
  }
  if (!amount) {
    return { error: transactionErrorMessages.missingAmount };
  }
  if (!category) {
    return { error: transactionErrorMessages.missingCategory };
  }
  if (!dialogType) {
    return { error: transactionErrorMessages.missingType };
  }

  const amountValue: number = parseFloat(amount);
  if (isNaN(amountValue) || amountValue <= 0) {
    return { error: transactionErrorMessages.invalidAmount };
  }

  if (!dateString) {
    return { error: transactionErrorMessages.missingDate };
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return { error: transactionErrorMessages.invalidDate };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: transactionErrorMessages.userNotFound };
  }

  try {
    const categoryData = await prisma.category.findUnique({
      where: {
        name_userId_type: {
          name: category,
          userId: userId,
          type: dialogType,
        },
      },
      select: {
        icon: true,
      },
    });

    if (!categoryData) {
      return { error: transactionErrorMessages.categoryNotFound };
    }

    const transactionData: TransactionData = await prisma.transaction.create({
      data: {
        category: category,
        description: description,
        amount: amountValue,
        userId,
        date: date,
        type: dialogType,
        categoryIcon: categoryData.icon,
      },
    });

    revalidatePath("/");

    return { data: transactionData };
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error adding transaction:", err.message);
      return { error: "Transaction not added: " + err.message };
    }
    console.error("An unknown error occurred");
    return { error: transactionErrorMessages.unknownError };
  }
}

export default addTransaction;
