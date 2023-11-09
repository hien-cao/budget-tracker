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
  signup: async (username, password) => {
    try {
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
      return get().user.isAuthenticated;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  logout: async () => {
    const res = await axiosInstance.post("/user/logout");
    return res.status === 201;
  },
  login: async (username, password) => {
    try {
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
      return get().user.isAuthenticated;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
});

export const useStore = create(store);
