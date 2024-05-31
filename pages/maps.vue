<script setup lang="ts">
import MapSection from "~/sections/MapSection.vue";

export interface IImageData {
	name: string;
	id: string;
	url: string;
	maxZoom: number;
	aspectRatio: {
		width: number;
		height: number;
	};
}

const MAPS_URL: IImageData[] = [
	{
		name: "Customs",
		id: "customs",
		url: "https://tarkov.dev/maps/customs-3d.jpg",
		maxZoom: 540,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Ground Zero",
		id: "ground-zero",
		url: "https://tarkov.dev/maps/ground-zero-3d.jpg",
		maxZoom: 540,
		aspectRatio: {
			width: 166,
			height: 135,
		},
	},
	{
		name: "Interchange",
		id: "interchange",
		url: "https://i.redd.it/cc75d84cu9m41.jpg",
		maxZoom: 1240,
		aspectRatio: {
			width: 8000,
			height: 4327,
		},
	},
	{
		name: "Lighthouse",
		id: "lighthouse",
		url: "https://tarkov.dev/maps/lighthouse-3d.jpg",
		maxZoom: 740,
		aspectRatio: {
			width: 59,
			height: 54,
		},
	},
	{
		name: "Shoreline",
		id: "shoreline",
		url: "https://tarkov.dev/maps/shoreline-3d.jpg",
		maxZoom: 840,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Woods",
		id: "woods",
		url: "https://tarkov.dev/maps/woods-3d.jpg",
		maxZoom: 840,
		aspectRatio: {
			width: 480,
			height: 323,
		},
	},
	{
		name: "Factory",
		id: "factory",
		url: "https://tarkov.dev/maps/factory-3d.jpg",
		maxZoom: 540,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Reserve",
		id: "reserve",
		url: "https://tarkov.dev/maps/reserve-3d.jpg",
		maxZoom: 540,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Labs",
		id: "labs",
		url: "https://tarkov.dev/maps/labs-2d.jpg",
		maxZoom: 540,
		aspectRatio: {
			width: 191,
			height: 99,
		},
	},
	{
		name: "Streets of Tarkov",
		id: "streets",
		url: "https://tarkov.dev/maps/streets-3d.jpg",
		maxZoom: 1040,
		aspectRatio: {
			width: 7605,
			height: 4841,
		},
	},
];
</script>
<template>
	<main class="w-full flex flex-col items-center justify-center gap-40">
		<MapSection v-for="map in MAPS_URL" :key="map.name" :id="map.id" :map-data="map" />
	</main>
</template>

<style scoped></style>
