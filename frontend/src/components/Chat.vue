<template>
    <div v-if="friend" class="h-full w-full grid grid-rows-8 gap-1 ">
        <div class="grid row-span-1 ">
            <div class="h-full w-full grid grid-cols-6 shadow-xl shadow-yellow-500/5 ">
                <div class="col-span-1 grid justify-center"> <img class="img-fluid rounded-full w-16 h-16 mt-1"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Sunset in the mountains"> </div>
                <div class="col-span-5 grid justify-start content-center"> <span class="text-3xl font-bold ml-5">
                    {{ friend.name }} </span> </div>
            </div>
        </div>
        <div class="chat-box row-span-6 max-h-96 overflow-y-auto">
            <div class="max-h-25 m-5 grid gap-1 ">
                <div v-for="message in messages"
                    class="bg-gray-700 m-2 rounded-lg h-10 text-xl grid content-center p-2 "> {{ message }} </div>
            </div>
        </div>
        <div class="row-span-1 ">
            <div class="h-full w-full grid grid-cols-6 gap-1">
                <div class="col-span-5 grid content-center p-3"> <input type="text"
                        class="min-h-8 min-w-full rounded-md border-gray-700 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-1 text-black"
                        placeholder="..." v-model="messageToSend" /> </div>
                <div class="col-span-1 grid justify-center content-center"> <button
                        class="min-h-8 bg-gray-600 border-2 min-w-16 cursor-pointer rounded-md border-gray-700 shadow-sm shadow-yellow-500/5 focus:border-yellow-500 focus:ring-yellow-500 p-1 text-white grid justify-center"
                        @click="sendMessage"> Send </button> </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FriendList',
    components: {
    },
    props: {
        friend: {
            type: Object
        }
    },
    data() {
        return {
            messages: [
                "Oi amigo",
                "Vamos jogar aquele pong?",
                "Manda link ae"
            ],
            messageToSend: null,
        };
    },
    methods: {
        sendMessage() {
            this.messages[this.messages.length] = this.messageToSend;
            this.messageToSend = null;
        }
    },
};
</script>
