<template>
    <!-- <div
        class="flex flex-row justify-center items-end bg-white">
        <div v-for="(item, index) in heights" :key="index"
            class="bg-blue-500 m-1 w-4" :style="{ height: (item * 4) + 'px' }">
        </div>
    </div> -->
    <div class="flex flex-row w-full mt-3 pr-2 pl-2">
        <div class="w-1/6 border">
            pos.
        </div>
        <div class="w-4/6 border">
            player
        </div>
        <div class="w-1/6 border">
            points
        </div>
    </div>
    <div
        v-for="(user, index) in users" :key="user.id"
        class="flex flex-row w-full pr-2 pl-2">
            <div class="w-1/6 border border-slate-700">
                {{ index + 1 }}
            </div>
            <div class="w-4/6 border border-slate-700">
                {{ user.nickname }}
            </div>
            <div class="w-1/6 border border-slate-700">
                {{ user.points }}
            </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const heights = ref<number[]>([96, 80, 64, 48, 40, 32, 24]);
        return {
            heights,
            users: [ { id: 1, nickname: 'acosta-a', points: 10 },
            { id: 2, nickname: 'gusalves', points: 8 },
            { id: 3, nickname: 'moa', points: 5 },
            { id: 4, nickname: 'demi', points: 2 },
            { id: 5, nickname: 'wportilh', points: 2 },]
        }
    },
}
</script>