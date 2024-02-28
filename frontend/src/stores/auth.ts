import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { data: {
            "nickname": "wportilh",
            "token": null,
            "validCode": false,
            "userId": 1234567890,
            "email": "example@example.com",
            "username": "Willian Portilho de Almeida",
            "tfaSecret": "abc"
        }}
    }
})