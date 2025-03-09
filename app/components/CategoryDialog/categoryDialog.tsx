"use client";
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
import { Plus } from "lucide-react";
import AddCategoryForm from "../Forms/addCategoryForm";
import { TransactionTypes } from "@/lib/types";

interface NewCategoryProps {
  type: TransactionTypes;
}

export function NewCategory({ type }: NewCategoryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus /> Add a new category
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-h-11/12 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            Create a new <span className="text-blue-500">Category</span>
          </DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          <AddCategoryForm type={type} />{" "}
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
