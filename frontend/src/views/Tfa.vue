<template>
  <div v-if="Object.hasOwn(user, 'username')" class="justify-center flex items-center h-screen">
    <div
      class="h-[420px] w-72 md:h-[432px] lg:h-[452px] xl:h-[452px] md:w-96 xl:w-[412px] text-gray-300 rounded-lg border border-gray-500 flex flex-col justify-center items-center">
      <img class="h-12 md:h-16 xl:h-20 mt-4 xl:mt-0 mb-5" src="../assets/logo/logo.png" alt="logo image">
      <div class="text-2xl tracking-[-.08rem] lg:text-3xl mb-5">
        <p>Two-factor authentication</p>
      </div>
      <div
        class="flex flex-col items-center justify-center h-44 lg:h-48 w-64 md:w-80 xl:w-[352px] rounded-sm border border-gray-700">
        <div class="flex flex-col">
          <div class="flex text-sm lg:text-base md:font-semibold lg:font-normal xl:font-semibold mb-2">
            Authentication code:
          </div>
          <div class="flex justify-center text-4xl">
            <input v-if="errorMessage" @input="handleImput" type="text" v-model="code"
              class="text-center w-56 md:w-72 xl:w-80 tracking-[.35em] md:tracking-[.45em] lg:tracking-[.55em] xl:tracking-[.45em] font-semibold bg-gray-100 p-2.5 border border-red-300 text-gray-900 text-sm lg:text-base xl:text-lg rounded-sm focus:border-red-500 block dark:bg-gray-700 dark:border-red-600 dark:text-white dark:focus:ring-red-500"
              placeholder="Ex: 123456">
            <input v-else @input="handleImput" type="text" v-model="code"
              class="text-center w-56 md:w-72 xl:w-80 tracking-[.35em] md:tracking-[.45em] lg:tracking-[.55em] xl:tracking-[.45em] font-semibold bg-gray-100 p-2.5 border border-gray-300 text-gray-900 text-sm lg:text-base xl:text-lg rounded-sm focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
              placeholder="Ex: 123456">
          </div>
        </div>
        <div v-if="errorMessage" class="text-red-500 -mb-5">
          {{ errorMessage }}
        </div>
        <button @click="validateCode"
          class="mt-5 w-56 md:w-72 xl:w-80 hover:bg-green-500 bg-green-600 text-sm font-semibold text-gray-100 hover:text-white p-2.5 border border-green-700 hover:border-green-500 rounded-sm block placeholder-gray-400 focus:ring-blue-500">
          Verify
        </button>
      </div>
      <div class="flex items-start mt-4 md:mt-5">
        <img class="h-5 w-5 ml-3 md:ml-7 mr-2" src="../assets/svgs/phone.svg" alt="phone icon">
        <span class="text-xs md:text-sm mr-3 md:mr-7">
          Hi, {{ user.username }}! Open the two-factor authentication app on your device to view your authentication
          code and verify your identity.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import authService from "../services/AuthService";
import userService from "../services/UserService";

const authStore = useAuthStore();

export default {
  name: "TFA",
  data() {
    return {
      user: ref({}),
      code: ref(),
      errorMessage: "",
    };
  },
  mounted() {
    this.getLoggedUser();
  },
  methods: {
    getLoggedUser() {
      userService
        .me()
        .then(({ data }) => {
          authStore.setUser(data);
          this.user = authStore.getUser;
          if (
            this.user.tfaEnabled &&
            !this.user.tfaAuthenticated
          ) {
            this.$router.push({ name: "TFA" });
          }
        })
        .catch((error) => {
          this.$router.push({ name: "Login" }); 1
        });
    },
    validateCode() {
      authService
        .verifyTfa(this.code)
        .then((data) => {
          this.homeRedirect();
        })
        .catch((error) => {
          if (error.response.data == "Token is Invalid") {
            this.errorMessage = "Invalid code. Please try again.";
            console.log("Token Inválido");
          } else {
            console.log(error);
          }
        });
    },
    homeRedirect() {
      this.$router.push({ name: "Home" });
    },
    handleImput(event) {
      const inputCopy = event.target.value;
      const numericValue = inputCopy.replace(/\D/g, '');
      const limitedValue = numericValue.slice(0, 6);
      event.target.value = limitedValue;
    }
  },
};
</script>
