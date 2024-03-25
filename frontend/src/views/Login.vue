<template>
  <div class="bg-login-background bg-cover h-full flex justify-center items-center">
    <div
      class="aspect-square h-72 w-72 flex flex-col justify-center items-center"
    >
      <div>
        <h1 class="text-3xl md:text-4xl xl:text-5xl text-white mb-3">
          42 project
        </h1>
      </div>
      <div>
        <button
          @click="login"
          class="py-2.5 px-5 me-2 mb-2 text-lg md:text-xl xl:text-2xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Login with 42intra
        </button>
        <button
          @click="goHome"
          class="py-2.5 px-5 me-2 mb-2 text-lg md:text-xl xl:text-2xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Home
        </button>
      </div>
      <!-- <h3
        v-if="user.getUser"
        class="text-3xl md:text-2xl xl:text-1xl text-white mb-3"
      >
        Welcome {{ user.getUser.nickname }}
      </h3> -->
    </div>
  </div>
</template>

<script>
import data from "../data/data.json";
import { useAuthStore } from "../stores/authStore";
import authService from "../services/AuthService";

const name = "Login";
const user = useAuthStore();

export default {
  name: "Login Page",
  setup() {},
  methods: {
    async login() {
      try {
        await authService.login();
      } catch (error) {
        console.log(error);
      }
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
