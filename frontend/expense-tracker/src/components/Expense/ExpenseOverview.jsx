import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const data = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1500 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 1100 },
    { month: "May", amount: 2000 },
    { month: "Jun", amount: 1700 },
    { month: "Jul", amount: 1900 },
    { month: "Aug", amount: 2100 },
    { month: "Sep", amount: 1600 },
    { month: "Oct", amount: 2300 },
    { month: "Nov", amount: 2500 },
    { month: "Dec", amount: 2700 },
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="ml-4 mt-4 text-[var(--color-primary)]">Expense Overview</h5>
          <p className="text-xs ml-4 mt-0.5 text-[var(--color-text-secondary)]">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>

        <button
          className="add-btn flex items-center gap-1 mr-4 text-white bg-[var(--color-primary)]"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg text-white" />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
