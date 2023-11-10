import { create } from "zustand";
import axiosInstance from "./utils/axiosInstance";

const store = (set, get) => ({
  budgets: [],
  expenses: [],
  user: {
    username: null,
    isAuthenticated: false,
  },
  clearState: () => {
    set(() => ({
      budgets: [],
      expenses: [],
      user: {
        username: null,
        isAuthenticated: false,
      },
    }));
  },
  clearTokens: () => {
    axiosInstance.clearLocalTokens();
  },
  getUser: async () => {
    if (get().user.username) {
      return get().user.isAuthenticated;
    }
    const res = await axiosInstance.get("/user/get-user");
    set((store) => ({
      user: {
        username: res.data.metadata.data.username,
        isAuthenticated: true,
      },
    }));
    return get().user.isAuthenticated;
  },
  signup: async (username, password) => {
    const res = await axiosInstance.post(
      "/user/signup",
      JSON.stringify({ username, password })
    );

    if (res.status === 201) {
      const data = res.data;
      set((store) => ({
        user: {
          username: data.metadata.data.username,
          isAuthenticated: true,
        },
      }));
    }
  },
  logout: async () => {
    const res = await axiosInstance.post("/user/logout");
    return res.status === 201;
  },
  login: async (username, password) => {
    const res = await axiosInstance.post(
      "/user/login",
      JSON.stringify({ username, password })
    );

    if (res.status === 201) {
      const data = res.data;
      set((store) => ({
        user: {
          username: data.metadata.data.username,
          isAuthenticated: true,
        },
      }));
    }
  },
  createBudget: async (name, amount) => {
    await axiosInstance.post(
      "/transaction/add-budget",
      JSON.stringify({ name, amount })
    );
  },
  getBudgets: async () => {
    const budgets = await axiosInstance.get("/transaction/get-budgets");
    set((store) => ({
      budgets: budgets.data.metadata,
    }));
    return get().budgets;
  },
  createExpense: async (budgetId, name, amount) => {
    await axiosInstance.post(
      "/transaction/add-expense",
      JSON.stringify({ budgetId, name, amount })
    );
  },
  getExpenses: async () => {
    const expenses = await axiosInstance.get("/transaction/get-expenses");
    set((store) => ({
      expenses: expenses.data.metadata,
    }));
    return get().expenses;
  },
  deleteExpense: async (expenseId) => {
    await axiosInstance.delete(`/transaction/delete-expense/${expenseId}`);
  },
  deleteBudget: async (budgetId) => {
    await axiosInstance.delete(`/transaction/delete-budget/${budgetId}`);
  },
});

export const useStore = create(store);
