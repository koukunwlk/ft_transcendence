<template>
  <div>
    <button id="my-button" class="my-button" @click="changeBackground">
      Change Background
    </button>
    <div
      class="Background"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    >
      <JoinRoom v-if="!gameOn" />
      <div class="Container">
        <canvas
          id="pong"
          ref="canvasRef"
          tabindex="0"
          v-on:keydown="movePlayer"
          width="1280"
          height="720"
        ></canvas>
        <div class="p1-score">Player 1 : {{ p1_points }}</div>
        <div class="p2-score">Player 2 : {{ p2_points }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { io, Socket } from "socket.io-client";
import JoinRoom from "./JoinRoom.vue";
import paddle from "./paddle";

export const socket = io("http://192.168.15.16:3000");

export default {
  components: { JoinRoom },
  name: "Pong",
  data() {
    return {
      leftPaddle: {},
      rightPaddle: {},
      gameOn: false,
      newPlayer: null,
      ball: null,
      canvasRef: null,
      keypress: false,
      p1_points: 0,
      p2_points: 0,
      backgroundImage: "background.jpeg",
    };
  },
  methods: {
    renderPaddle() {
      const paddleC = this.canvasRef;
      const ctx = paddleC?.getContext("2d");
      paddle(ctx, paddleC, this.leftPaddle);
      paddle(ctx, paddleC, this.rightPaddle);
    },
    initBall() {
      if (this.gameOn) {
        socket.off("ball_update").on("ball_update", (data) => {
          const ballC = this.canvasRef;
          const ctx = ballC?.getContext("2d");
          ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
          this.renderPaddle();
          ctx?.beginPath();
          ctx?.arc(data.x, data.y, data.rad, 0, Math.PI * 2, false);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#000000";
          ctx?.fill();
          ctx?.stroke();
          ctx?.closePath();
        });
      }
    },
    changeBackground() {
      this.backgroundImage = "earth.jpg";
      document.getElementById("my-button").style.display = "none";
      console.log("changed");
    },
    renderGame() {
      socket.off("player_moved").on("player_moved", (data) => {
        if (data.side === "left") {
          this.leftPaddle = data;
        } else if (data.side === "right") {
          this.rightPaddle = data;
        }
      });
      this.renderPaddle();
      this.initBall();
      requestAnimationFrame(() => this.renderGame());
    },
    movePlayer(event) {
      event.preventDefault();
      if (event.keyCode === 38) {
        socket.emit("arrow_keyUp");
        this.keypress = true;
      } else if (event.keyCode === 40) {
        socket.emit("arrow_keyDown");
        this.keypress = true;
      }
    },
    handleKeyup(event) {
      this.keypress = false;
    },
    startGame() {
      this.newPlayer = true;
      this.gameOn = true;
      console.log("game started");
    },
    handlePlayerUpdate(data) {
      this.leftPaddle = data;
    },
    handlePlayer2Update(data) {
      this.rightPaddle = data;
    },
    handlePlayerDisconnected(data) {
      this.gameOn = false;
      console.log("opponent player out");
      if (data == this.leftPaddle) {
        this.leftPaddle = null;
      } else {
        this.rightPaddle = null;
      }

      setTimeout(() => {
        socket.emit("handle_reconnect", data);
        socket.off("PlayerReconnected").on("PlayerReconnected", () => {
          console.log("Opponent reconnected during the pause.");
        });
        console.log("Opponent did not return. Leaving the room.");
        this.$router.push("/lobby");
      }, 4000);
    },
    handlePlayer1Scored(data) {
      this.p1_points = data;
      console.log("1 scored ", data);
    },
    handlePlayer2Scored(data) {
      this.p2_points = data;
      console.log("2 scored ", data);
    },
    handlePlayer1Won() {
      this.showResultMessage("Player 1 won!");
    },
    handlePlayer2Won() {
      this.showResultMessage("Player 2 won!");
    },
    showResultMessage(message) {
      var vm = this;
      var div = document.createElement("div");
      div.style.position = "fixed";
      div.style.top = "50%";
      div.style.left = "50%";
      div.style.transform = "translate(-50%, -50%)";
      div.style.fontSize = "24px";
      div.style.fontWeight = "bold";
      div.style.textAlign = "center";
      div.style.backgroundColor = "#c5f56b";
      div.style.color = "white";
      div.style.padding = "10px";
      div.style.borderRadius = "5px";
      div.appendChild(document.createTextNode(message));
      document.body.appendChild(div);
      setTimeout(function () {
        document.body.removeChild(div);
        vm.$router.push("lobby");
        this.gameOn = false;
      }, 4000);
    },
  },
  mounted() {
    try {
      this.canvasRef = this.$refs.canvasRef;
      socket.off("START_GAME").on("START_GAME", this.startGame);
      document.addEventListener("keydown", this.movePlayer);
      document.addEventListener("keyup", this.handleKeyup);
      socket
        .off("player1_update")
        .on("player1_update", this.handlePlayerUpdate);
      socket
        .off("player2_update")
        .on("player2_update", this.handlePlayer2Update);
      socket
        .off("PlayerDisconnected")
        .on("PlayerDisconnected", this.handlePlayerDisconnected);
      socket
        .off("player1_scored")
        .on("player1_scored", this.handlePlayer1Scored);
      socket
        .off("player2_scored")
        .on("player2_scored", this.handlePlayer2Scored);
      socket.off("player1_won").on("player1_won", this.handlePlayer1Won);
      socket.off("player2_won").on("player2_won", this.handlePlayer2Won);
      this.renderGame();
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.movePlayer);
    document.removeEventListener("keyup", this.handleKeyup);
  },
};
</script>

<style scoped>
.my-button {
  background-color: grey;
  border: 2px;
  color: white;
  padding: 7.5px 16px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  position: fixed;
  left: 50%;
  bottom: 7px;
  transform: translate(-50%, 50%);
}

.my-button2 {
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

.p1-score {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #c5f56b;
  color: black;
  padding: 10px;
  border-radius: 5px;
}

.p2-score {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #c5f56b;
  color: black;
  padding: 10px;
  border-radius: 5px;
}
.Container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.Container > canvas {
  width: 100%;
  height: 100%;
}

/* Scale canvas size for smaller screens */
@media (max-width: 767px) {
  .Container {
    height: calc(100vh - 20px);
  }
}

@media (max-width: 575px) {
  .Container {
    height: calc(100vh - 40px);
  }
}
.Game-container {
  outline: 1px solid #ffd300;
  align-content: center;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto auto 0 auto;
  padding: 0.4rem;
  position: absolute;
}

.Background {
  /* background-image: url("earth.jpg"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  opacity: 98%;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.Background:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
