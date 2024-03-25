<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen">
    <div class="text-4xl">Hello 👋🏼 {{ user }}</div>
    <button @click="lobbyRedirect">Lobby</button>
  </div>
</template>

<script>
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";

const authStore = useAuthStore();

export default {
  name: "Home",
  data() {
    return {
      user: ref(""),
    };
  },
  mounted() {
    this.getTokenFromCookie();
    this.getLoggedUser();
  },
  methods: {
    getLoggedUser() {
      userService
        .me()
        .then(({ data }) => {
          this.user = data.username;
          authStore.setUser(data);
        })
        .catch((error) => {
          this.$router.push({ name: "Login" });
        });
    },
    lobbyRedirect() {
      this.$router.push({ name: "Lobby" });
    },
    getTokenFromCookie() {
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
        if (cookie.trimStart().startsWith("token=")) {
          this.saveToken(cookie.trimStart());
        }
      });
    },
    saveToken(tokenCookie) {
      const token = tokenCookie.substring(6);
      authStore.setToken(token);
    },
  },
};
</script>
