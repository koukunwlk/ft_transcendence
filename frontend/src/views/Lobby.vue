<template>
  <div class="Container">
    <div class="Background" />
    <form class="form">
      <div class="JoinRoomButton" @click="startGame">START</div>
    </form>
    <button id="my-button2" class="my-button2" @click="increaseSpeed">
      Increase Speed
    </button>
  </div>
</template>

<script>
import { socket } from "./Pong.vue";

export default {
  name: "Lobby",
  methods: {
    startGame() {
      this.$router.push("/pong");
      socket.emit("join_game");
      console.log("join game");
    },
    increaseSpeed() {
      document.getElementById("my-button2").style.display = "none";
      socket.emit("increase_speed");
    },
  },
};
</script>

<style scoped>
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

  &:hover {
    background-color: #ed006c;
    color: #ffd300;
    border: 2px solid #02cefc;
  }
}
</style>
