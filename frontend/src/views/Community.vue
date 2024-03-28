<template>
    <Navbar />
	<div class="flex h-full md:h-6/6 justify-center items-center">
        <div class="flex-col h-4/5 w-4/5 md:w-3/5 bg-opacity-30 rounded-lg border border-zinc-600 text-white grid md:grid-cols-8 overflow-scroll">
            <div class="grid md:col-span-3 lg:col-span-2 w-full h-full overflow-hidden">
                <FriendList />
            </div>

            <div class="grid md:col-span-5 lg:col-span-6 w-full h-full bg-red-200">
                <Chat />
            </div>
        </div>
	</div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Avatar from "vue3-avatar";
import router from '../Router/index.ts'
import FriendList from '../components/FriendList.vue'
import Chat from '../components/Chat.vue'

function onClick() {
	router.push('/')
}

</script>
