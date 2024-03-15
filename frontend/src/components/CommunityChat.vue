<template>
	<div class="grid grid-cols-4 max-w-full m-1 border border-gray-400" style="height: 200px; width: 400px;">
		<!-- ####################################### chat messages and input -->
		<div class="grid col-span-3 bg-gray-200 ">
			<!-- Friend Chat Messages -->
			<div v-show="friendBool" class="overflow-y-auto h-52 bg-gray-200">
				<div class="grid grid-cols-6 content-center">
					<div class="bg-green col-span-1 m-1">
						<img class="rounded-full h-10" :src="user.listaDeamigos[friendListIndex].avatar" />
					</div>
					<div class="col-span-5 m-3 font-medium">
						<div class="grid grid-cols-2">
							<div class="col-span-1">
								{{ user.listaDeamigos[friendListIndex].name }}
							</div>
							<div class="col-span-1 grid justify-end">
								<button @click="chatIsOpen = !chatIsOpen"
									class="flex items-center gap-2 text-gray-600 hover:text-gray-900 focus:outline-none">
									<svg viewBox="0 0 24 24" width="20" height="20">
										<path
											d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
									</svg>
								</button>
								<div v-if="chatIsOpen == true"
									class="absolute right-28 mt-5 mr-3 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid justify-center">
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="h-28 overflow-y-auto bg-gray-100 m-2">
					<div class="bg-gray-100 m-2" v-for="mensagem in user.listaDeamigos[friendListIndex].mensagens">
						{{ mensagem }}
					</div>
				</div>

				<form @submit.prevent="sendMessage">
					<div class="grid grid-cols-6 p-1 mt-2">
						<div class="col-span-5">
							<input class="w-full" type="text" placeholder="Type your message..."
								v-model="messageText" />
						</div>
						<div
							class="col-span-1 border border-gray-400 rounded text-sm flex justify-center font-medium h-full ml-1">
							<button type="submit" class="">Send</button>
						</div>
					</div>
				</form>
			</div>


			<!-- Group Chat Messages -->
			<div v-show="groupBool">
  <div class="grid grid-cols-6 content-center bg-gray-200 overflow-y-auto">
    <div class="bg-green col-span-1 m-1">
      <a href="#">
      </a>
    </div>
    <div class="col-span-5 m-3 font-medium">
      <div class="grid grid-cols-2">
        <div class="col-span-1">
          {{ groupList[groupListIndex].name }}
        </div>
        <div class="col-span-1 grid justify-end">
          <button @click="chatIsOpen = !chatIsOpen"
                  class="flex items-center gap-2 text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          <div v-if="chatIsOpen == true"
               class="absolute right-28 mt-5 mr-3 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid justify-center">
            <div class="py-1" role="menu" aria-orientation="vertical"
                 aria-labelledby="options-menu">
              <a href="#"
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Add User
              </a>
              <a href="#"
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                Remove User
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="h-28 overflow-y-auto bg-gray-100 m-2">
    <div class="bg-gray-100 m-2" v-for="mensagem in groupList[groupListIndex].messages">
      <span class="text-sm font-medium"> {{ mensagem.user }} </span>
      {{ mensagem.content }}
    </div>
  </div>

  <form @submit.prevent="sendMessage">
    <div class="grid grid-cols-6 p-1 mt-2">
      <div class="col-span-5">
        <input class="w-full" type="text" placeholder="Type your message..."
               v-model="messageText" />
      </div>
      <div class="col-span-1 border border-gray-400 rounded text-sm flex justify-center font-medium h-full ml-1">
        <button type="submit" class="">Send</button>
      </div>
    </div>
  </form>
