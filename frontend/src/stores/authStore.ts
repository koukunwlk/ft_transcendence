import { defineStore } from 'pinia'

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

export const useAuthStore = defineStore('auth', {
    // state (propriedades reativas)
    state: (): AuthState => ({
        user: null
    }),

    // actions (métodos)
    actions: {
        setUser(user: AuthState['user']) {
            this.user = user;
        }
    },

    // getters (propriedades computadas)
    getters: {
        getUser(): User | null {
            return this.user;
        }
    }
})