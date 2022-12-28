import { defineStore } from "pinia";

export const useAppAuthStore = () => {
  const token = localStorage.token;
  const user = localStorage.user;
  return defineStore({
    id: "appAuth",
    state: () => {
      return {
        user,
        token,
      };
    },
  })();
};
