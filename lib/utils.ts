import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function for formatting numbers
export function formatCurrency(amount: number | null): string {
  if (amount === null) {
    return "Loading...";
  }

  const formattedAmount = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);

  return formattedAmount;
}

export const transactionErrorMessages = {
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
