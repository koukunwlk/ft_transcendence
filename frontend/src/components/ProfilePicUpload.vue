<template>
    <div class="absolute right-1 bottom-2">
        <input class="hidden" type="file" ref="fileInput" @change="onFileSelected">
        <button @click="$refs.fileInput.click()"
            class="flex p-1 lg:p-1.5 bg-gray-500 hover:bg-green-500 rounded-xl hover:rounded-3xl transition-all duration-300">
            <img class="h-4 w-4 lg:h-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" src="../assets/svgs/camera.svg"
                alt="edit camera icon">
        </button>
    </div>
    <div v-if="previewImage"
        class="fixed top-0 left-0 w-screen h-screen flex flex-col items-center bg-black bg-blur bg-opacity-80 z-10">
        <img :src="previewImage" alt="preview profile image"
            class="w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 mt-48 md:mt-40 lg:mt-36 rounded-full object-cover">
        <div class="flex flex-row text-white mt-6">
            <button class="mr-20" @click="closePreview">
                Cancel
            </button>
            <button @click="sendPicture">
                Confirm
            </button>
        </div>
        <ImageUpload></ImageUpload>
    </div>
</template>

<script>
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';
import UserService from '../services/UserService.ts';
import ImageUpload from './ImageUpload.vue';
import { Buffer } from 'buffer';


export default {
    components: {
        ImageUpload
    },
    data() {
        return {
            file: null,
            previewImage: null,
            imageSelectedSize: null,
            imageBlob: null,
            picture: useProfilePictureStore(),
        }
    },
    methods: {
        onFileSelected(event) {
            this.file = event.target.files[0];
            this.imageSelectedSize = event.target.files[0].size / 1024 / 1024;

            const reader = new FileReader();
            reader.onload = () => {
                this.previewImage = reader.result;
            }

            reader.readAsDataURL(this.file);
        },
        closePreview() {
            this.previewImage = null;
            this.$refs.fileInput.value = null;
        },
        async sendPicture() {
            if (this.validateSize) {
                this.picture.setPicture(this.previewImage);
                this.imageBlob = new Blob([this.file], { type: this.file.type });
                var bodyFormData = new FormData();
                bodyFormData.append('image', this.file);
                UserService.setAvatarPicture(bodyFormData);
            }
            this.previewImage = null;
            this.$refs.fileInput.value = null;
        },
        async validateSize() {
            if (this.previewImage > 2) {
                alert("Image size should be less than 2MB");
                this.imageSelectedSize = null;
                this.previewImage = null;
                return null;
            } else
                return true;
        }
    }

}
</script>
