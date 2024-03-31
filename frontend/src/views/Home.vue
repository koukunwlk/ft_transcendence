<template>
  <div
    class="grid grid-rows-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-full justify-center items-center border-4 overflow-hidden">
    <div
      class="row-span-1 sm:col-span-3 lg:col-span-4 xl:col-span-6 justify-center items-center h-full w-full mt-36 sm:mt-36 xl:mt-60">
      <div class="grid grid-rows-2 sm:grid-cols-2 justify-center content-center">
        <div class="row-span-1 sm:col-span-1 grid justify-center items-center sm:mt-36 mb-2 sm:mb-0">
          <button type="button" @click="lobbyRedirect"
            class="h-32 w-32 sm:h-56 sm:w-56 lg:h-64 lg:w-64 xl:ml-48 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-500  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
            <div class="flex justify-center items-center">
              <svg class="h-16 w-16 sm:h-28 sm:w-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                  clip-rule="evenodd" />
              </svg>

            </div>
          </button>
        </div>
        <div class="row-span-1 sm:col-span-1 grid justify-center items-center sm:mt-36 ">
          <button type="button" @click="profileRedirect()"
            class="h-32 w-32 sm:h-56 sm:w-56 lg:h-64 lg:w-64 xl:mr-48 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-500  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
            <div class="grid justify-center">
              <svg class="h-16 w-16 sm:h-28 sm:w-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clip-rule="evenodd" />
              </svg>


            </div>
          </button>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <div
      class="row-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-2 overflow-x-hidden max-h-full h-full max-w-full mt-16 sm:mt-0">
      <FriendList @actual-friend="getFriendOnClick" :friends="this.friends" />
    </div>

  </div>
</template>

<script>
import authService from "../services/AuthService";
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import FriendList from '../components/FriendList.vue'
import { FriendService } from "../services/FriendService";


const authStore = useAuthStore();

export default {
  name: "Home",
  data() {
    return {
      username: ref(""),
      friends: [],
    };
  },
  mounted() {
    this.getTokenFromCookie();
    this.getLoggedUser();
  },
  components: {
    FriendList,
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
    getFriendOnClick(id) {
      this.$emit('actual-friend', this.friends[id - 1])
    },
    profileRedirect() {
      this.$router.push({ name: "Profile" });

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
    logout() {
      authService.logout().then((data) => {
        authStore.clearStore();
        document.cookie =
          "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.$router.push({ name: "Login" });
      });
    },
  },
};

</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #5a5a5a;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #060e24;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #060e24;
}
</style>
