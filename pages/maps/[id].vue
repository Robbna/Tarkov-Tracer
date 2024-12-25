<script setup lang="ts">
import { useMaps } from "~/stores/maps/Maps";

const router = useRoute();
const storeMaps = useMaps();

const selectedMap = storeMaps.maps.find((map) => map.id === router.params.id);

useHead({
	title: useHeadTitle().getTitleBasedOnRoute(selectedMap?.name ?? (router.params.id as string)),
	meta: [
		{
			hid: "description",
			name: "description",
			content: "Explore all maps in Escape From Tarkov with our detailed maps guide.",
		},
		{ name: "keywords", content: "Escape From Tarkov, maps, maps guide" },
	],
});
</script>
<template>
	<main class="w-full flex flex-col items-center justify-center gap-40">
		<BaseCanvas
			v-if="selectedMap != null"
			:image-url="selectedMap?.imageUrl"
			:max-zoom="1.5"
			:min-zoom="-0.1"
			:aspect-ratio="[selectedMap.aspectRatio.width, selectedMap.aspectRatio.height]"
		/>
	</main>
</template>

<style scoped></style>