</div>




		</div>

		<!--########################################## chat sidebar -->
		<div class="bg-gray-200 border border-gray-300">
			<div class="grid justify-end">
				<!-- list actions button -->
				<!-- <button class=" text-gray-800 h-6 m-1 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
						stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
					</svg>
				</button> -->

				<div class="relative grid justify-center">
					<button @click="sidebarIsOpen = !sidebarIsOpen"
						class="flex items-center gap-2 text-gray-600 hover:text-gray-900 focus:outline-none">
						<svg class="w-6 h-7 text-gray-800 dark:text-dark" aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-width="2"
								d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
						</svg>
					</button>

					<div v-if="sidebarIsOpen == true && sidebarGroupListIsVisible == false"
						class="absolute right-0 mt-6 mr-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
						<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<a href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Add
								Friend</a>
							<a href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								@click="showGroupList">List
								Rooms</a>
						</div>
					</div>

					<div v-if="sidebarIsOpen == true && sidebarFriendListIsVisible == false"
						class="absolute right-0 mt-6 mr-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
						<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<a href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">New
								Room</a>
							<a href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								@click="showFriendList">List
								Friends</a>
						</div>
					</div>

				</div>

			</div>

			<!-- Friend List -->
			<div v-if="sidebarFriendListIsVisible">
				<ul>
					<li v-for="(friends, index) in user.listaDeamigos">
						<div class="bg-gray-300 m-1 flex justify-center content-center h-6">
							<button class=" text-gray-800 font-semibold m-1 text-sm" @click="friendIndexHandler(index)">
								{{ friends.name }}
							</button>
						</div>
					</li>
				</ul>
			</div>

			<!-- Group List -->
			<div v-if="sidebarGroupListIsVisible">
				<ul>
					<li v-for="(groups, index) in groupList">
						<div class="bg-gray-300 m-1 flex justify-center content-center h-6">
							<button class=" text-gray-800 font-semibold m-1 text-sm" @click="groupIndexHandler(index)">
								{{ groups.name }}
							</button>
						</div>
					</li>
				</ul>
			</div>

		</div>

	</div>

	<!-- Add friend Modal  -->
	<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
		v-if="addFriendModalVisible == true">
		<div
			class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 opacity-75"></div>
			</div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-gray-800">
				<div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<slot name="body">
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="user to be added...">
					</slot>
				</div>
				<div class="bg-gray- px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<slot name="footer">
						<div class="flex items-center">
							<button type="button" @click="addFriendModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm mr-2">
								Add
							</button>
							<button type="button" @click="addFriendModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm">
								Close
							</button>
						</div>
					</slot>
				</div>
			</div>
		</div>
	</div>

	<!-- Block User Modal -->
	<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
		v-if="blockFriendModalVisible == true">
		<div
			class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 opacity-75"></div>
			</div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-gray-800">
				<div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<slot name="body">
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="user to be blocked...">
					</slot>
				</div>
				<div class="bg-gray- px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<slot name="footer">
						<div class="flex items-center">
							<button type="button" @click="blockFriendModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm mr-2">
								Block
							</button>
							<button type="button" @click="blockFriendModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm">
								Close
							</button>
						</div>
					</slot>
				</div>
			</div>
		</div>
	</div>

	<!-- create group modal -->
	<div class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
		v-if="createGroupModalVisible == true">
		<div
			class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 opacity-75"></div>
			</div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
			<div
				class="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-gray-800">
				<div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<slot name="body">
						<input
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="group name to be created...">
					</slot>
				</div>
				<div class="bg-gray- px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<slot name="footer">
						<div class="flex items-center">
							<button type="button" @click="createGroupModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm mr-2">
								Create
							</button>
							<button type="button" @click="createGroupModalVisible = false"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-0 sm:w-auto sm:text-sm">
								Close
							</button>
						</div>
					</slot>
				</div>
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

const friendList = [
	{
		name: 'Amigo 1',
		id: 1,
		blocked: null,
		avatar: 'https://i.pravatar.cc/300',
		messages: [
			{
				content: "ola",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "oie",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "kkkkkj",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "vamo de play",
				timestamp: "2024-03-06 20:34:21",
			},
		],
	},
]

