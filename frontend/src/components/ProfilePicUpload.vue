<template>
    <div class="absolute right-1 bottom-2">
        <input
            class="hidden"
            type="file"
            ref="fileInput"
            @change="onFileSelected"
        >
        <button
            @click="$refs.fileInput.click()"
            class="flex p-2 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
        >
            <img
                class="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"
                src="../assets/svgs/edit-icon.svg"
                alt="edit icon"
            >
        </button>
    </div>
    <div
        v-if="previewImage"
        class="fixed top-0 w-screen h-screen flex flex-col items-center bg-black bg-blur bg-opacity-80"
    >
            <img
                :src="previewImage"
                alt="preview profile image"
                class="w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 mt-48 md:mt-40 lg:mt-36 rounded-full object-cover"
            >
            <div class="flex flex-row mt-6">
                <button
                    class="mr-20"
                    @click="closePreview">
                    Cancel
                </button>
                <button
                    @click="sendPicture">
                    Confirm
                </button>
            </div>
    </div>
</template>

<script>
import { useProfilePictureStore } from '../stores/profilePictureStore.ts';

export default {
    data() {
        return {
            file: null,
            previewImage: null,
            picture: useProfilePictureStore()
        }
    },
    methods: {
        onFileSelected(event) {
            this.file = event.target.files[0];

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
        sendPicture() {
            this.picture.setPicture(this.previewImage);

            // lógica do back end

            // Ao final da lógica, devemos limpar essas variáveis para que o preview saia de exibição:
            this.previewImage = null;
            this.$refs.fileInput.value = null;
        }
    }
    
}
</script>