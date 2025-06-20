import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { FaBullseye } from "react-icons/fa6";
import { LuTrendingUp, LuCheck, LuX } from "react-icons/lu";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Use FiTrash2 for a modern trash icon
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: "", target: "", deadline: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", target: "", deadline: "" });

  const fetchGoals = async () => {
    const res = await axiosInstance.get(API_PATHS.GOALS.GET);
    setGoals(res.data);
  };

  const addGoal = async () => {
    if (!form.name || !form.target) return;
    await axiosInstance.post(API_PATHS.GOALS.ADD, form);
    setForm({ name: "", target: "", deadline: "" });
    toast.success("Goal added");
    fetchGoals();
  };

  const deleteGoal = async (id) => {
    await axiosInstance.delete(API_PATHS.GOALS.DELETE(id));
    toast.success("Goal deleted");
    fetchGoals();
  };

  const startEdit = (goal) => {
    setEditId(goal._id);
    setEditForm({
      name: goal.name,
      target: goal.target,
      deadline: goal.deadline ? goal.deadline.slice(0, 10) : "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ name: "", target: "", deadline: "" });
  };

  const saveEdit = async (goal) => {
    if (!editForm.name || !editForm.target) {
      toast.error("Name and target required");
      return;
    }
    // Ensure target is a number and not less than current
    if (Number(editForm.target) < Number(goal.current || 0)) {
      toast.error("Target cannot be less than current progress");
      return;
    }
    await axiosInstance.put(API_PATHS.GOALS.UPDATE(goal._id), {
      ...editForm,
      target: Number(editForm.target)
    });
    toast.success("Goal updated");
    setEditId(null);
    setEditForm({ name: "", target: "", deadline: "" });
    fetchGoals();
  };

  useEffect(() => { fetchGoals(); }, []);

  // Calculate total progress for visuals
  const totalTarget = goals.reduce((sum, g) => sum + Number(g.target || 0), 0);
  const totalCurrent = goals.reduce((sum, g) => sum + Number(g.current || 0), 0);
  const totalPercent = totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  // Prepare data for bar chart
  const barData = goals.map((g, idx) => ({
    name: g.name,
    progress: g.target ? Math.round(((g.current || 0) / g.target) * 100) : 0,
    current: g.current || 0,
    target: g.target || 0,
    color: [
      "var(--color-primary)",
      "var(--color-accent-2)",
      "var(--color-accent-pink)",
      "var(--color-accent-blue)",
      "var(--color-accent-orange)",
      "var(--color-accent-purple)"
    ][idx % 6]
  }));

  return (
    <DashboardLayout activeMenu="Goals">
      <div className="max-w-2xl mx-auto w-full p-6 md:p-10">
        {/* Visual summary */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 w-full">
          <div className="flex flex-col items-center justify-center bg-[var(--color-card)] rounded-2xl shadow p-6 border border-[var(--color-border)] w-full md:w-1/2 min-w-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent-2)] flex items-center justify-center mb-3 shadow">
              <FaBullseye className="text-3xl text-white" />
            </div>
            <div className="text-lg font-semibold text-[var(--color-primary)]">Total Progress</div>
            <div className="text-2xl font-bold mt-1 text-[var(--color-text)]">
              {totalPercent}%
            </div>
            <div className="w-full bg-[var(--color-border)] rounded-full h-2.5 mt-3">
              <div
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: `${totalPercent}%`,
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-2))"
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-[var(--color-accent-2)]/10 rounded-2xl shadow p-6 border border-[var(--color-border)] w-full md:w-1/2 min-w-0">
            <div className="w-14 h-14 rounded-full bg-[var(--color-accent-2)] flex items-center justify-center mb-3 shadow">
              <LuTrendingUp className="text-3xl text-white" />
            </div>
            <div className="text-lg font-semibold text-[var(--color-accent-2)]">Total Saved</div>
            <div className="text-2xl font-bold mt-1 text-[var(--color-primary)]">
              R{totalCurrent} / R{totalTarget}
            </div>
          </div>
        </div>
        {/* Bar Chart for Goals Progress */}
        {barData.length > 0 && (
          <div className="bg-[var(--color-card)] rounded-2xl shadow p-6 border border-[var(--color-border)] mb-8 w-full overflow-x-auto">
            <h6 className="text-base font-semibold text-[var(--color-primary)] mb-4">Goal Progress Overview</h6>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fill: "var(--color-primary)" }} />
                <YAxis tick={{ fill: "var(--color-text-secondary)" }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#fff", borderRadius: 12, border: "1px solid #eee", color: "#3a3a3a" }}
                  formatter={(value, name) => [`${value}%`, "Progress"]}
                />
                <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="card p-6 w-full overflow-x-auto">
          <h5 className="text-lg mb-6 text-[var(--color-primary)] font-bold">Financial Goals</h5>
          <div className="flex flex-col md:flex-row gap-2 mb-6 flex-wrap">
            <input
              className="input-box flex-1"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Goal name"
            />
            <input
            
              className="input-box flex-1"
              type="number"
              value={form.target}
              onChange={e => setForm(f => ({ ...f, target: e.target.value }))}
              placeholder="Target amount"
              
            />
            <input
              className="input-box flex-1"
              type="date"
              value={form.deadline}
              onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
              placeholder="Deadline"
            />
            <button
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-2)] text-white font-semibold shadow transition-all hover:scale-105 hover:shadow-lg min-w-[80px]"
              onClick={addGoal}
              type="button"
            >
              <span className="text-lg">+</span>
              <span>Add</span>
            </button>
          </div>
          <ul className="space-y-6">
            {goals.map(goal => {
              const percent = goal.target ? Math.round(((goal.current || 0) / goal.target) * 100) : 0;
              const isEditing = editId === goal._id;
              return (
                <li
                  key={goal._id}
                  className="bg-[var(--color-card-alt)] rounded-2xl p-5 shadow flex flex-col gap-2 md:flex-row md:items-center md:justify-between transition-all w-full"
                  style={{ overflow: "hidden", maxWidth: "100%" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 flex-wrap min-w-0">
                      {isEditing ? (
                        <>
                          <input
                            className="input-box flex-1 mb-2 md:mb-0 min-w-0"
                            value={editForm.name}
                            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Goal name"
                            style={{ maxWidth: 180 }}
                          />
                          <span className="text-[var(--color-primary)] text-sm mt-1 md:mt-0 flex items-center flex-wrap">
                            R
                            <input
                              className="input-box w-20 inline-block mx-1"
                              type="number"
                              value={editForm.current !== undefined ? editForm.current : goal.current || 0}
                              min={0}
                              onChange={e => setEditForm(f => ({ ...f, current: e.target.value }))}
                              placeholder="Current progress"
                              style={{ width: 70, display: "inline-block", maxWidth: 90 }}
                            />
                            /
                            <input
                              className="input-box w-20 inline-block mx-1"
                              type="number"
                              value={editForm.target}
                              onChange={e => setEditForm(f => ({ ...f, target: e.target.value }))}
                              placeholder="Target amount"
                              style={{ width: 70, display: "inline-block", maxWidth: 90 }}
                            />
                          </span>
                          <input
                            className="input-box flex-1 mb-2 md:mb-0"
                            type="date"
                            value={editForm.deadline}
                            onChange={e => setEditForm(f => ({ ...f, deadline: e.target.value }))}
                            placeholder="Deadline"
                            style={{ maxWidth: 140, color: "var(--color-primary)" }}
                          />
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-[var(--color-primary)] text-base truncate max-w-[180px]">
                            {goal.name}
                          </span>
                          <span className="text-[var(--color-primary)] text-sm mt-1 md:mt-0 flex-shrink-0">
                            R{goal.current || 0} / R{goal.target}
                          </span>
                          {goal.deadline && (
                            <span className="ml-0 md:ml-4 text-xs text-[var(--color-primary)] flex-shrink-0">
                              {goal.deadline.slice(0,10)}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="w-full bg-[var(--color-border)] rounded-full h-2.5 mt-3 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, isEditing ? (editForm.target ? Math.round(((editForm.current || 0) / editForm.target) * 100) : 0) : percent)}%`,
                          background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-2))"
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0 flex-shrink-0">
                    {isEditing ? (
                      <>
                        <button
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-accent-blue)] text-white hover:bg-[var(--color-primary)] transition-all"
                          onClick={() => saveEdit({ ...goal, current: editForm.current !== undefined ? Number(editForm.current) : goal.current })}
                          title="Save"
                        >
                          <LuCheck className="text-lg" />
                          <span className="hidden md:inline">Save</span>
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-accent-red)] text-white hover:bg-[var(--color-danger)] transition-all"
                          onClick={cancelEdit}
                          title="Cancel"
                        >
                          <LuX className="text-lg" />
                          <span className="hidden md:inline">Cancel</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-accent-2)] text-white hover:bg-[var(--color-primary)] transition-all"
                          onClick={() => startEdit(goal)}
                          title="Edit"
                        >
                          <FiEdit2 className="text-lg" />
                          <span className="hidden md:inline">Edit</span>
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-accent-red)] text-white hover:bg-[var(--color-danger)] transition-all"
                          onClick={() => deleteGoal(goal._id)}
                          title="Delete"
                        >
                          <FiTrash2 className="text-lg" />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GoalsPage;

