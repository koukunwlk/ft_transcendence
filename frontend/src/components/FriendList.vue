<template>
    <div
        class="flex flex-col items-start bg-gray-600 h-full w-full border-2 border-yellow-500 border-opacity-15 rounded bg-opacity-40 overflow-x-hidden">
        <div class="w-full my-2">
            <FriendListActions :friend="friend" :friendRequests="friendRequests" />
        </div>
        <div v-for="friend in friends" :key="friend.id" class="w-full h-24 m-1 center justify-center"
            @click="getFriendOnClick(friend.id)">
            <FriendComponent :friend="friend" />
        </div>
    </div>

</template>

<script>
import FriendComponent from './FriendComponent.vue';
import OneInputModal from './OneInputModal.vue';
import listModal from './listModal.vue';
import FriendListActions from './FriendListActions.vue';
import { FriendService } from '../services/FriendService';

export default {
    name: 'FriendList',
    components: {
        FriendComponent,
        OneInputModal,
        listModal,
        FriendListActions
    },
    data() {
        return {
            friends: [],
        }
    },
    beforeMount() {
        const friendService = new FriendService()
        friendService.getFriendList().then((response) => {
            this.friends = response.data;
        }).finally(() => {
        })
    },

    methods: {
        getFriendOnClick(id) {
            this.$emit('actual-friend', this.friends[id - 1])
        }
    },
};
</script>
