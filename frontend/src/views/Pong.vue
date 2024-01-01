<template>
  <div class="Background">
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
      <div class="p1-score">Player 1 : {{ this.p1_points }}</div>
      <div class="p2-score">Player 2 : {{ this.p2_points }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, render } from "vue";
import { io, Socket } from "socket.io-client";
import JoinRoom from "./JoinRoom.vue"; // Import your JoinRoom component
import paddle from "./paddle";
export const socket = io("0.0.0.0:3000", {
  query: {
    userLogin: "acosta-a",
  },
});

export default {
  components: {
    JoinRoom,
  },
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
    };
  },
  methods: {
    renderPaddle(canvasRef, leftPaddle, rightPaddle) {
      const paddleC = canvasRef;
      const ctx = paddleC?.getContext("2d"); 
      paddle(ctx, paddleC, this.leftPaddle);
      paddle(ctx, paddleC, this.rightPaddle);

    },
    initBall(canvasRef) {
      if (this.gameOn) {
        console.log("balll");
        socket.off("ball_update").on("ball_update", (data) => {
          const ballC = canvasRef;
          const ctx = ballC?.getContext("2d");
          ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
          this.renderPaddle(this.canvasRef, this.leftPaddle, this.rightPaddle);         
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
    movePlayer(event) {
      if (event.keyCode === 38) {
        socket.emit("arrow_keyUp");
        this.keypress = true;
        console.log("up arrow pressed");
      } else if (event.keyCode === 40) {
        socket.emit("arrow_keyDown");
        this.keypress = true;
        console.log("down arrow pressed");
      }
      this.renderPaddle(this.canvasRef, this.leftPaddle, this.rightPaddle);
      if (1) {
        this.initBall(this.canvasRef);
      }
      socket.on("player_moved", (data) => {
        if (data.side === "left") {
          this.leftPaddle = data;
        } else if (data.side === "right") {
          this.rightPaddle = data;
        }
      });
    },
  },
  mounted() {
    try {
      socket.off("START_GAME").on("START_GAME", () => {
        this.newPlayer = true;
        this.gameOn = true;
        console.log("game started");
      });
      socket.off("player1_update").on("player1_update", (data) => {
        this.leftPaddle = data;
        console.log("this.leftPaddle");
      });
      socket.off("player2_update").on("player2_update", (data) => {
        this.rightPaddle = data;
        console.log("left id", this.leftPaddle.id);
        console.log("this.newPlayer");
      });
      socket.off("PlayerDisconnected").on("PlayerDisconnected", (data) => {
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
          this.$router.push("/");
        }, 4000);
      });
      socket.off("player1_scored").on("player1_scored", (data) => {
        this.p1_points = data;
        console.log("1 scored ", data);
      });
      socket.off("player2_scored").on("player2_scored", (data) => {
        this.p2_points = data;
        console.log("2 scored ", data);
      });

      this.canvasRef = this.$refs.canvasRef;
      window.addEventListener("keydown", this.movePlayer);
    } catch (error) {
      console.error("Error in mounted hook:", error);
    }
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.movePlayer);
  },
};
</script>

<style scoped>
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
  background-image: url('earth.jpg');
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
