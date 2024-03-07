<template>
  <div class="justify-center flex bg-yellow-300 items-center h-screen">
    <div class="text-4xl">Hello 👋🏼 {{ user }}</div>
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
        })
        .catch((error) => {
          this.$router.push({ name: "Login" });
        });
    },
    getTokenFromCookie() {
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
        if (cookie.startsWith("token=")) {
          this.saveToken(cookie);
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
