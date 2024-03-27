<template>
    <div class="max-w-sm shadow-lg m-2 flex items-center cursor-pointer">
        <img class="img-fluid  rounded-full w-12 h-12"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sunset in the mountains">
        <div class="px-6 py-4 bg-red-800 flex ">
            <div class="font-bold text-md mb-2 bg-green-200">{{ friend.name }}</div>
            <div class="bg-blue-200">
                <UserStatus :status="friend.status" />
            </div>
        </div>
    </div>
</template>

<script>
import UserStatus from './UserStatus.vue'

export default {
    name: 'FriendCard',
    components: {
        UserStatus
    },
    props: {
        friend: {
            type: Object,
            required: true
        }
    }
}
</script>
