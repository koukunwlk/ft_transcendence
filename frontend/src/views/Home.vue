<template>
  <div v-if="!loading">
    <div class="w-screen h-screen overflow-hidden margin-0">
      <div class="flex image-animation w-[200%]">
        <img class="flex h-screen w-1/2 object-cover justify-center items-center" src="../assets/images/kai-pilger.jpg"
          alt="background">
        <img class="flex h-screen w-1/2 object-cover justify-center items-center" src="../assets/images/kai-pilger.jpg"
          alt="background">
      </div>
    </div>
    <div v-if="showSettingsModal">
      <Settings @clickedButton="closeModal" />
    </div>
    <div
      class="absolute inset-0 margin-0 grid grid-rows-2 sm:grid-cols-4 lg:grid-cols-8 h-full w-full justify-center items-center overflow-hidden">
      <div class="row-span-1 sm:col-span-3 lg:col-span-6 justify-center items-center mt-28 lg:mt-12 xl:mt-0">
        <div class="grid sm:grid-rows-3 justify-center content-center">
          <!-- Play and Profile Buttons -->
          <div class="sm:row-span-2 grid sm:content-end">
            <div class="grid grid-cols-2 gap-6">
              <button type="button" title="Play" @click="lobbyRedirect"
                class="h-24 w-24 sm:h-56 sm:w-56 lg:h-60 lg:w-60 xl:h-80 xl:w-80 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-500  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
                <div class="flex justify-center items-center">
                  <svg class="h-16 w-16 sm:h-28 sm:w-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m9 5 7 7-7 7" />
                  </svg>

                </div>
              </button>
              <button type="button" title="Profile" @click="profileRedirect()"
                class="h-24 w-24 sm:h-56 sm:w-56 lg:h-60 lg:w-60 xl:h-80 xl:w-80 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-500  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
                <div class="grid justify-center">
                  <svg class="h-16 w-16 sm:h-28 sm:w-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <!-- Logout buttom -->
          <div class="sm:row-span-1 mt-3 xl:mt-0 xl:ml-44">
            <div class=" grid justify-center content-start ">
              <button type="button" title="Logout" @click="logout()"
                class="h-24 w-24 sm:h-56 sm:w-56 lg:h-60 lg:w-60 xl:mt-8 xl:h-80 xl:w-80 xl:mr-48 bg-gray-600 bg-opacity-30 hover:bg-zinc-500 text-zinc-500  font-semibold hover:text-white text-sm focus:outline-none rounded-lg border border-zinc-600 hover:border-transparent focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
                <div class="grid justify-center">
                  <svg class="h-16 w-16 sm:h-28 sm:w-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                  </svg>

                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row-span-2 sm:col-span-1 lg:col-span-2 overflow-x-hidden max-h-full max-w-full mt-36 sm:mt-0">
        <FriendList @actual-friend="getFriendOnClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Settings from '../components/Settings.vue'
import authService from "../services/AuthService";
import userService from "../services/UserService";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import FriendList from '../components/FriendList.vue'
import { FriendService } from "../services/FriendService";


const authStore = useAuthStore();

export default {
  name: "Home",
  components: {
    FriendList,
    Settings,
  },
  data() {
    return {
      loading: true,
      showSettingsModal: false,
      savedNickname: false,
      username: ref(""),
      friends: [],
      user: {}
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
      this.loading = true;
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
          this.checkNickname();
          this.loading = false;
        })
        .catch((error) => {
          this.$router.push({ name: "Login" });
        });
    },
    checkNickname() {
      if (!this.user.nickname || this.user?.nickname.length === 0) {
        this.showSettingsModal = true;
      }
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
    closeModal() {
      this.showSettingsModal = !this.showSettingsModal;
      this.getLoggedUser();
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
