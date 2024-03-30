<template>
  <div
    v-if="Object.hasOwn(user, 'username')"
    class="justify-center flex items-center h-screen"
  >
    <div class="h-96 w-72 md:w-80 text-gray-300 rounded-lg border border-gray-500 flex flex-col justify-center items-center">
      <div class="text-2xl tracking-[-.08rem] md:text-2xl mb-5">
        <p>Two-factor authentication</p>
      </div>
      <div class="flex flex-col items-center justify-center h-40 w-64 rounded-sm border border-gray-700">
        <div class="flex flex-col">
          <div class="flex text-sm font-semibold mb-2">
            Authentication code:
          </div>
          <div class="flex justify-center text-4xl">
            <input
              type="text"
              class="text-start w-56 md:w-64 lg:w-80 tracking-[.25em] md:tracking-[.35em] lg:tracking-[.45em] xl:tracking-[.35em] font-semibold bg-gray-100 p-2.5 border border-gray-300 text-gray-900 text-sm lg:text-base xl:text-lg rounded-sm focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
              placeholder="Ex: ABCDEFGHIJ..."
            >
          </div>
        </div>
        <button
          @click="validateCode"
          class="mt-4 w-56 md:w-64 lg:w-80 hover:bg-green-500 bg-green-600 text-sm font-semibold text-gray-100 hover:text-white p-2.5 border border-green-700 hover:border-green-500 rounded-sm block placeholder-gray-400 focus:ring-blue-500">
          Verify
        </button>
      </div>
      <div class="flex items-start mt-6">
        <img
          class="h-5 w-5 ml-3 mr-2"
          src="../assets/svgs/phone.svg"
          alt="phone icon"
        >
        <span class="text-xs mr-3">
          Hi, {{ user.username }}! Open the two-factor authentication app on your device to view your authentication code and verify your identity.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import authService from "../services/AuthService";

const authStore = useAuthStore();

export default {
  name: "TFA",
  data() {
    return {
      user: ref({}),
      code: ref(),
    };
  },
  mounted() {
    this.user = this.getStoredUser();
  },
  methods: {
    getStoredUser() {
      return authStore.getUser;
    },
    validateCode() {
      authService
        .verifyTfa(this.code)
        .then((data) => {
          this.homeRedirect();
        })
        .catch((error) => {
          if (error.response.data == "Token is Invalid") {
            console.log("Token Inválido");
          } else {
            console.log(error);
          }
        });
    },
    homeRedirect() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
