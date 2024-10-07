import React from "react";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";
const BudgetList = ({ budgetList, getUserBudgets }) => {
  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
   lg:grid-cols-2 gap-5 w-full"
      >
        <CreateBudget refreshData={getUserBudgets} />
        <div className="w-full">
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem
                  budget={budget}
                  key={index}
                  refreshData={getUserBudgets}
                />
              ))
            : [1, 2, 3, 4, 5].map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 rounded-lg
              h-[150px] animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
