import React from "react";
import BudgetList from "./BudgetList";
const Budgets = ({ budgetList, getUserBudgets }) => {
  return (
    <div className="md:p-10">
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetList
        budgetList={budgetList}
        getUserBudgets={() => getUserBudgets()}
      />
    </div>
  );
};

export default Budgets;
