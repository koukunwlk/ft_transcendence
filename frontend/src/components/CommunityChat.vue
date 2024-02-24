<template>
	<div class="chat">
		<div v-if="!joined">
			<form @submit.prevent="join">
				<label>What's your name?</label>
				<input v-model="name" />
				<button type="submit">Join</button>
			</form>
		</div>

		<div v-else>
			<div>
				<div v-for="message in messages">
					[{{ message.name }}]: {{ message.text }}
				</div>
			</div>
		</div>

		<div>
			<form @submit.prevent="sendMessage">
				<label>Message:</label>
				<input v-model="messageText" />
				<button type="submit">Send</button>
			</form>
		</div>
	</div>
</template>

<script setup>
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue"

const socket = io('http://localhost:3000')
const messages = ref([]);
const messageText = ref("");
const joined = ref(false);
const name = ref("");

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
</script>
