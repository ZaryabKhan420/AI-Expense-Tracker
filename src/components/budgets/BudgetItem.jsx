import React from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { db } from "../../../configs/index";
import { budgets, expenses } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
const BudgetItem = ({ budget, index, refreshData }) => {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const handleDelete = async (budgetId) => {
    try {
      const result1 = await db
        .delete(expenses)
        .where(eq(expenses.budgetId, budgetId));
      const result2 = await db.delete(budgets).where(eq(budgets.id, budgetId));
      if (result1 && result2) {
        refreshData();
        toast("Budget Deleted");
      }
    } catch (error) {
      console.log("Error Occurred during Deleting Budget", error);
    }
  };

  return (
    <Link key={index} to={`/dashboard/expenses/${budget.id}`}>
      <div
        className="p-5 border rounded-2xl
hover:shadow-md cursor-pointer h-[170px] w-full relative"
      >
        <Trash
          className="absolute top-2 right-2 text-red-500 h-5 w-5"
          onClick={() => handleDelete(budget.id)}
        />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2
              className="text-2xl p-3 px-4
          bg-slate-100 rounded-full 
          "
            >
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItem} Item
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg"> ${budget?.amount}</h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              ${budget?.totalSpend ? budget?.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-slate-400">
              ${budget?.amount - budget?.totalSpend} Remaining
            </h2>
          </div>
          <div
            className="w-full
          bg-slate-300 h-2 rounded-full"
          >
            <div
              className="
          bg-primary h-2 rounded-full"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BudgetItem;
