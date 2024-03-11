<template>
    <div>
        <input
            class="hidden"
            type="file"
            ref="fileInput"
            @change="onFileSelected"
        >
        <div class='flex items-center justify-center min-h-screen'>
            <div class="m-5">
                <button
                    @click="$refs.fileInput.click()"
                    class="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                >
                    <img
                        class="h-3 w-3"
                        src="../assets/svgs/edit-icon.svg"
                        alt="edit icon"
                    >
                </button>
            </div>
        </div>
    </div>
    <div
        v-if="previewImage"
        class="fixed top-0 w-screen h-screen flex flex-col items-center"
    >
            <img
                :src="previewImage"
                alt="preview profile image"
                class="w-56 md:w-72 lg:w-80 h-56 md:h-72 lg:h-80 mt-48 md:mt-40 lg:mt-36 rounded-full object-cover"
            >
            <button
                @click="closePreview"
            >
                Cancel
            </button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            file: null,
            previewImage: null
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
        }
    }
    
}
</script>