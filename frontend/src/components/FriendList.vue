<template>
    <div
    class="flex flex-col bg-gray-200 items-center h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-scroll">
        <div class="bg-black">
            <div class="bg-red-300 ">
                <button class="px-4 py-2 bg-blue-200 text-white rounded"  @click="openAddFriendModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </button>
                <OneInputModal :isOpen="isAddFriendModalOpen" @close-modal="closeAddFriendModal" :title="'Add Friend'" />
            </div>
        </div>
        <div v-for="friend in friends" :key="friend.id" class="w-full p-2">
            <FriendComponent :friend="friend" />
        </div>
    </div>

</template>

<script>
import FriendComponent from './FriendComponent.vue';
import OneInputModal from './OneInputModal.vue';

export default {
    name: 'FriendList',
    components: {
        FriendComponent,
        OneInputModal,
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
            isAddFriendModalOpen: false,
        };
    },
    methods: {
        openAddFriendModal() {
            this.isAddFriendModalOpen = true;
        },
        closeAddFriendModal() {
            this.isAddFriendModalOpen = false;
        }
    },
};
</script>
