import { createSlice } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goals',
  initialState: [],
  reducers: {
    setGoals(state, action) {
      return action.payload;
    },
    addGoal(state, action) {
      state.push(action.payload);
    },
    removeGoal(state, action) {
      return state.filter(goal => goal._id !== action.payload);
    },
    updateGoal(state, action) {
      const idx = state.findIndex(g => g._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
  },
});

export const { setGoals, addGoal, removeGoal, updateGoal } = goalSlice.actions;
export default goalSlice.reducer;
