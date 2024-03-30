<template>
  <div class="Container">
    <div class="Background" />
    <form class="form">
      <div class="JoinRoomButton" @click="startGame">START</div>
    </form>
    <button id="speed-button" class="speed-button" @click="increaseSpeed">
      Increase Speed
    </button>
  </div>
</template>

<script>
import { socket } from "./Pong.vue";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";

const authStore = useAuthStore();
let userData = await authStore.getUser;
let otherPlayer = null;
console.log(userData);
if (userData && userData.username) {
  if (
    userData.username.trim() == "acosta-a" ||
    userData.username.trim() == "mamaro-d"
  ) {
    otherPlayer = "mamaro-d+acosta-a";
    console.log("acosta ou mamaro");
  }
  if (
    userData.username.trim() == "gusalves" ||
    userData.username.trim() == "dpiza"
  ) {
    console.log("null");
  }
}

export default {
  name: "Lobby",
  methods: {
    startGame() {
      socket.emit("join_game", userData, otherPlayer, userData.id);
      this.$router.push("/pong");
      console.log("join game");
    },

    increaseSpeed() {
      document.getElementById("speed-button").style.display = "none";
      socket.emit("increase_speed");
    },
  },
};
</script>

<style scoped>
.speed-button {
  background-color: grey;
  border: 2px;
  color: white;
  padding: 7.5px 30px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  position: fixed;
  left: 75%;
  bottom: 7px;
  transform: translate(-50%, 50%);
}

.Container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #0e1111;
}

.JoinRoomButton {
  outline: none;
  background-color: #c5f56b;
  color: #656161;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 10px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  margin-bottom: 12px;
  cursor: pointer;
  font-family: "arial";
  font-size: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5em;
  z-index: 1;

  &:hover {
    background-color: #ed006c;
    color: #ffd300;
    border: 2px solid #02cefc;
  }
}
</style>
