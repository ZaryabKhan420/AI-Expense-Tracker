import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Incomes,
  Expenses,
  Budgets,
  Upgrade,
  Dashboard,
  SideBar,
} from "../components/index";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../configs/index";
import { budgets, income, expenses } from "../../configs/schema";
import { eq, desc, getTableColumns, sql } from "drizzle-orm";

const DashboardPage = () => {
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [activePage, setActivePage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  useEffect(() => {
    user && getUserBudgets();
  }, [user]);

  const getUserBudgets = async () => {
    const createdByEmail = user?.primaryEmailAddress?.emailAddress;

    if (!createdByEmail) {
      console.error("User email address is not available");
      return;
    }

    try {
      const result = await db
        .select({
          ...getTableColumns(budgets),
          totalSpend: sql`SUM(CAST(${expenses.amount} AS NUMERIC))`.mapWith(
            Number
          ), // Ensure amount is treated as numeric
          totalItem: sql`COUNT(${expenses.id})`.mapWith(Number),
        })
        .from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(eq(budgets.createdBy, createdByEmail))
        .groupBy(budgets.id)
        .orderBy(desc(budgets.id));
      setBudgetList(result);
      getAllExpenses(); // Fetch expenses after getting budgets
      getUserIncomes(); // Fetch incomes after getting budgets
    } catch (error) {
      console.error("Error fetching user budgets:", error); // Log any errors that occur
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: expenses.id,
          name: expenses.name,
          amount: expenses.amount,
          createdBy: expenses.createdBy,
          createdAt: expenses.createdAt,
        })
        .from(expenses) // start with the expenses table
        .leftJoin(budgets, eq(budgets.id, expenses.budgetId)) // get budgets where available
        .where(eq(budgets.createdBy, user?.primaryEmailAddress?.emailAddress)) // filter based on user
        .orderBy(desc(expenses.id));

      if (result) {
        // console.log(result);
      }

      setExpenseList(result);
    } catch (error) {
      console.log("Error in getting all Expenses from Database", error);
    }
  };

  const getUserIncomes = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(income),
          totalAmount: sql`SUM(CAST(${income.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(income)
        .groupBy(income.id); // Assuming you want to group by ID or any other relevant column

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 ">
      <div className="col-span-1 lg:col-span-2 ">
        <SideBar />
      </div>
      <div className="col-span-1 md:col-span-3 lg:col-span-6">
        {activePage === "/dashboard" && (
          <Dashboard
            budgetList={budgetList}
            expenseList={expenseList}
            incomeList={incomeList}
          />
        )}
        {activePage === "/dashboard/budgets" && (
          <Budgets budgetList={budgetList} getUserBudgets={getUserBudgets} />
        )}
        {activePage === "/dashboard/incomes" && (
          <Incomes
            incomeList={incomeList}
            budgetList={budgetList}
            getUserIncomes={getUserIncomes}
          />
        )}
        {activePage === "/dashboard/expenses" && (
          <Expenses expenseList={expenseList} getAllExpenses={getAllExpenses} />
        )}
        {activePage === "/dashboard/upgrade" && <Upgrade />}
      </div>
    </div>
  );
};

export default DashboardPage;
