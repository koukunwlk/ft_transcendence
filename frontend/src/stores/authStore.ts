import { defineStore } from "pinia";

interface User {
  nickname: string;
  token: null;
  validCode: boolean;
  userId: number;
  email: string;
  username: string;
  tfaSecret: string;
}

export const useAuthStore = defineStore("auth", {
  // state (propriedades reativas)
  state: () => ({
    user: {},
    token: "",
  }),

  // actions (métodos)
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = "";
    },
    clearUser() {
      this.user = {};
    },
    clearStore() {
      this.clearToken();
      this.clearUser();
    },
  },

  // getters (propriedades computadas)
  getters: {
    getUser({ user }) {
      return user;
    },
    getToken({ token }) {
      return token;
    },
  },
});
