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
    <form ref={formRef} onSubmit={handleSubmit} className="grid  gap-4 py-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Category Name
        </Label>
        <Input id="name" name="name" className="col-span-3" />
      </div>
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="icon" className="text-right">
          Category Icon / Emoji
        </Label>
        {selectedEmoji && (
          <div className="mt-2">
            <strong>You selected:</strong> {selectedEmoji}
          </div>
        )}
        <EmojiPicker height={400} width={450} onEmojiClick={handleEmojiClick} />
        <input type="hidden" name="icon" value={selectedEmoji} />
      </div>
      <input type="hidden" name="type" value={type} />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <span className="flex items-center animate-pulse duration-700">
            Saving ....
          </span>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default AddCategoryForm;
