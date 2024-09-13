import { create } from "zustand";

const userStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  setUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser))
    set({ user: newUser })
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default userStore;