<template>
    <div
        class="flex flex-col bg-gray-200 items-center h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-scroll">
        <div v-for="friend in friends" :key="friend.id" class="w-full p-2">
            <FriendComponent :friend="friend" />
        </div>
    </div>
</template>

<script>
import FriendComponent from './FriendComponent.vue';

export default {
    name: 'FriendList',
    components: {
        FriendComponent,
    },
    data() {
        return {
            friends: [
                { id: 1, name: 'John Doe', status: 'online' },
                { id: 2, name: 'Jane Doe', status: 'offline' },
                { id: 3, name: 'Bob Smith', status: 'online' },
                { id: 4, name: 'Alice Johnson', status: 'offline' },
                { id: 5, name: 'Charlie Brown', status: 'online' },
                { id: 6, name: 'Diana Prince', status: 'offline' },
                { id: 7, name: 'Edward Norton', status: 'online' },
                { id: 8, name: 'Fiona Apple', status: 'offline' },
                { id: 9, name: 'George Clooney', status: 'online' },
                { id: 10, name: 'Helen Hunt', status: 'offline' },
                { id: 11, name: 'Iggy Pop', status: 'online' },
                { id: 12, name: 'Jenny McCarthy', status: 'offline' },
                { id: 13, name: 'Keanu Reeves', status: 'online' },
                { id: 14, name: 'Linda Hamilton', status: 'offline' },
                { id: 15, name: 'Mickey Rourke', status: 'online' },
                { id: 16, name: 'Natalie Portman', status: 'offline' },
                { id: 17, name: 'Oscar Wilde', status: 'online' },
                { id: 18, name: 'Pamela Anderson', status: 'offline' },
                { id: 19, name: 'Quentin Tarantino', status: 'online' },
                { id: 20, name: 'Renee Zellweger', status: 'offline' },
                { id: 21, name: 'Steve McQueen', status: 'online' },
                { id: 22, name: 'Tina Fey', status: 'offline' },
            ],
        };
    },
};
</script>
