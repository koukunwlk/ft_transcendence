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
    this.saveToken(document.cookie.substring(6));
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
    saveToken(token) {
      authStore.setToken(token);
    },
  },
};
</script>
