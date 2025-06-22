export const BASE_URL =
  import.meta.env.PROD
    ? ""
    : "http://localhost:8000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_PROFILE_IMAGE: "/api/v1/auth/update-profile-image",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME:{
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) =>  `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE:{
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) =>  `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  CATEGORIES: {
    GET: "/api/v1/categories",
    ADD: "/api/v1/categories",
    DELETE: (id) => `/api/v1/categories/${id}`,
  },
  GOALS: {
    GET: "/api/v1/goals",
    ADD: "/api/v1/goals",
    UPDATE: (id) => `/api/v1/goals/${id}`,
    DELETE: (id) => `/api/v1/goals/${id}`,
  },
  RECURRING_PAYMENTS: {
    GET_ALL: "/api/v1/recurring-payments",
    ADD: "/api/v1/recurring-payments",
    DELETE: (id) => `/api/v1/recurring-payments/${id}`,
    RENEGOTIATE: "/api/v1/recurring-payments/renegotiate",
  },
};
