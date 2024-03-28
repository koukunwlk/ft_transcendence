<template>
    <div
        class="flex flex-col bg-gray-200 items-center h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-scroll">
        <div class="bg-black">

            <!-- Add User Button -->
            <div class="bg-red-300 ">
                <button class="px-4 py-2 bg-blue-200 text-white rounded" @click="openAddFriendModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-black " aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <OneInputModal :isOpen="isAddFriendModalOpen" @close-modal="closeAddFriendModal"
                    :title="'User to add:'" />
            </div>

            <!-- Block User Button -->
            <div class="bg-red-300 ">
                <button class="px-4 py-2 bg-blue-200 text-white rounded" @click="openBlockFriendModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </button>
                <OneInputModal :isOpen="isBlockFriendModalOpen" @close-modal="closeBlockFriendModal"
                    :title="'User to block:'" />
            </div>

            <!-- Community Button -->
            <div class="bg-red-300 ">
                <button class="px-4 py-2 bg-blue-200 text-white rounded" @click="openBlockFriendModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>


                </button>
                <OneInputModal :isOpen="isBlockFriendModalOpen" @close-modal="closeBlockFriendModal"
                    :title="'User to block:'" />
            </div>

            <!-- Notification Button -->
            <div class="bg-red-300 ">
                <button class="px-4 py-2 bg-blue-200 text-white rounded" @click="openFriendRequestModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                    </svg>

                </button>
                <listModal :title="'Friend Requests'" :isOpen="isFriendRequestModalOpen" :list="friendRequests" @close-modal="closeFriendRequestModal"/>
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
import listModal from './listModal.vue';

export default {
    name: 'FriendList',
    components: {
        FriendComponent,
        OneInputModal,
        listModal
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
            isAddFriendModalOpen: false,
            isBlockFriendModalOpen: false,
            isFriendRequestModalOpen: false,
        };
    },
    methods: {
        openAddFriendModal() {
            this.isAddFriendModalOpen = true;
        },
        closeAddFriendModal() {
            this.isAddFriendModalOpen = false;
        },

        openBlockFriendModal() {
            this.isBlockFriendModalOpen = true;
        },
        closeBlockFriendModal() {
            this.isBlockFriendModalOpen = false;
        },

        openFriendRequestModal() {
            this.isFriendRequestModalOpen = true;
        },
        closeFriendRequestModal() {
            this.isFriendRequestModalOpen = false;
        },

    },
};
</script>
