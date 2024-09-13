import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  stateLoading: string;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      stateLoading: 'none',
      setup: (value: string) => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (!userLocalStorage) {
          localStorage.setItem("accessToken", value);
        }
      },
      login: () => {
        const userLocalStorage = localStorage.getItem("accessToken");
        set({ stateLoading: 'process' });
        if (userLocalStorage) {
          set({ isLoggedIn: true, accessToken: userLocalStorage });
        }
        set({ stateLoading: 'finished' });
      },
      logout: () => {
        set({ isLoggedIn: false, accessToken: null, stateLoading: 'none' });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
