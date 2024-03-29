<template>
    <div
        class="flex flex-col bg-gray-600 items-center h-full w-full border-2 border-yellow-500 border-opacity-15 rounded bg-opacity-40 overflow-x-hidden">
        <div class="w-full my-2">
            <FriendListActions :friend="friend" :friendRequests="friendRequests" />
        </div>
        <div v-for="friend in friends" :key="friend.id" class="w-full h-24 m-1 center justify-center" @click="getFriendOnClick(friend.id)">
            <FriendComponent :friend="friend"/>
        </div>
    </div>

</template>

<script>
import FriendComponent from './FriendComponent.vue';
import OneInputModal from './OneInputModal.vue';
import listModal from './listModal.vue';
import FriendListActions from './FriendListActions.vue';

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
            friends: [
                { id: 1, name: 'John Doe', status: 0 },
                { id: 2, name: 'Jane Doe', status: 1 },
                { id: 3, name: 'Bob Smith', status: 2 },
                { id: 4, name: 'Alice Johnson', status: 3 },
                { id: 5, name: 'Charlie Brown', status: 4 },
                { id: 6, name: 'Diana Prince', status: 0 },
                { id: 7, name: 'Edward Norton', status: 1 },
                { id: 8, name: 'Fiona Apple', status: 0 },
                { id: 9, name: 'George Washington', status: 1 },
                { id: 10, name: 'Henry Ford', status: 0 },
                { id: 11, name: 'Isaac Newton', status: 1 },
                { id: 12, name: 'Jack Sparrow', status: 2 },
                { id: 13, name: 'Kevin Mitnick', status: 3 },
                { id: 14, name: 'Lucas Arnus', status: 4 },
            ],
            friendRequests: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
                { id: 3, name: 'Bob Smith' },
                { id: 4, name: 'Alice Johnson' },
                { id: 5, name: 'Charlie Brown' },
                { id: 6, name: 'Diana Prince' },
                { id: 7, name: 'Edward Norton' },
                { id: 8, name: 'Fiona Apple' },
            ],
        };
    },
    methods: {

        getFriendOnClick(id) {
            this.$emit('actual-friend', this.friends[id - 1])
        }
    },
};
</script>
