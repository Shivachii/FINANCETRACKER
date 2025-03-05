// import prisma from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";

// export default async function updateCategories(
//   name: string,
//   newName: string,
//   type: string
// ) {
//   // Added newName parameter
//   const { userId } = await auth();
//   if (!userId) {
//     return { error: "User not found" };
//   }

//   if (!name || !newName) {
//     return { error: "Name and newName are required." };
//   }
//   if (!type) {
//     return { error: " Category type missing" };
//   }

//   try {
//     const updatedCategory = await prisma.category.update({
//       where: {
//         name_userId_type: {
//           name,
//           userId,
//           type: type,
//         },
//       },
//       data: {
//         name: newName,
//       },
//     });
//     revalidatePath("/");

//     return { data: updatedCategory };
//   } catch (error) {
//     console.error("Error updating category:", error);

//     if ((error as any).code === "P2025") {
//       return { error: "Category not found." };
//     }
//     if ((error as any).code === "P2002") {
//       return { error: "A category with this name already exists." };
//     }

//     return { error: "Failed to update category" };
//   }
// }
