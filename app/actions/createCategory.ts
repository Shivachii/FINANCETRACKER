"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CategoryData {
  name: string;
  icon: string;
  type: string;
}

interface CategoryResult {
  data?: CategoryData;
  error?: string;
}

async function addCategory(formData: FormData): Promise<CategoryResult> {
  const name = formData.get("name");
  const icon = formData.get("icon");
  const type = formData.get("type");

  if (!name || name === "") {
    return { error: "Category name is missing" };
  }
  if (!icon) {
    return { error: "Icon missing" };
  }

  if (!type) {
    return { error: " Dialog type missing" };
  }

  const nameValue: string = name.toString();
  const iconValue: string = icon.toString();
  const typeValue: string = type.toString();

  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const categoryData: CategoryData = await prisma.category.create({
      data: {
        name: nameValue,
        icon: iconValue,
        userId,
        type: typeValue,
      },
    });

    revalidatePath("/");

    return { data: categoryData };
  } catch (error) {
    console.error("Error adding category:", error);
    return { error: "Category already exists" };
  }
}

export default addCategory;
