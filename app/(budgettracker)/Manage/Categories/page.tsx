import ManageCategoriesDataTable from "@/app/components/Categories/ManageCategoriesTable";
import React from "react";

const Categories = () => {
  return (
    <div className="">
      <span className="text-lg md:text-2xl font-bold underline underline-offset-8 decoration-2">
        Your <span className="text-blue-500">Categories</span>
      </span>
      <ManageCategoriesDataTable />
    </div>
  );
};

export default Categories;
