// "use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import updateCategories from "@/app/actions/updateCategory";

// export default function UpdateCategoryForm() {
//   // Added categoryName prop
//   const [newName, setNewName] = useState("");
//   const [selectedEmoji, setSelectedEmoji] = useState("");

//   const updateCategoryMutation = useMutation({
//     mutationFn: () => updateCategories(name, newName, type)
//     onSuccess: () => {
//       // Handle success (e.g., show a success message)
//       console.log("Category updated successfully!");
//     },
//     onError: (error) => {
//       // Handle error (e.g., show an error message)
//       console.error("Error updating category:", error);
//     },
//   });

//   const handleEmojiClick = (emojiData: { emoji: string }) => {
//     setSelectedEmoji(emojiData.emoji);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     updateCategoryMutation.mutate();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid gap-4 py-4 px-3">
//       <div className="grid grid-cols-2 items-center gap-4">
//         <Label htmlFor="newName" className="text-right">
//           New Category Name
//         </Label>
//         <Input
//           id="newName"
//           name="newName"
//           className="col-span-3"
//           value={newName}
//           onChange={(e) => setNewName(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 items-center gap-4">
//         <Label htmlFor="icon" className="text-right">
//           Category Icon / Emoji
//         </Label>
//         {selectedEmoji && (
//           <div className="mt-2">
//             <strong>You selected:</strong> {selectedEmoji}
//           </div>
//         )}
//         <EmojiPicker height={400} width={350} onEmojiClick={handleEmojiClick} />
//         <input type="hidden" name="icon" value={selectedEmoji} />
//       </div>
//       <Button type="submit" disabled={updateCategoryMutation.isPending}>
//         {updateCategoryMutation.isPending ? (
//           <span className="flex items-center animate-pulse duration-700">
//             Saving ....
//           </span>
//         ) : (
//           "Save Changes"
//         )}
//       </Button>
//     </form>
//   );
// }
