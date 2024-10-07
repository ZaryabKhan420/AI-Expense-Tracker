import React from "react";
import { Trash } from "lucide-react";
import { db } from "../../../configs/index";
import { income } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function IncomeItem({ budget, refreshData }) {
  const handleDelete = async (budgetId) => {
    try {
      const result = await db.delete(income).where(eq(income.id, budgetId));
      if (result) {
        toast("Income Deleted");
        refreshData();
      }
    } catch (error) {
      console.log("Error Occurred during Deleting Income", error);
    }
  };

  return (
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
            <h2 className="text-sm text-gray-500">{budget?.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> ${budget?.amount}</h2>
      </div>
    </div>
  );
}

export default IncomeItem;
