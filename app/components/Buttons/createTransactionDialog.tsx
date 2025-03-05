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

import AddTransactionForm from "../Forms/addTransactionForm";
import { TransactionTypes } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  trigger: ReactNode;
  type: TransactionTypes;
}

export function CreateTransactionDialog({ trigger, type }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            Create a new{" "}
            <span
              className={cn(
                "",
                type === "income" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {type}{" "}
            </span>
            transaction
          </DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          <AddTransactionForm type={type} />
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Close
            </Button>
          </DialogClose>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
