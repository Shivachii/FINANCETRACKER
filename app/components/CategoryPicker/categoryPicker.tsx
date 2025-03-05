"use client";
import getCategories from "@/app/actions/getCategories";
import { TransactionTypes } from "@/lib/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronDown, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewCategory } from "../CategoryDialog/categoryDialog";
import { SkeletonLoader } from "../Loader/Skeleton";
import { useQuery } from "@tanstack/react-query";

interface Category {
  name: string;
  icon: string;
  type: string;
}

interface CategoryPickerProps {
  onCategoryChange: (categoryName: string) => void;
  selectedCategoryName: string;
  type: TransactionTypes;
}

export default function CategoryPicker({
  onCategoryChange,
  selectedCategoryName,
  type,
}: CategoryPickerProps) {
  const { data, isRefetching, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getCategories", type], // Add type to query key
    queryFn: async () => {
      return await getCategories(type);
    },
  });

  let categories: Category[] = [];

  if (data) {
    categories =
      data.allCategories?.map(
        (category: { name: string; icon: string; type: string }): Category => ({
          name: category.name,
          icon: category.icon,
          type: category.type,
        })
      ) ?? [];
  }

  const [open, setOpen] = useState(false);

  if (isError) {
    return (
      <span className="">{error?.message || "Error loading categories"}</span>
    );
  }

  if (isPending) {
    return (
      <>
        <SkeletonLoader />
      </>
    );
  }

  const selectedCategory = categories.find(
    (category) => category.name === selectedCategoryName
  );

  return (
    <div className="flex flex-row gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedCategory ? selectedCategory.name : "Select category..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                <div className="flex justify-end">
                  <Button
                    className="w-8 h-8"
                    onClick={() => refetch} // Use refetch
                    disabled={isRefetching}
                  >
                    <RefreshCcw
                      className={` ${isRefetching ? "animate-spin" : ""}`}
                    />
                  </Button>
                </div>
                {categories.map((category) => (
                  <CommandItem
                    key={category.name}
                    value={category.name}
                    onSelect={() => {
                      onCategoryChange(category.name);
                      setOpen(false);
                    }}
                  >
                    {category.icon} {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <NewCategory type={type} />
    </div>
  );
}
