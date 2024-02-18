import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value }),
});

export const useBearStore = create(persist(devtools(store), { name: 'store' }));
