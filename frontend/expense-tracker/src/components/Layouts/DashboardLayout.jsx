import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";
import { LuSmile } from "react-icons/lu";

// Example badges for gamification
const BADGES = [
  { icon: "🏆", label: "Savings Goal Met" },
  { icon: "🛑", label: "No-Spend Day" },
];

const DashboardLayout = ({ children, activeMenu, spendingAlerts = [], tip }) => {
  const { user } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);

  // Apply/remove dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Placeholder: open expense splitting feature
  const handleExpenseSplit = () => {
    alert("Expense splitting feature coming soon!");
  };

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: "#ecfdf5" }}
    >
      <Navbar activeMenu={activeMenu} darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />

      {user && (
        <div className="flex">
          <SideMenu activeMenu={activeMenu} />
          <main className="flex-1 px-6 py-8">
            {/* Welcoming Header */}
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-green-900 mb-1 welcome-header">
                    Welcome back, {user?.fullName?.split(" ")[0] || "User"}!
                  </h1>
                  <p className="text-green-700 text-base">
                    Here’s your personal finance overview. Stay on track and reach your goals!
                  </p>
                  {tip && (
                    <div className="overflow-hidden mt-6">
                      <div
                        style={{
                          fontStyle: "italic",
                          display: "inline-block",
                          animation: "slideInTip 2.5s cubic-bezier(.4,0,.2,1)",
                          animationFillMode: "forwards"
                        }}
                      >
                        {tip}
                      </div>
                    </div>
                  )}
                  {/* AI Spending Alerts (dynamic, only if spendingAlerts is non-empty) */}
                  {spendingAlerts.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {spendingAlerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-green-100 border border-green-300 text-green-900 shadow-sm flex items-center gap-3"
                        >
                          <span className="text-2xl" role="img" aria-label="alert">
                            {"💡"}
                          </span>
                          <span>
                            <strong>{alert.title || "Spending Alert"}:</strong> {alert.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gamification: Earned Badges */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {BADGES.map((badge, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-200 text-green-900 text-sm font-semibold shadow">
                        <span>{badge.icon}</span>
                        <span>{badge.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expense Splitting Feature */}
                  <div className="mt-4">
                    <button
                      className="px-4 py-2 rounded-lg bg-green-200 text-green-900 font-semibold shadow hover:bg-green-300 transition"
                      onClick={handleExpenseSplit}
                    >
                      Split an Expense
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="w-14 h-14 rounded-full border-4 border-green-400/30 shadow"
                    />
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full text-green-700 text-3xl shadow">
                      <LuSmile />
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b border-green-200 mb-8" />
              {/* Main Content */}
              {children}
            </>
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

/* In your index.css, ensure you have:
@keyframes slideInTip {
  from { transform: translateX(-100vw); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
*/


