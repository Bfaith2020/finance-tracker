import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";

const TIPS_QUOTES = [
  "A budget is like telling your money where to go instead of wondering where it went. – Dave Ramsey",
  "Do not save what is left after spending, but spend what is left after saving. – Warren Buffett",
  "It’s not your salary that makes you rich, it’s your spending habits.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Beware of little expenses; a small leak will sink a great ship. – Benjamin Franklin",
  "Don’t watch the clock; do what it does. Keep going.",
  "Financial freedom is available to those who learn about it and work for it.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Save money and money will save you.",
  "An investment in knowledge pays the best interest. – Benjamin Franklin"
];

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState("");
  const [showTip, setShowTip] = useState(false);
  // Bill due soon reminder (example, replace with real data)
  const [showBillReminder, setShowBillReminder] = useState(true);
  // Example: Always show two test bills due soon for demo
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  // Get recurring payments from dashboardData if available
  const recurringPayments = dashboardData?.recurringPayments || [];
  // Combine test bill and recurring payments
  const allBills = [
    { name: "MTN Mobile", dueDate: tomorrow.toISOString().slice(0, 10) },
    { name: "Netflix", dueDate: dayAfter.toISOString().slice(0, 10) },
    // ...add more bills from user input/recurring payments...
    ...recurringPayments
  ];
  // Helper to check if a due date is within X days
  const isDueSoon = (dueDate, days = 3) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff <= days && diff >= 0;
  };
  const dueBills = allBills.filter(bill => isDueSoon(bill.dueDate));

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

  useEffect(() => {
    setTip(TIPS_QUOTES[Math.floor(Math.random() * TIPS_QUOTES.length)]);
    setShowTip(false);
    const timer = setTimeout(() => setShowTip(true), 0);
    return () => clearTimeout(timer);
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
    <>
      <DashboardLayout activeMenu="Dashboard" spendingAlerts={spendingAlerts} tip={tip}>
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
            <div className="card bg-[var(--color-card)] border-[var,--color-border)] overflow-hidden">
              {/* No extra heading here */}
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpenses || 0}
              />
            </div>
            <div className="card bg-[var,--color-card] border-[var(--color-border)] overflow-hidden">
              {/* No extra heading here */}
              <ExpenseTransactions
                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
              />
            </div>
            <div className="card bg-[var,--color-card] border-[var(--color-border)] overflow-hidden">
              {/* No extra heading here */}
              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || []}
              />
            </div>
            <div className="card bg-[var,--color-card)] border-[var(--color-border)] overflow-hidden">
              {/* No extra heading here */}
              <RecentIncomeWithChart
                data={
                  dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
                }
                totalIncome={dashboardData?.totalIncome || 0}
              />
            </div>
            <div className="card bg-[var,--color-card)] border-[var(--color-border)] overflow-hidden">
              {/* No extra heading here */}
              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </div>
          {showBillReminder && dueBills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="fixed bottom-8 right-8 bg-white border border-[var(--color-border)] shadow-lg rounded-xl px-6 py-4 z-50 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl text-[var(--color-primary)]">⏰</span>
                <span className="font-semibold text-[var(--color-primary)]">Upcoming Bills Due Soon</span>
              </div>
              <ul className="text-[var(--color-text)] text-sm">
                {dueBills.map((bill, idx) => (
                  <li key={idx} className="mb-1">
                    <span className="font-medium">{bill.name}</span> <span className="ml-2">Due: {bill.dueDate}</span>
                  </li>
                ))}
              </ul>
              <button
                className="text-xs text-[var(--color-primary)] underline mt-1 self-end"
                onClick={() => setShowBillReminder(false)}
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </div>
      </DashboardLayout>
      {/* Copyright footer removed as requested */}
    </>
  );
};

export default Home;

