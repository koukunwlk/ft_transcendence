<template>
  <div
    v-if="Object.hasOwn(user, 'username')"
    class="justify-center flex bg-yellow-300 items-center h-screen"
  >
    <div class="text-4xl">
      <p>{{ user.username }}</p>
    </div>
    <div class="text-4xl">Type your token</div>
    <div class="text-4xl"><input type="text" v-model="code" /></div>
    <button @click="validateCode">Submit</button>
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
