<script setup lang="ts">
import { useMaps } from "~/stores/maps/Maps";

const storeMaps = useMaps();
</script>
<template>
	<main class="w-full grid justify-items-center grid-cols-1 md:grid-cols-3 gap-6">
		<section v-for="map in storeMaps.maps" :key="map.id">
			<button @click="async () => await navigateTo(`/maps/${map.id}`)" class="flex flex-col gap-3">
				<h2>{{ map.name }}</h2>
				<img :src="map.imageUrl" alt="map.name" />
			</button>
		</section>
	</main>
</template>

<style scoped>
img {
	width: 100%;
	max-width: 300px;
}

button {
	border: none;
	background: none;
	cursor: pointer;
	transition: all 0.1s ease-in-out;
}

button:hover {
	transform: scale(1.1);
}
</style>
