<template>
    <div
    class="flex flex-col bg-gray-200 items-center h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-scroll">
        <div class="bg-red-200">
            Navbar
        </div>
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
                { id: 1, name: 'John Doe', status: 0 },
                { id: 2, name: 'Jane Doe', status: 1 },
                { id: 3, name: 'Bob Smith', status: 2 },
                { id: 4, name: 'Alice Johnson', status: 3 },
                { id: 5, name: 'Charlie Brown', status: 1 },
                { id: 6, name: 'Diana Prince', status: 0 },
                { id: 7, name: 'Edward Norton', status: 1 },
                { id: 8, name: 'Fiona Apple', status: 0 },
                { id: 9, name: 'George Washington', status: 1 },
                { id: 10, name: 'Henry Ford', status: 0 },
                { id: 11, name: 'Isaac Newton', status: 1 },
                { id: 12, name: 'Jack Sparrow', status: 2 },
            ],
        };
    },
};
</script>
