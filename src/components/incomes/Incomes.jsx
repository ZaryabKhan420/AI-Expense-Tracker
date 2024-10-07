import React from "react";
import IncomeList from "./IncomeList";
const Incomes = ({ incomeList, budgetList, getUserIncomes }) => {
  return (
    <div className="md:p-10">
      <h2 className="font-bold text-3xl">My Income Streams</h2>
      <IncomeList incomeList={incomeList} getUserIncomes={getUserIncomes} />
    </div>
  );
};

export default Incomes;
