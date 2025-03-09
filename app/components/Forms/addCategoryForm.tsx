"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import addCategory from "@/app/actions/createCategory";
import EmojiPicker from "emoji-picker-react";
import { TransactionTypes } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddCategoryFormProps {
  type: TransactionTypes;
}

const AddCategoryForm = ({ type }: AddCategoryFormProps) => {
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>(""); // State to hold the emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => addCategory(formData),
    onSuccess: (result) => {
      if (result && result.data) {
        toast.success("Category added");
        formRef.current?.reset();
        setSelectedEmoji("");
      } else if (result && result.error) {
        toast.error(result.error);
      } else {
        toast.error("An unexpected error occured");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add category");
      console.error("Error adding category:", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCategories"],
      });
    },
  });

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setSelectedEmoji(emojiData.emoji);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 py-4">
      {/* Category Name */}
      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Category Name
        </Label>
        <Input id="name" name="name" className="col-span-3" />
      </div>

      {/* Category Icon / Emoji */}
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="icon" className="text-right">
          Category Icon / Emoji
        </Label>

        {/* Emoji Display */}
        <div
          className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-100"
          onClick={() => setShowEmojiPicker(true)}
        >
          {selectedEmoji ? (
            <span className="text-2xl">{selectedEmoji}</span>
          ) : (
            <span className="text-gray-500">No emoji selected</span>
          )}
          <Button type="button" variant="outline" size="sm">
            Select Emoji
          </Button>
        </div>

        {/* Emoji Picker (Hidden by Default) */}
        {showEmojiPicker && (
          <div className="relative">
            <EmojiPicker
              className="h-[300px] w-[300px] p-3 md:p-0 md:h-[400px] md:w-[450px]"
              onEmojiClick={(emoji) => {
                handleEmojiClick(emoji);
                setShowEmojiPicker(false); // Close picker after selection
              }}
            />
          </div>
        )}

        <input type="hidden" name="icon" value={selectedEmoji} />
      </div>

      <input type="hidden" name="type" value={type} />

      {/* Submit Button */}
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <span className="flex items-center animate-pulse duration-700">
            Saving ...
          </span>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default AddCategoryForm;
