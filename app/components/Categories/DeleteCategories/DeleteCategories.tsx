import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCategories from "@/app/actions/deleteCategories";

interface Props<TData extends { name: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedRowData: TData[];
}

export default function DeleteCategory<TData extends { name: string }, TValue>({
  selectedRowData,
}: Props<TData, TValue>) {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: (names: string[]) => deleteCategories(names), // Pass ids directly
    onSuccess: (result) => {
      if (result && result.success) {
        toast.success("Category deleted successfully!");
      } else if (result && result.error) {
        toast.error(result.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
    onError: (error) => {
      console.error("Deletion error:", error);
      toast.error("Failed to delete transactions.");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getAllCategories"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["incomeByCategory"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["expenseByCategory"],
      });
    },
  });

  const handleDelete = () => {
    const names = selectedRowData.map((row) => row.name);
    deleteCategoryMutation.mutate(names); // Use the mutation's mutate function
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete?</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {" "}
            This operation is <span className="text-red-500">irreversible</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            disabled={deleteCategoryMutation.isPending}
          >
            {deleteCategoryMutation.isPending ? "Deleting..." : "Continue?"}
          </Button>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
