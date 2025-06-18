import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice';
import categoryReducer from './categorySlice';
import goalReducer from './goalSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    categories: categoryReducer,
    goals: goalReducer,
  },
});

export default store;
