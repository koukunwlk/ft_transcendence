<template>
    <div>
      <span v-if="status === UserStatusEnum.OFFLINE">🔴</span>
      <span v-else-if="status === UserStatusEnum.ONLINE">🟢</span>
      <span v-else-if="status === UserStatusEnum.INVISIBLE">🟠</span>
      <span v-else-if="status === UserStatusEnum.AFK">⚪</span>
      <span v-else-if="status === UserStatusEnum.IN_GAME">🎮</span>
    </div>
  </template>

  <script>
  export default {
    props: {
      status: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        UserStatusEnum: {
          OFFLINE: 0,
          ONLINE: 1,
          INVISIBLE: 2,
          AFK: 3,
          IN_GAME: 4
        }
      }
    }
  }
  </script>
