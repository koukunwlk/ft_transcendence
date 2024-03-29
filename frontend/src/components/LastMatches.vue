<template>
  <div>
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="matches.length === 0" class="text-gray-500 text-center">No matches to display.</div>
      <div v-else class="flex flex-col">
        <match v-for="(match, index) in matches" :key="match.id" :player1="match.playerOne.username"
          :goals1="match.playerOneGoalsCount" :player2="match.playerTwo.username" :goals2="match.playerTwoGoalsCount"
          class="mb-3" />
      </div>
    </div>
  </div>
</template>

<script>
import Match from './Match.vue';

export default {
  components: {
    Match
  },

  props: {
    matches: {
      type: Array,
      required: true
    }
  },
};
</script>
