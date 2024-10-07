import React, { useEffect, useState } from "react";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
  Sparkle,
} from "lucide-react";
import { formatNumber } from "../../../configs/formatNumber";
import { getFinancialAdvice } from "../../../configs/getFinancialAdvice";
const CardInfo = ({ budgetList, incomeList, expenseList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      calculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalSpend > 0 || totalIncome > 0) {
      getFinancialAdviceFromAI(totalBudget, totalIncome, totalSpend);
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const calculateCardInfo = () => {
    let budgetSum = 0;
    let incomeSum = 0;
    let spendSum = 0;

    budgetList?.forEach((element) => {
      budgetSum = budgetSum + Number(element.amount);
      spendSum = spendSum + Number(element.totalSpend);
    });

    incomeList?.forEach((element) => {
      incomeSum = incomeSum + Number(element.amount);
    });

    setTotalBudget(budgetSum);
    setTotalIncome(incomeSum);
    setTotalSpend(spendSum);
  };

  const getFinancialAdviceFromAI = async (
    totalBudget,
    totalIncome,
    totalSpend
  ) => {
    const result = await getFinancialAdvice(
      totalBudget,
      totalIncome,
      totalSpend
    );
    if (result) {
      setFinancialAdvice(result);
    }
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="sm:p-7 mt-4 border rounded-2xl flex justify-between items-center">
            <div className="">
              <div className="mb-2 flex space-x-1 items-center">
                <h2 className="font-bold text-lg">Finan Smart AI</h2>
                <Sparkle
                  className="rounded-full text-white w-10 h-10 p-2 
                bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate
                "
                />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "Loading Financial Advice..."}
              </h2>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalBudget)}
                </h2>
                <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
              </div>
            </div>

            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalSpend)}
                </h2>
                <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
              </div>
            </div>

            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. of Budget</h2>
                <h2 className="text-2xl font-bold">{budgetList?.length}</h2>
                <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
              </div>
            </div>

            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalIncome)}
                </h2>
                <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-7 mt-4 border rounded-2xl flex justify-between items-center">
          Add Some Incomes, Expenses and Budgets First.
        </div>
      )}
    </div>
  );
};

export default CardInfo;
