import ManageIncomesDataTable from "@/app/components/Transactions/All-Income/ManageIncomesTable";
import React from "react";

const Income = () => {
  return (
    <div className="">
      <span className="text-2xl md:text-3xl font-bold  underline underline-offset-8 decoration-2 ">
        Your <span className="text-emerald-500">Income</span> History
      </span>
      <ManageIncomesDataTable />
    </div>
  );
};

export default Income;
