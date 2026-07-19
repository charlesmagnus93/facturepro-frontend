import { create } from "zustand";

type AuthState = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,

    setToken: (token) => {
        localStorage.setItem("access_token", token);
        document.cookie = "logged_in=1; path=/; max-age=86400; SameSite=Lax";
        set({ token });
    },

    logout: () => {
        localStorage.removeItem("access_token");
        document.cookie = "logged_in=; path=/; max-age=0";
        set({ token: null });
    },
}));