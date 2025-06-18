import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories(state, action) {
      return action.payload;
    },
    addCategory(state, action) {
      state.push(action.payload);
    },
    removeCategory(state, action) {
      return state.filter(cat => cat._id !== action.payload);
    },
  },
});

export const { setCategories, addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
