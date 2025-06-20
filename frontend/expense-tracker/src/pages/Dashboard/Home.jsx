import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/cards/InfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  // Compute relevant spending alerts
  const spendingAlerts = useMemo(() => {
    if (!dashboardData || !dashboardData.recentTransactions || dashboardData.recentTransactions.length === 0) {
      return [{
        icon: "🎉",
        title: "Good Job",
        message: "You are spending less than usual. Keep it up!"
      }];
    }

    const alerts = [];
    // Example: Category Spike Alert
    const expenses = dashboardData.recentTransactions.filter(txn => txn.type === "expense");
    if (expenses.length > 0) {
      // Group by category
      const categoryTotals = {};
      expenses.forEach(txn => {
        categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
      });
      // Find the category with the highest spend
      let maxCategory = null, maxAmount = 0;
      Object.entries(categoryTotals).forEach(([cat, amt]) => {
        if (amt > maxAmount) {
          maxCategory = cat;
          maxAmount = amt;
        }
      });
      // Example: compare to a fake "usual" (here, 80% of current for demo)
      const usual = maxAmount * 0.8;
      if (maxCategory && maxAmount > usual * 1.2) {
        alerts.push({
          icon: "⚠️",
          title: "Spending Alert",
          message: `You’ve spent 25% more on ${maxCategory} this period (R${maxAmount}) compared to your usual pattern.`
        });
      }
    }

    // If no specific alert, show a positive message
    if (alerts.length === 0) {
      alerts.push({
        icon: "🎉",
        title: "Good Job",
        message: "You are spending less than usual. Keep it up!"
      });
    }
    return alerts;
  }, [dashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard" spendingAlerts={spendingAlerts}>
      <div className="my-5 mx-auto">
        {/* Only one main heading, no duplicate headings in cards */}
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-8 px-2">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-[var(--color-primary)] text-white"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-[var(--color-accent-2)] text-[var(--color-primary)]"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-[var(--color-accent-pink)] text-[var(--color-accent-red)]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          </div>
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />
          </div>
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
          </div>
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
          </div>
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <RecentIncomeWithChart
              data={
                dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
              }
              totalIncome={dashboardData?.totalIncome || 0}
            />
          </div>
          <div className="card bg-[var(--color-card)] border-[var(--color-border)] overflow-hidden">
            {/* No extra heading here */}
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

