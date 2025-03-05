import { Button } from "@/components/ui/button";
import { TransactionTypes } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import deleteTransactions from "@/app/actions/deleteTransactions";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedRowData: TData[];
  type: TransactionTypes;
}

export default function DeleteTransaction<
  TData extends { id: string },
  TValue
>({ type, selectedRowData }: Props<TData, TValue>) {
  const queryClient = useQueryClient();

  const deleteTransactionMutation = useMutation({
    mutationFn: (ids: string[]) => deleteTransactions(ids, type), // Pass ids directly
    onSuccess: (result) => {
      if (result && result.success) {
        toast.success("Transactions deleted successfully!");
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
        queryKey: ["getIncome"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getExpenses"],
      });
    },
  });

  const handleDelete = () => {
    const ids = selectedRowData.map((row) => row.id);
    deleteTransactionMutation.mutate(ids);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={deleteTransactionMutation.isPending}
    >
      {deleteTransactionMutation.isPending ? "Deleting..." : "DELETE?"}
    </Button>
  );
}
