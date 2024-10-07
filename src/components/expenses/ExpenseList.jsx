import { db } from "../../../configs/index";
import { expenses } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { formatNumber } from "../../../configs/formatNumber";

function ExpenseListTable({ expenseList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(expenses)
      .where(eq(expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };
  return (
    <div>
      <div className="mt-3  hidden sm:block">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3 w-full justify-between gap-5">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Amount</h2>
          <h2 className="font-bold">Date</h2>
          <h2 className="font-bold">Action</h2>
        </div>
        {expenseList.map((expense, index) => (
          <div className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2 w-full justify-between gap-5">
            <h2 className="px-2 break-words">{expense.name}</h2>
            <h2 className="px-2 break-words">
              ${formatNumber(expense.amount)}
            </h2>
            <h2 className="px-2 break-words">{expense.createdAt}</h2>
            <h2 className="px-2 break-words">
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-3 block sm:hidden">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        {expenseList.map((expense, index) => (
          <div className="grid grid-cols-1 bg-slate-50 rounded-bl-xl rounded-br-xl p-2 w-full justify-between gap-5">
            <h2 className="px-2 break-words">
              <span className="font-bold text-lg mr-5 ">Name: </span>
              {expense.name}
            </h2>
            <h2 className="px-2 break-words flex justify-between items-center">
              <span className="font-bold text-lg">Amount: </span> $
              {formatNumber(expense.amount)}
            </h2>
            <h2 className="px-2 break-words">
              <span className="font-bold text-lg  mr-5">Date: </span>
              {expense.createdAt}
            </h2>
            <h2 className="px-2 break-words flex justify-between items-center">
              <span className="font-bold text-lg">Action: </span>

              <Trash
                className="text-red-500 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseListTable;
