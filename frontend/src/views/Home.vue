<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen">
    <div class="text-4xl">Hello 👋🏼 {{ username }}</div>
    <button @click="lobbyRedirect">Lobby</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import authService from "../services/AuthService";
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";

const authStore = useAuthStore();

export default {
  name: "Home",
  data() {
    return {
      username: ref(""),
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
          this.username = data.username;
          authStore.setUser(data);
          if (
            authStore.getUser.tfaEnabled &&
            !authStore.getUser.tfaAuthenticated
          ) {
            this.$router.push({ name: "TFA" });
          }
        })
        .catch((error) => {
          this.$router.push({ name: "Login" });
        });
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
    logout() {
      authService.logout().then((data) => {
        authStore.clearStore();
        document.cookie =
          "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.$router.push({ name: "Login" });
      });
    },
    lobbyRedirect() {
      this.$router.push({ name: "Lobby" });
    },
  },
};
</script>
