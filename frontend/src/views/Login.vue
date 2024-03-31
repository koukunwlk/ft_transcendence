<script>
import data from "../data/data.json";
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import authService from "../services/AuthService";

const name = "Login";
const authStore = useAuthStore();

export default {
  name: "Login Page",
  setup() {},
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
          if (authStore.getUser) {
            this.homeRedirect();
          }
        })
        .catch((error) => {});
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
    async login() {
      try {
        await authService.login();
      } catch (error) {
        console.log(error);
      }
    },
    homeRedirect() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<template>
	<div class="w-screen h-screen overflow-hidden margin-0">
		<div class="flex image-animation w-[200%]">
			<img class="flex h-screen w-1/2 object-cover justify-center items-center" src="../assets/images/kai-pilger.jpg" alt="background">
			<img class="flex h-screen w-1/2 object-cover justify-center items-center" src="../assets/images/kai-pilger.jpg" alt="background">
		</div>
		<div class="absolute inset-0 flex flex-col justify-center items-center h-4/6">
      <div>
        <img
          class="w-48 md:w-56 lg:w-72 xl:w-80 2xl:w-96 mb-5"
          src="../assets/logo/logo.png"
          alt="logo image"
        >
      </div>
      <div>
        <button
          @click="login"
          type="button"
          class="border font-mono border-gray-600 font-medium text-sm md:text-base xl:text-lg px-5 md:px-7 xl:px-8 py-2.5 md:py-3.5 xl:py-4 mb-2 text-white bg-[#24292F]/80 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
            <span class="italic font-serif mr-2">
              42
            </span>
          Sign in with Intra
        </button>
      </div>
    </div>
	</div>
</template>

<style>

.image-animation {
	animation: moveImages 150s infinite linear;
}

@keyframes moveImages {
	0% {
		transform: translate(0);
	}
	100% {
		transform: translate(-50%);
	}
}

</style>