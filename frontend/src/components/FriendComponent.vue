<template>
    <div @click="handleClick"
        class="cursor-pointer max-h-12 shadow-lg shadow-yellow-500/5 flex items-center cursor-pointer gap-2 text-white scroll">
        <img class="img-fluid rounded-full w-12 h-11 mb-2 ml-1"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sunset in the mountains">
        <div class="h-full w-full grid grid-cols-4">
            <div class="col-span-3 font-bold text-sm">{{ friend.nickname }}
            </div>
            <div class="col-span-1 grid justify-center content-center float ">
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
    },
    methods: {
        handleClick() {
            this.$router.push(`/profile/${this.friend.id}`)
        }
    }
}
</script>
