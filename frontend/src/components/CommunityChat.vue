<template>
	<div class="flex bg-blue" style="height: 200px;">
		<!-- chat sidebar -->
		<div class="float-right bg-yellow w-25 h-100">
			<div class="bg-red flex justify-center">
				<ul>
					<li	v-for="(friends, index) in user.listaDeamigos"
						>
						<button
							class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
							@click="friendIndexHandler(index)"
						>
							{{ friends.name }}
						</button>
					</li>
				</ul>
			</div>
		</div>

		<!-- chat messages and input -->
		<div class="float-left h-100 w-75 bg-green">
			<div class="" v-show = "bool" >
				{{ user.listaDeamigos[friendListIndex].name }}
			</div>

			<div class="" v-show = "bool" >
				{{ user.listaDeamigos[friendListIndex].mensagens }}
			</div>
		</div>
	</div>

<!-- provavelmente vai receber isso por props ou no pinia, mas qual a necessidade real disso? -->

<!-- <div v-if="!joined">
	<form @submit.prevent="join">
		<label>What's your name?</label>
		<input v-model="name" />
		<button type="submit">Join</button>
	</form>
</div> -->

<!-- o container de mensagem -->

<!-- <div v-else>
	<div>
		<div v-for="message in messages">
			[{{ message.name }}]: {{ message.text }}
		</div>
	</div>
</div> -->

<!-- o input do chat -->

<!-- <div>
	<form @submit.prevent="sendMessage">
		<label>Message:</label>
		<input v-model="messageText" />
		<button type="submit">Send</button>
	</form>
</div> -->
</template>

<script setup>

const user = {
name: 'John Doe',
listaDeamigos: [
	{
		name: 'Amigo 1',
		avatar: 'https://i.pravatar.cc/300',
		mensagens: ["ola", "oie", "kkkkkj", "vamo de play"],
	},
	{
		name: 'Amigo 2',
		avatar: 'https://i.pravatar.cc/300',
		mensagens: ["x1", "noob", "kkkkkj", "vamo ve ;)"],
	}
],
listadeGrupos: {
	grupo1: {
		name: 'Grupo 1',
		administradores: [],
		membros: [],
		mensagens: [],
	},
	grupo2: {
		name: 'Grupo 2',
		administradores: [],
		membros: [],
		mensagens: [],
	},
},
}

const friendIndexHandler = (index) => {
bool = true;
friendListIndex.value = index;
console.log(friendListIndex.value, bool);
}

// //////////////////////////////////////////////////////////////// CHAT CODE
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue"

const socket = io('http://localhost:3000')
const messages = ref([]);
const messageText = ref("");
const joined = ref(false);
const name = ref("");
var friendListIndex = ref(0);
var bool = false;

onBeforeMount(() => {
socket.emit('findAllMessages', {}, (response) => {
	messages.value = response;
})

socket.on('message', (message) => {
	messages.value.push(message);
})
});

const join = () => {
socket.emit('join', { name: name.value }, (names) => {
	joined.value = true;
});
}

const sendMessage = () => {
socket.emit('createMessage', { text: messageText.value }, () => {
	messageText.value = '';
});
}
// //////////////////////////////////////////////////////////////////////////////

</script>
