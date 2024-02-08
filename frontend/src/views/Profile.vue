<template>
	<Navbar />
	<div class="flex h-full md:h-5/6 justify-center items-center">
		<div class="h-3/5 w-3/5 bg-blue-50">
			<div class="flex flex-col justify-center items-center bg-red-200 h-2/6">
				<div class="flex justify-center items-center">
					<Avatar name="Gstv" size="80" borderColor="black" @click="onClick()"></Avatar>
				</div>
				<div class="flex justify-center items-center">
					<a>Gustavo Martins</a>
				</div>
			</div>
			<div class="flex flex-col md:flex-row justify-center items-center bg-blue-200 h-full">
				<div class="flex flex-col md:flex-col justify-center items-center bg-red-100 w-full h-full">
					<div class="bg-yellow-200 h-1/2 w-full">
						<p>Vitórias e Derrotas</p>
					</div>
					<div class="bg-green-200 h-1/2 w-full">
						<p>Histórico</p>
					</div>
				</div>
				<div class="flex flex-col md:flex-col justify-center items-center bg-red-500 w-full h-full">
					<div class="bg-yellow-200 h-1/2 w-full">
						<p>Ranking</p>
					</div>
					<div class="bg-green-200 h-1/2 w-full">
						<p>Conquistas</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Avatar from "vue3-avatar";



</script>
