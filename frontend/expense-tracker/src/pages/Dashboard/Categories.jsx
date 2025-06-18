import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { setCategories } from "../../store/categorySlice";
import useFetchCategories from "../../hooks/useFetchCategories";

const CategoriesPage = () => {
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [newCat, setNewCat] = useState("");

  useFetchCategories();

  const addCategory = async () => {
    if (!newCat.trim()) return;
    await axiosInstance.post(API_PATHS.CATEGORIES.ADD, { name: newCat });
    setNewCat("");
    toast.success("Category added");
    const res = await axiosInstance.get(API_PATHS.CATEGORIES.GET);
    dispatch(setCategories(res.data));
  };

  const deleteCategory = async (id) => {
    await axiosInstance.delete(API_PATHS.CATEGORIES.DELETE(id));
    toast.success("Category deleted");
    const res = await axiosInstance.get(API_PATHS.CATEGORIES.GET);
    dispatch(setCategories(res.data));
  };

  return (
    <DashboardLayout activeMenu="Categories">
      <div className="card">
        <h5 className="text-lg mb-4">Manage Categories</h5>
        <div className="flex gap-2 mb-4">
          <input
            className="input-box"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            placeholder="New category name"
          />
          <button className="add-btn add-btn-fill" onClick={addCategory}>Add</button>
        </div>
        <ul>
          {categories.map(cat => (
            <li key={cat._id} className="flex justify-between items-center mb-2">
              <span>{cat.name}</span>
              <button className="card-btn" onClick={() => deleteCategory(cat._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default CategoriesPage;
