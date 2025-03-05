import ManageExpensesDataTable from "@/app/components/Transactions/All-Expenses/ManageExpensesTable";
import React from "react";

const Expenses = () => {
  return (
    <div className="">
      <span className="text-2xl md:text-3xl font-bold underline underline-offset-8 decoration-2">
        Your <span className="text-rose-500">Expense</span> History
      </span>
      <ManageExpensesDataTable />
    </div>
  );
};

export default Expenses;
