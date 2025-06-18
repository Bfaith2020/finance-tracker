import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    setTransactions(state, action) {
      return action.payload;
    },
    addTransaction(state, action) {
      state.push(action.payload);
    },
    removeTransaction(state, action) {
      return state.filter(txn => txn._id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
