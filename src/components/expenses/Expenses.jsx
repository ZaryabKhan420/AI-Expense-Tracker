import React from "react";
import ExpenseList from "./ExpenseList";
const Expenses = ({ expenseList, getAllExpenses }) => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>

      <ExpenseList
        refreshData={() => getAllExpenses()}
        expenseList={expenseList}
      />
    </div>
  );
};

export default Expenses;
