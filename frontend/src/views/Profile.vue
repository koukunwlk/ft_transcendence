<template>
	<div class="grid w-screen h-screen justify-center content-center">
		<div class="grid grid-rows-2 h-[450px] w-[370px] sm:h-[450px] sm:w-[600px]  bg-gray-600 bg-opacity-40 rounded-lg border border-zinc-600">
			<div class="grid">
				<div class="grid justify-center content-end">
					<div class="justify-center">
						<Avatar name="Gstv" size="120" borderColor="black" @click="onClick()" ></Avatar>
						<div class="grid justify-center content-center">
							<span class="text-2xl text-white">
								mrtns
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2">
				<div class="grid grid-rows-2">
					<div class="text-white rounded-lg border border-zinc-600 m-2 bg-zinc-700">
						<span>
							5 win | 0 lose
						</span>
					</div>
					<div class="text-white rounded-lg border border-zinc-600 m-2 bg-zinc-700">
						<span>
							Histórico:
							<p>
								gstv [5] - [2] 42
							</p>
						</span>
					</div>
				</div>
				<div class=" grid justify-center content-center">
					<div class="grid justify-center content-center sm:h-52 sm:w-72 bg-zinc-700 rounded-lg border border-zinc-600 text-white">
						Conquistas
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
