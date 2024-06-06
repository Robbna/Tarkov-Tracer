<script setup lang="ts">
import type { IMap } from "~/services/tarkov/types/IMap";

const props = defineProps<{
	mapData: IMap;
}>();

const route = useRoute();

const customZoomIn = ref<string>("100");
</script>
<template>
	<section class="flex flex-col gap-9 items-center">
		<div class="w-full flex flex-col items-center gap-2">
			<a class="flex items-center gap-3" :href="`${route.path}#${props.mapData.id}`">
				<i class="fa-solid fa-link" />
				<h2 class="text-4xl">{{ props.mapData.name }}</h2>
			</a>
			<div class="w-full flex flex-col gap-7">
				<div class="flex items-center gap-3">
					<button @click="customZoomIn = '100'" class="flex flex-col items-center">Reset Zoom</button>
					<input class="w-full" type="range" v-model="customZoomIn" min="100" :max="props.mapData.maxZoom" step="0.1" />
				</div>
			</div>
		</div>
		<BaseImage
			@@zoom-in="
				() => {
					if (parseInt(customZoomIn) >= props.mapData.maxZoom) {
						return;
					}
					customZoomIn = (parseInt(customZoomIn) + 30).toString();
				}
			"
			@@zoom-out="
				() => {
					if (parseInt(customZoomIn) <= 100) {
						return;
					}
					customZoomIn = (parseInt(customZoomIn) - 30).toString();
				}
			"
			:map-data="props.mapData"
			:zoom-in="parseInt(customZoomIn)"
		/>
	</section>
</template>

<style scoped>
a {
	text-decoration: none;
	color: inherit;
	height: 30px;
	font-size: 2rem;
	text-transform: uppercase;

	&:hover h2 {
		border-bottom: 2px solid;
	}
}

button {
	min-width: 160px;
	font-size: 1.13rem;
	border: none;
	padding: 6px;
	transition: background-color 0.1s;

	&:hover {
		cursor: pointer;
		background-color: var(--bg-secondary);
	}
}

.current-zoom-in {
	font-size: 1.5rem;
}

input[type="range"] {
	height: 2px;
	appearance: none;
	background: #f1f1f1;
}
input[type="range"]::-webkit-slider-runnable-track {
	width: 100%;
	cursor: pointer;
	padding: 3px;
}
input[type="range"]::-webkit-slider-thumb {
	height: 30px;
	width: 10px;
	background: var(--primary);
	box-shadow: 0 0 3px var(--bg-primary);
	cursor: pointer;
	appearance: none;
}
</style>
