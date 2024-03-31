<template>
    <!-- <div
        class="flex flex-row justify-center items-end bg-white">
        <div v-for="(item, index) in heights" :key="index"
            class="bg-blue-500 m-1 w-4" :style="{ height: (item * 4) + 'px' }">
        </div>
    </div> -->
    <div class="w-full h-0.5 bg-slate-700 mt-2"></div>
    <div
        class="flex flex-row w-full mt-3 pr-2 pl-2 font-semibold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <div class="w-1/6 border">
            POS.
        </div>
        <div class="w-4/6 border">
            PLAYER
        </div>
        <div class="w-1/6 border">
            POINTS
        </div>
    </div>
    <div v-for="(user, index) in users" :key="user.id"
        class="flex flex-row w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl pr-2 pl-2">
        <div class="w-1/6 border border-slate-700">
            {{ index + 1 }}
        </div>
        <div class="w-4/6 border border-slate-700">
            {{ user.nickname || "Unkown" }}
        </div>
        <div class="w-1/6 border border-slate-700">
            {{ user.score }}
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue';
import userService from "../services/UserService";

export default {
    data(): {
        heights: Ref<number[]>,
        users: { id: number, nickname: string, score: number }[]
    } {
        return {
            heights: ref<number[]>([96, 80, 64, 48, 40, 32, 24]),
            users: []
        }
    },
    beforeMount() {
        userService.getRanking().then((response) => {
            this.users = response.data
        });
    }
}






// setup() {
//     const heights = ref<number[]>([96, 80, 64, 48, 40, 32, 24]);
//     return {
//         heights,
//         users: [{ id: 1, nickname: 'acosta-a', points: 10 },
//         { id: 2, nickname: 'gusalves', points: 8 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },
//         { id: 3, nickname: 'moa', points: 5 },
//         { id: 4, nickname: 'demi', points: 2 },
//         { id: 5, nickname: 'wportilh', points: 2 },]
//     }
// },
</script>