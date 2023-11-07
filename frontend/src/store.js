import { create } from "zustand";

const store = (set) => ({
  budgets: [],
  expenses: [],
  user: { username: "test user" },
  doLogin: (username, password) => {
    console.log("username", username);
    console.log("password", password);
  },
});

export const useStore = create(store);
