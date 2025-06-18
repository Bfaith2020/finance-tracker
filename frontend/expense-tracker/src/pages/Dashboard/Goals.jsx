import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: "", target: "", deadline: "" });

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

  useEffect(() => { fetchGoals(); }, []);

  return (
    <DashboardLayout activeMenu="Goals">
      <div className="card">
        <h5 className="text-lg mb-4">Financial Goals</h5>
        <div className="flex gap-2 mb-4">
          <input
            className="input-box"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Goal name"
          />
          <input
            className="input-box"
            type="number"
            value={form.target}
            onChange={e => setForm(f => ({ ...f, target: e.target.value }))}
            placeholder="Target amount"
          />
          <input
            className="input-box"
            type="date"
            value={form.deadline}
            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
            placeholder="Deadline"
          />
          <button className="add-btn add-btn-fill" onClick={addGoal}>Add</button>
        </div>
        <ul>
          {goals.map(goal => (
            <li key={goal._id} className="flex flex-col mb-4">
              <div className="flex justify-between items-center">
                <span>
                  {goal.name} - R{goal.current || 0} / R{goal.target}
                  {goal.deadline && ` (by ${goal.deadline.slice(0,10)})`}
                </span>
                <button className="card-btn" onClick={() => deleteGoal(goal._id)}>Delete</button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(100, ((goal.current || 0) / goal.target) * 100)}%`
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default GoalsPage;
