<script>
import PicUpload from "../components/ProfilePicUpload.vue";
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';
import authService from "../services/AuthService";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

export default {
    components: {
        PicUpload,
    },
    data() {
        return {
            isChecked: false,
            nickname: '',
            picture: useProfilePictureStore(),
            validationCode: '',
        }
    },
    mounted() {
        this.isChecked = authStore.getUser.tfaEnabled;
    },
    methods: {
        emitEvent() {
            this.$emit('clickedButton');
        },
        handleToggleChange() {
            if (this.isChecked) {
                this.generateCode();
            } else {
                this.disableTfa();
                this.validationCode = '';
            }
        },
        saveNickname() {
            try {
                console.log('nickname: ' + this.nickname);
            }
            catch (error) {
                console.log('Error saving nickname: ', error);
            }
        },
        generateCode() {
            authService
                .generateTfa()
                .then(({ data }) => {
                    this.validationCode = data.secret;
                })
                .catch((error) => {
                    console.log('Error generating 2fa secret: ', error);
                });
        },
        disableTfa() {
            authService
                .disableTfa()
                .catch((error) => {
                    console.log('Error generating 2fa secret: ', error);
                });
        },
    },
}
</script>

<template>
    <div
        class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black bg-blur bg-opacity-80 z-20">
        <div class="w-64 h-96 md:w-80 md:h-2/5 md:min-h-[32rem] lg:w-1/4 lg:min-w-96 lg:h-2/4 bg-gray-900 rounded-xl">
            <div class="flex justify-end mr-2 mt-2">
                <button @click="emitEvent">
                    <img class="h-6 w-6" src="../assets/svgs/x-icon.svg" alt="close modal icon">
                </button>
            </div>
            <div class="w-full flex justify-center mb-5">
                <div class="relative w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44">
                    <img v-if="picture.getPicture" :src="picture.getPicture" alt="profile picture"
                        class="w-full h-full rounded-full object-cover">
                    <img v-else src="../assets/profile-pictures/default-5.png" alt="default picture"
                        class="rounded-full object-cover">
                    <PicUpload />
                </div>
            </div>
            <div class="w-full flex flex-col justify-center ml-4 md:ml-6 xl:ml-8 2xl:ml-12">
                <div class="mb-8">
                    <label for="nickname"
                        class="block text-sm lg:text-lg font-semibold text-gray-900 dark:text-gray-300">
                        Nickname
                    </label>
                    <div class="flex items-center">
                        <input placeholder="Enter new nickname" required v-model="nickname" type="text" id="nickname"
                            class="bg-gray-500 w-4/6 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-l-sm focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" />
                        <button type="button" @click="saveNickname"
                            class="bg-gray-500 hover:bg-green-500 text-sm text-gray-100 p-2.5 border border-gray-400 hover:border-green-400 rounded-r-sm block placeholder-gray-400 focus:ring-blue-500">
                            save
                        </button>
                    </div>
                </div>
                <div for="2f" class="flex flex-row justify-start">
                    <label class="inline-flex items-center cursor-pointer">
                        <input v-model="isChecked" @change="handleToggleChange" type="checkbox" id="2f"
                            class="sr-only peer">
                        <div
                            class="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
                        </div>
                    </label>
                    <span class="ms-3 text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-900 dark:text-gray-300">
                        2F Authentication
                    </span>
                </div>
                <div class="mt-3 md:mt-4">
                    <span v-if="validationCode" class="dark:text-gray-300">
                        Your one-time-use secret:
                    </span>
                    <input v-if="validationCode" type="text" id="disabled-input" aria-label="disabled input"
                        class="text-center w-56 md:w-64 lg:w-80 tracking-[.25em] md:tracking-[.35em] lg:tracking-[.45em] xl:tracking-[.35em] font-semibold bg-gray-100 p-2.5 border border-gray-300 text-gray-900 text-sm lg:text-base xl:text-lg rounded-sm focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                        :placeholder="validationCode" disabled readonly>
                </div>
            </div>
        </div>
    </div>
</template>