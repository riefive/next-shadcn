import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      setup: (value: string) => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (!userLocalStorage) {
          localStorage.setItem('accessToken', value);
        }
      },
      login: () => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
