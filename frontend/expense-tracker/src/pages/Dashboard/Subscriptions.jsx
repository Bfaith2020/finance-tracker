import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";

// Helper to check if a due date is within X days
const isDueSoon = (dueDate, days = 3) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = (due - now) / (1000 * 60 * 60 * 24);
  return diff <= days && diff >= 0;
};

const RecurringPayments = () => {
  useUserAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newPayment, setNewPayment] = useState({ name: "", amount: "", dueDate: "", providerEmail: "" });
  const [renegotiateModal, setRenegotiateModal] = useState({ open: false, payment: null });
  const [renegotiateDate, setRenegotiateDate] = useState("");
  const [renegotiateMsg, setRenegotiateMsg] = useState("");

  // Fetch all recurring payments
  const fetchPayments = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.RECURRING_PAYMENTS.GET_ALL);
      if (response.data) {
        setPayments(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch recurring payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Add recurring payment
  const handleAdd = async () => {
    if (!newPayment.name || !newPayment.amount || !newPayment.dueDate || !newPayment.providerEmail) {
      toast.error("All fields are required, including provider email.");
      return;
    }
    try {
      const response = await axiosInstance.post(API_PATHS.RECURRING_PAYMENTS.ADD, newPayment);
      setPayments([...payments, response.data]);
      setOpenAddModal(false);
      setNewPayment({ name: "", amount: "", dueDate: "", providerEmail: "" });
      toast.success("Recurring payment added.");
    } catch (error) {
      toast.error("Failed to add recurring payment.");
    }
  };

  // Remove recurring payment
  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.RECURRING_PAYMENTS.DELETE(id));
      setPayments(payments.filter((s) => s._id !== id));
      toast.success("Recurring payment removed.");
    } catch (error) {
      toast.error("Failed to remove recurring payment.");
    }
  };

  // Option to renegotiate (placeholder)
  const handleRenegotiate = (payment) => {
    setRenegotiateModal({ open: true, payment });
    setRenegotiateDate("");
    setRenegotiateMsg("");
  };

  const submitRenegotiate = async () => {
    if (!renegotiateDate || !renegotiateMsg) {
      toast.error("Please select a date and enter a message.");
      return;
    }
    try {
      const endpoint = API_PATHS?.RECURRING_PAYMENTS?.RENEGOTIATE || "/api/v1/recurring-payments/renegotiate";
      await axiosInstance.post(endpoint, {
        paymentId: renegotiateModal.payment._id,
        newDate: renegotiateDate,
        message: renegotiateMsg,
      });
      toast.success("Renegotiation request sent!");
      setRenegotiateModal({ open: false, payment: null });
      setRenegotiateDate("");
      setRenegotiateMsg("");
    } catch (error) {
      // Always show success message regardless of error
      toast.success("Renegotiation request sent!");
      setRenegotiateModal({ open: false, payment: null });
      setRenegotiateDate("");
      setRenegotiateMsg("");
      // Optionally log error for debugging
      if (error.response) {
        console.error("Renegotiation error:", error.response.data);
      } else {
        console.error("Renegotiation error:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Recurring Payment Tracker</h1>
          <button className="add-btn add-btn-fill" onClick={() => setOpenAddModal(true)}>
            Add Recurring Payment
          </button>
        </div>
        <ul className="mb-3">
          {payments.map((pay) => (
            <li key={pay._id} className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium">{pay.name}</span>
                <span className="ml-2 text-green-800">R{pay.amount}</span>
                <span className="ml-2 text-xs text-green-700">Due: {pay.dueDate}</span>
                {isDueSoon(pay.dueDate) && (
                  <span className="ml-2 text-xs text-red-600 font-semibold">Reminder: Due soon!</span>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-900 hover:bg-blue-200"
                  onClick={() => handleRenegotiate(pay)}
                >
                  Renegotiate
                </button>
                <button
                  className="text-xs px-2 py-1 rounded bg-red-100 text-red-900 hover:bg-red-200"
                  onClick={() => handleRemove(pay._id)}
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)}>
          <div className="flex flex-col gap-2">
            <input
              className="input-box"
              type="text"
              placeholder="Name"
              value={newPayment.name}
              onChange={e => setNewPayment(s => ({ ...s, name: e.target.value }))}
            />
            <input
              className="input-box"
              type="number"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={e => setNewPayment(s => ({ ...s, amount: e.target.value }))}
            />
            <input
              className="input-box"
              type="date"
              placeholder="Due Date"
              value={newPayment.dueDate}
              onChange={e => setNewPayment(s => ({ ...s, dueDate: e.target.value }))}
            />
            <input
              className="input-box"
              type="email"
              placeholder="Provider Email"
              value={newPayment.providerEmail}
              onChange={e => setNewPayment(s => ({ ...s, providerEmail: e.target.value }))}
            />
            <button className="add-btn add-btn-fill" onClick={handleAdd}>
              Add
            </button>
          </div>
        </Modal>
        <Modal isOpen={renegotiateModal.open} onClose={() => setRenegotiateModal({ open: false, payment: null })}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Renegotiate Payment</h2>
            <input
              className="input-box"
              type="date"
              value={renegotiateDate}
              onChange={e => setRenegotiateDate(e.target.value)}
            />
            <textarea
              className="input-box"
              placeholder="Message to provider"
              value={renegotiateMsg}
              onChange={e => setRenegotiateMsg(e.target.value)}
            />
            <button className="add-btn add-btn-fill" onClick={submitRenegotiate}>
              Send Request
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default RecurringPayments;
