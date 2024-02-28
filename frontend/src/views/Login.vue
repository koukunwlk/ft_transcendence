<script>
import data from '../data/data.json'
import { useCounterStore } from '../stores/counter.ts'

export default {
	name: "Login",
	data(){
		return {
			data: data,
			counter: useCounterStore()
		}
	}
};
</script>

<template>
	<div class="h-full flex justify-center items-center">
		<div class="aspect-square h-72 w-72 flex flex-col justify-center items-center ">
			<div>
				<h1 class="text-3xl md:text-4xl xl:text-5xl text-white mb-3">{{ counter.count }} project</h1>
			</div>
			<div>
				<button @click="counter.increment" type="button" class="py-2.5 px-5 me-2 mb-2 text-lg md:text-xl xl:text-2xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login with 42intra</button>
			</div>
		</div>
	</div>
</template>
