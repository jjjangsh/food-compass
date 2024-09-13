import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AuthenticatedStore = create(
  persist(
    (set) => {
      return {
        user: {}, // null로 둬도 되지만 객체인걸 내가 알기 때문에 명시해둔 것
        setUser: (userInfo) => {
          set({ user: userInfo });
        }
      };
    },
    { name: 'isAuthEnticated-store' }
  )
);
