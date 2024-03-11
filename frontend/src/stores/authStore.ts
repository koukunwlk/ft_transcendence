import { defineStore } from "pinia";

const STORE_KEY = "user";

interface User {
  nickname: string;
  token: null;
  validCode: boolean;
  userId: number;
  email: string;
  username: string;
  tfaSecret: string;
}

interface AuthState {
  user: User | null;
}

const getUserLocalStorage = () => {
  const user = localStorage.getItem(STORE_KEY);
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = defineStore("auth", {
  // state (propriedades reativas)
  state: () => ({
    user: getUserLocalStorage() || {
      nickname: "",
      token: null,
      validCode: false,
      userId: -1,
      email: "",
      username: "",
      tfaSecret: "",
    },
    token: "",
  }),

  // actions (métodos)
  actions: {
    setUser(user: AuthState["user"]) {
      this.user = user;
      localStorage.setItem(STORE_KEY, JSON.stringify(this.user));
    },
    setToken(token: string) {
        this.token = token;
    },
    clearToken() {
        this.token = '';
    }
  },

  // getters (propriedades computadas)
  getters: {
    getUser(): User | null {
      return this.user;
    },
    getToken({ token }) {
      return token;
    },
  },
});
