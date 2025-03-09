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
import { ChevronDown } from "lucide-react";
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
  const { data, isPending, isError, error } = useQuery({
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
            <NewCategory type={type} />
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
