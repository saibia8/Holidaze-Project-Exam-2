import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  isUserLoggedIn: false,
  isUserVenueManager: false,
  token: null,
  userInfo: null,
  setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value }),
  setIsUserVenueManager: (value) => set({ isUserVenueManager: value }),
  setToken: (value) => set({ token: value }),
  setUserInfo: (value) => set({ userInfo: value }),
});

export const useBearStore = create(persist(devtools(store), { name: 'store' }));
