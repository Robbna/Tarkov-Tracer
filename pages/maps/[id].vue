<script setup lang="ts">
import MapSection from "~/sections/MapSection.vue";
import { useMaps } from "~/stores/maps/Maps";

const router = useRoute();

const storeMaps = useMaps();

const selectedMap = storeMaps.maps.find((map) => map.id === router.params.id);
</script>
<template>
	<main class="w-full flex flex-col items-center justify-center gap-40">
		<MapSection v-if="selectedMap != null" :id="selectedMap.id" :map-data="selectedMap" />
	</main>
</template>

<style scoped></style>