const groupList = [
	{
		name: 'Grupo 1',
		status: 'private',
		password: null,
		administrators: [
			{
				name: 'Amigo 1',
				id: 1,
			},
			{
				name: 'Amigo 2',
				id: 2,
			},
		],
		membros: [
			{
				name: 'Amigo 1',
				id: 1,
			},
			{
				name: 'Amigo 2',
				id: 2,
			},
		],
		bans: [
			{
				name: 'Amigo3',
				id: 3,
			},
		],
		messages: [
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "aorba grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "aorba grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "aorba grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "aorba grupo",
				timestamp: "2024-03-06 20:34:21",
			},
		],
	},
	{
		name: 'Pongers',
		status: 'private',
		password: null,
		administrators: [
			{
				name: 'Amigo 1',
				id: 1,
			},
			{
				name: 'Amigo 2',
				id: 2,
			},
		],
		membros: [
			{
				name: 'Amigo 1',
				id: 1,
			},
			{
				name: 'Amigo 2',
				id: 2,
			},
		],
		bans: [
			{
				name: 'Amigo3',
				id: 3,
			},
		],
		messages: [
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
			{
				content: "bom dia grupo",
				timestamp: "2024-03-06 20:34:21",
			},
		],
	},

]

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
			mensagens: ["x1", "noob", "kkkkkj", "vamo ve ;)", "quero soh ver msm", "ahh vc vai ver fica tranquilo po", "hum"],
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

const friendOptions = [
	{
		name: 'addFriend',
		text: 'Add Friend',
	},
	{
		name: 'blockFriend',
		text: 'Block User'
	},
	{
		name: 'listRoom',
		text: 'List Rooms',
	},
	{
		name: 'createRoom',
		text: 'Create Room'
	}

]

const sidebarIsOpen = ref(false);
const chatIsOpen = ref(false);

const addFriendModalVisible = ref(false);
const sidebarFriendListIsVisible = ref(true);
const sidebarGroupListIsVisible = ref(false);
const openSidebarChatDropdown = false;


function closeAddFriendModal() {
	addFriendModalVisible.value = false;
}

function friendIndexHandler(index) {
	friendListIndex.value = index;
	friendBool = true;
	groupBool = false;
}

function showFriendList() {
	friendBool = true;
	groupBool = false;
	sidebarGroupListIsVisible.value = false;
	sidebarFriendListIsVisible.value = true;
}

function showGroupList() {
	friendBool = false;
	groupBool = true;
	sidebarIsOpen.value = false;
	sidebarGroupListIsVisible.value = true;
	sidebarFriendListIsVisible.value = false;
}

function groupIndexHandler(index) {
	groupListIndex.value = index;
	console.log(index);
	groupBool = true;
	friendBool = false;
}

function addFriend() {
	addFriendModalVisible.value = true;
}

const blockFriendModalVisible = ref(false);

function closeBlockFriendModal() {
	blockFriendModalVisible.value = false;
}

function blockFriend() {
	blockFriendModalVisible.value = true;
}

const createGroupModalVisible = ref(false);

function closeCreateGroupModal() {
	createGroupModalVisible.value = false;
}

function createGroup() {
	createGroupModalVisible.value = true;
}

// //////////////////////////////////////////////////////////////// CHAT CODE
import { io } from "socket.io-client"
import { onBeforeMount, ref, defineEmits } from "vue"

// const socket = io('http://localhost:3000')
const messages = ref([]);
const messageText = ref("");
const joined = ref(false);
const name = ref("");
var friendListIndex = ref(0);
var groupListIndex = ref(0);
var friendBool = true;
var groupBool = false;

// onBeforeMount(() => {
// socket.emit('findAllMessages', {}, (response) => {
// 	messages.value = response;
// })

// socket.on('message', (message) => {
// 	messages.value.push(message);
// })
// });

// const join = () => {
// socket.emit('join', { name: name.value }, (names) => {
// 	joined.value = true;
// });
// }

// const sendMessage = () => {
// socket.emit('createMessage', { text: messageText.value }, () => {
// 	messageText.value = '';
// });
// }
// //////////////////////////////////////////////////////////////////////////////

</script>
