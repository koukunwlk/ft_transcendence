<script>
export default {
    methods: {
        emitEvent() {
            this.$emit('clickedButton');
        }
    }
}
</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black bg-blur bg-opacity-80 z-20">
        <div class="w-64 h-80 md:w-80 md:h-96 lg:w-1/4 lg:h-2/4  bg-gray-900 rounded-xl">
            <div class="flex justify-end mr-2 mt-2">
                <button @click="emitEvent">
                    <img class="h-6 w-6" src="../assets/svgs/x-icon.svg" alt="close modal icon">
                </button>
            </div>
            <div class="flex justify-center">
                <h1 class="text-3xl lg:text-4xl">
                    Settings
                </h1>
            </div>
        </div>
    </div>
</template>