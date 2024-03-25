<template>
    <div
        class="flex flex-wrap p-1 h-20 w-48 md:h-24 2xl:h-28 md:w-64 lg:w-80 absolute bottom-6 left-40 md:left-44 xl:left-52 2xl:left-64">
        <div v-for="(item, index) in 10" :key="index"
            class="w-1/6 h-1/2 border flex items-center justify-center">
            <img src="../assets/images/medal.png" alt="medal" class="h-5/6">
        </div>
    </div>
</template>

<script>
</script>