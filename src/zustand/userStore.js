import { create } from 'zustand';

const userStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,

  setUser: (newUser) => {
    console.log(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
    alert("로그아웃 완료!");
  }
}));

export default userStore;
