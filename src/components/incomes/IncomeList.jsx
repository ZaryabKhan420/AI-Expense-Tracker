import React from "react";
import CreateIncome from "./CreateIncome";
import IncomeItem from "./IncomeItem";
function IncomeList({ incomeList, getUserIncomes }) {
  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        lg:grid-cols-2 gap-5 w-full"
      >
        <CreateIncome refreshData={() => getUserIncomes()} />
        {incomeList?.length > 0
          ? incomeList.map((budget, index) => (
              <IncomeItem
                budget={budget}
                key={index}
                refreshData={() => getUserIncomes()}
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
  );
}

export default IncomeList;
