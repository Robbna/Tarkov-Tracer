<script setup lang="ts">
const MAPS_URL = [
	{
		name: "Customs",
		id: "customs",
		url: "https://tarkov.dev/maps/customs-3d.jpg",
		zoomIn: 250,
	},
	{
		name: "Ground Zero",
		id: "ground-zero",
		url: "https://tarkov.dev/maps/ground-zero-3d.jpg",
		zoomIn: 250,
	},
	{
		name: "Interchange",
		id: "interchange",
		url: "https://i.redd.it/cc75d84cu9m41.jpg",
		zoomIn: 450,
	},
	{
		name: "Lighthouse",
		id: "lighthouse",
		url: "https://tarkov.dev/maps/lighthouse-3d.jpg",
		zoomIn: 250,
	},
	{
		name: "Shoreline",
		id: "shoreline",
		url: "https://tarkov.dev/maps/shoreline-3d.jpg",
		zoomIn: 250,
	},
	{
		name: "Woods",
		id: "woods",
		url: "https://tarkov.dev/maps/woods-3d.jpg",
		zoomIn: 250,
	},
];
</script>
<template>
	<div>
		<div class="flex flex-col items-center justify-center gap-9 mt-9">
			<section v-for="map in MAPS_URL" :key="map.name" class="flex flex-col gap-2 items-center">
				<h1>{{ map.name }}</h1>
				<hr class="w-full" />
				<BaseImage :url="map.url" :alt="map.id" :zoom-in="map.zoomIn" />
			</section>
		</div>
	</div>
</template>
