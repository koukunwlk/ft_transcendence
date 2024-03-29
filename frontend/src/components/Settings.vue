<script>
export default {
    methods: {
        emitEvent() {
            this.$emit('clickedButton');
        }
    },
    data() {
        return {
            isChecked: false,
        }
    }
}
</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black bg-blur bg-opacity-80 z-20">
        <div class="w-64 h-80 md:w-80 md:h-96 lg:w-1/4 lg:h-2/4 bg-gray-900 rounded-xl">
            <div class="flex justify-end mr-2 mt-2">
                <button @click="emitEvent">
                    <img class="h-6 w-6" src="../assets/svgs/x-icon.svg" alt="close modal icon">
                </button>
            </div>
            <div class="flex justify-center">
                <h1 class="text-3xl lg:text-4xl border-b uppercase">
                    Settings
                </h1>
            </div>
            <div class="h-4/6 w-full flex flex-col justify-center ml-4 md:ml-6 xl:ml-8 2xl:ml-12">
                <div for="2f" class="flex flex-row justify-start mb-5">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="2f" class="sr-only peer">
                        <div class="relative w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500">
                        </div>
                    </label>
                    <span class="ms-3 text-base md:text-lg lg:text-xl 2xl:text-2xl text-gray-900 dark:text-gray-300">
                        2F Authentication
                    </span>
                </div>
                <div class="pt-3">
                    <label for="nickname" class="block text-sm lg:text-lg text-gray-900 dark:text-gray-300">Nickname</label>
                    <div class="flex items-center">
                        <input type="text" id="nickname" class="bg-gray-50 w-4/6 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-sm focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" placeholder="enter new nickname" required />
                        <button type="button" class="bg-yellow-500 text-sm text-gray-900 dark:text-gray-300 p-2.5 border-yellow-300 rounded-sm block dark:bg-yellow-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 ml-1">save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>