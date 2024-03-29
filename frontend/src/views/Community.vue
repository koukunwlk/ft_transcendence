<template>
    <Navbar />
    <div class="flex h-full md:h-6/6 justify-center items-center">
        <div
            class="h-4/5 w-4/5 md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white grid md:grid-cols-8 lg:grid-cols-12">
            <div class="grid md:col-span-3 lg:col-span-4 w-full h-full overflow-hidden cursor-pointer">
                <FriendList @actual-friend="getFriendOnClick" />
            </div>
            <div class="grid md:col-span-5 lg:col-span-8 w-full h-full">
                <Chat :friend="friend"/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Avatar from "vue3-avatar";
import router from '../Router/index.ts'
import FriendList from '../components/FriendList.vue'
import Chat from '../components/Chat.vue'

export default {
    name: 'Community',
    components: {
        Navbar,
        Avatar,
        FriendList,
        Chat
    },
    methods: {
        onClick() {
            router.push('/profile')
        },

        getFriendOnClick(friendInformation) {
            this.friend = friendInformation;
        }
    },
    data() {
        return {
            friend: null,
        };
    }
}

</script>
