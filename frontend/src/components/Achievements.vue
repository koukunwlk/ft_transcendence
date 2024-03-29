<template>
    <div
        class="flex flex-wrap absolute bottom-3 h-22 md:h-24 w-16 2xl:h-28 md:w-24 lg:w-80 left-40 md:left-44 xl:left-52 2xl:left-64">
        <div v-for="(item, index) in 6" :key="index"
            class="w-8 xl:w-10 2xl:w-12 h-1/2 border flex items-center justify-center">
            <img src="../assets/images/medal.png" alt="medal" class="h-5/6">
        </div>
    </div>
</template>

<script>
</script>