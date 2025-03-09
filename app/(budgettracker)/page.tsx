import { CreateTransactionDialog } from "../components/Buttons/createTransactionDialog";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Totals } from "../components/Totals/Totals";
import { Button } from "@/components/ui/button";
import ExpensesDataTable from "../components/Transactions/ExpensesTable";
import IncomesDataTable from "../components/Transactions/IncomesTable";
// import { TransactionsBarChart } from "../components/Charts/BarChart";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  const user = await currentUser();

  return (
    <main className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 w-full">
      {/* WELCOME MESSAGE */}
      <div className="text-xl md:text-3xl flex flex-wrap items-center gap-4 justify-between">
        <span className="font-bold">
          Hello {user?.firstName} 👋, welcome back
        </span>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-2">
          <CreateTransactionDialog
            type="income"
            trigger={
              <Button className="text-base border-emerald-500 bg-emerald-900 text-white hover:bg-emerald-700 p-2 flex items-center rounded-md">
                Add Income
              </Button>
            }
          />
          <CreateTransactionDialog
            type="expense"
            trigger={
              <Button className="border-rose-500 bg-rose-900 text-white hover:bg-rose-700 hover:text-white">
                Add Expense
              </Button>
            }
          />
        </div>
      </div>

      {/* Totals */}
      <div className="my-5">
        <Totals />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold">Overview</h1>

      {/* INTERPRETATION */}
      {/* <div>
      <h1 className="font-bold underline underline-offset-8 decoration-2">
        Your Stats
      </h1>
      <TransactionsBarChart />
    </div> */}

      <div className="flex flex-col gap-6">
        {/* Transaction History */}
        <div className="overflow-x-auto">
          <span className="text-lg md:text-2xl font-bold underline underline-offset-8 decoration-2">
            Your recent <span className="text-emerald-500">Incomes</span>
          </span>
          <IncomesDataTable />
        </div>

        <div className="overflow-x-auto">
          <span className="text-lg md:text-2xl font-bold underline underline-offset-8 decoration-2">
            Your recent <span className="text-rose-500">Expenses</span>
          </span>
          <ExpensesDataTable />
        </div>
      </div>
    </main>
  );
}
