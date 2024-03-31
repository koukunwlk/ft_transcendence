<template>
    <div class="flex-col flex">
        <div class="flex items-center justify-between p-4 bg-white shadow rounded-lg w-full">
            <div class="text-lg font-bold">{{ this.nickname }}</div>
            <div>
                <button @click="accept"
                    class="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-700">Accept</button>
                <button @click="decline"
                    class="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-700">Decline</button>
                <button @click="block" class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700">Block</button>
            </div>
        </div>
        <div v-if="error" class="mt-2 text-red-500">{{ error }}</div>
    </div>
</template>

<script>
import { FriendService } from '../services/FriendService';
import { FriendListStatusEnum } from '../services/FriendService'
export default {
    data() {
        return {
            error: null,
            friendService: new FriendService()
        }
    },

    props: {
        nickname: {
            type: String,
        },
        id: {
            type: String,
        }
    },
    methods: {
        accept() {
            this.friendService.handleFriendRequest(this.id, FriendListStatusEnum.ACCEPTED).catch(error => {
                this.error = error.response.data.message
            })
        },
        decline() {
            this.friendService.handleFriendRequest(this.id, FriendListStatusEnum.DECLINED)
        },
        block() {
            this.friendService.handleFriendRequest(this.id, FriendListStatusEnum.BLOCKED)
        }
    }
}
</script>

<style scoped></style>