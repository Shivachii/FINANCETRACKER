"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import addTransaction from "@/app/actions/createTransaction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { TransactionTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import CategoryPicker from "../CategoryPicker/categoryPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddTransactionFormProps {
  type: TransactionTypes;
}
const AddTransactionForm = ({ type }: AddTransactionFormProps) => {
  const queryClient = useQueryClient();
  const addTransactionMutation = useMutation({
    mutationFn: (formData: FormData) => addTransaction(formData),
    onSuccess: (result) => {
      if (result && result.data) {
        toast.success("Transaction created successfully!");
        setSelectedCategoryName("");
        setDate(undefined);
        formRef.current?.reset();
      } else if (result && result.error) {
        toast.error(result.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
    onError: (error) => {
      console.error("Deletion error:", error);
      toast.error("Failed to create transaction.");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getIncome"],
      });
      await queryClient.invalidateQueries({ queryKey: ["getExpenses"] });
      await queryClient.invalidateQueries({ queryKey: ["incomeAggregate"] });
      await queryClient.invalidateQueries({
        queryKey: ["expensesAggregate"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["expenseByCategory"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["incomeByCategory"],
      });
    },
  });

  const handleCreateTransaction = (event: { preventDefault: () => void }) => {
    const formData = new FormData(formRef.current!);
    addTransactionMutation.mutate(formData);
    event.preventDefault();
  };

  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleCreateTransaction}
      className="grid gap-4 py-4"
    >
      <div className="grid md:grid-cols-2 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Transaction Description
        </Label>
        <Input id="description" name="description" className="col-span-3" />
      </div>
      <div className="grid md:grid-cols-2 items-center gap-4">
        <Label htmlFor="amount" className="text-right">
          Transaction Amount
        </Label>
        <Input id="amount" type="number" name="amount" className="col-span-3" />
      </div>
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="amount" className="text-right">
          Transaction Date
        </Label>
        <input
          type="hidden"
          name="date"
          value={date ? date.toISOString() : ""}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground relative"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 absolute">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <CategoryPicker
          onCategoryChange={handleCategoryChange}
          selectedCategoryName={selectedCategoryName}
          type={type}
        />
        <input type="hidden" name="category" value={selectedCategoryName} />
      </div>
      <input type="hidden" name="dialogType" value={type} />

      <Button type="submit" disabled={addTransactionMutation.isPending}>
        {addTransactionMutation.isPending ? (
          <span className="animate-pulse">Saving changes ....</span>
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
};

export default AddTransactionForm;
