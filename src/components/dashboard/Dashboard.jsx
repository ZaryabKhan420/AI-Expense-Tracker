import React from "react";
import {
  CardInfo,
  BarChartDashboard,
  ExpenseList,
  BudgetItem,
  SideBar,
} from "../index";
import { useUser } from "@clerk/clerk-react";
const Dashboard = ({ budgetList, expenseList, incomeList }) => {
  const { user } = useUser();
  return (
    <div className="p-5 col-span-1 md:col-span-3 lg:col-span-6">
      <h2 className="text-4xl font-bold">Hi, {user?.fullName}</h2>
      <p className="text-gray-500 my-1">
        Here's what happening with your money, Let's Manage your expense.
      </p>

      <CardInfo
        budgetList={budgetList}
        incomeList={incomeList}
        expenseList={expenseList}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseList
            expenseList={expenseList}
            refreshData={() => {
              getUserBudgets();
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 w-full h-fit">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList && budgetList?.length > 0
            ? budgetList.map((budget, index) => {
                return <BudgetItem budget={budget} key={index} />;
              })
            : [1, 2, 3, 4].map((items, index) => {
                return (
                  <div
                    key={index}
                    className="h-[180px] w-full bg-slate-200 lg animate-pulse"
                  ></div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
