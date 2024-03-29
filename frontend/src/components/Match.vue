<template>
  <div class="grid grid-cols-3 w-full border-b-2 border-yellow-500">
    <div class="text-center">
      <div>{{ player1 }}</div>
      <div v-if="winner === player1 " class="text-sm text-center text-green-400">Winner</div>
    </div>
    <div>
      <div class="flex justify-center">
        <div>{{ goals1 }}</div>
        x
        <div>{{ goals2 }}</div>
      </div>
      <div v-if="winner === 'draw' " class="text-sm text-center text-purple-400">Draw game</div>
    </div>
    <div class="text-center">
      <div>{{ player2 }}</div>
      <div v-if="winner === player2 " class="text-sm text-center text-green-400">Winner</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player1: String,
    goals1: Number,
    player2: String,
    goals2: Number
  },
  computed: {
    winner() {
      if (this.goals1 > this.goals2) {
        return this.player1
      } else if (this.goals1 < this.goals2) {
        return this.player2
      } else {
        return 'draw';
      }
    }

  }
};
</script>

<style>

</style>
