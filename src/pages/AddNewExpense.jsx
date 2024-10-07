import React, { useEffect, useState } from "react";
import { BudgetItem, SideBar } from "../components/index";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { db } from "../../configs/index";
import { expenses, budgets } from "../../configs/schema";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { eq, desc, getTableColumns, sql } from "drizzle-orm";
import moment from "moment";
const AddNewExpense = () => {
  const [budgetDetails, setBudgetDetails] = useState({});
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const { budgetId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (budgetId && user) {
      getBudgetDetails();
    }
  }, []);

  const getBudgetDetails = async () => {
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
          ), // Total spend per budget
          totalItem: sql`COUNT(${expenses.id})`.mapWith(Number), // Total items per budget
        })
        .from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId)) // Join budgets with expenses
        .where(eq(budgets.createdBy, createdByEmail)) // Filter by user's email
        .groupBy(budgets.id) // Group by budget ID
        .orderBy(desc(budgets.id)); // Order by budget ID in descending order

      if (result && result.length > 0) {
        setBudgetDetails(result[0]); // Set the first result as the budget details
      } else {
        console.log("No budget details found.");
      }
    } catch (error) {
      console.error("Error fetching user budgets:", error); // Log any errors that occur
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const result = await db.insert(expenses).values({
        name: expenseName,
        amount: expenseAmount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        budgetId: budgetId,
        createdAt: moment().format("LLLL"),
      });
      if (result) {
        toast("Expense Added");
        setExpenseName("");
        setExpenseAmount("");
      }
    } catch (error) {
      console.log("Error during Adding Expense.", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (expenseAmount === "" || expenseName === "") {
      setIsButtonDisable(true);
    } else {
      setIsButtonDisable(false);
    }
  }, [expenseName, expenseAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setExpenseName(value);
    } else {
      setExpenseAmount(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
      <div className="col-span-1 lg:col-span-2">
        <SideBar />
      </div>
      <div className="col-span-1 md:col-span-3 lg:col-span-6 mt-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="flex flex-col justify-start items-start gap-5 w-full">
            <h2 className="text-3xl font-bold text-black">My Expenses</h2>
            <div className="w-full">
              {Object.keys(budgetDetails).length > 0 && (
                <BudgetItem
                  budget={budgetDetails}
                  index={Math.floor(Math.random() * 120)}
                />
              )}
            </div>
          </div>

          <form
            className="flex flex-col justify-start items-start gap-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold">Add Expense</h2>
            <label htmlFor="name" className="font-bold">
              Expense Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g Bedroom Decor"
              id="name"
              name="name"
              value={expenseName}
              className="w-full p-3 rounded-lg"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="amount" className="font-bold">
              Expense Amount
            </label>
            <input
              type="text"
              placeholder="e.g 1000"
              required
              id="amount"
              name="amount"
              value={expenseAmount}
              className="w-full p-3 rounded-lg"
              onChange={(e) => handleChange(e)}
            />
            <Button disabled={isButtonDisable} className="w-full" type="submit">
              {loader ? (
                <Loader2 className="animate-spin text-white " />
              ) : (
                "Add New Expense"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewExpense;
