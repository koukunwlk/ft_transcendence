<template>
  <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black">
    <div class="relative flex flex-col justify-center items-center w-64 h-96 md:w-80 md:h-2/5 md:min-h-[32rem] lg:w-1/4 lg:min-w-96 lg:h-2/4 bg-gray-900 rounded-xl">
      <button class="absolute z-10 top-2 left-2 flex w-6 h-6" @click="homeRedirect">
        <img class="h-6 w-6 lg:h-7 lg:w-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" src="../assets/svgs/home.svg" alt="home icon">
      </button>
      <div class="flex flex-row justify-start">
          <label class="inline-flex items-center cursor-pointer">
            <input @change="increaseSpeed" type="checkbox" id="speed-button"
                class="sr-only peer"
            >
            <div
                class="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
            </div>
          </label>
          <span class="ms-3 text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-900 dark:text-gray-300">
            Increase game speed
          </span>
      </div>
      <div class="flex justify-center w-full mt-5 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-9">
        <button
          @click="startGame"
          type="button"
          class="w-32 md:w-48 lg:w-56 xl:w-64 2xl:w-72 uppercase font-semibold text-base md:text-lg lg:text-xl 2xl:text-2xl bg-gray-700 hover:bg-green-500 text-sm text-gray-100 p-2.5 border border-gray-700 hover:border-green-400 rounded-2xl block placeholder-gray-400 focus:ring-blue-500">
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from "./Pong.vue";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import userService from "../services/UserService";

const authStore = useAuthStore();
// let userData = await authStore.getUser;
let otherPlayer = null;
// if (userData && userData.username) {
//   if (
//     userData.username.trim() == "acosta-a" ||
//     userData.username.trim() == "mamaro-d"
//   ) {
//     otherPlayer = "mamaro-d+acosta-a";
//     console.log("acosta ou mamaro");
//   }
//   if (
//     userData.username.trim() == "gusalves" ||
//     userData.username.trim() == "dpiza"
//   ) {
//     console.log("null");
//   }
// }

export default {
  name: "Lobby",
  data() {
    return {
      user: {},
    }
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
          this.user = authStore.getUser;
          if (
            this.user.tfaEnabled &&
            !this.user.tfaAuthenticated
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
    startGame() {
      socket.emit("join_game", this.user, otherPlayer, this.user.id);
      this.$router.push("/pong");
    },

    increaseSpeed() {
      document.getElementById("speed-button").style.display = "none";
      socket.emit("increase_speed");
    },
    homeRedirect() {
			this.$router.push({ name: "Home" });
		},
  },
};
</script>