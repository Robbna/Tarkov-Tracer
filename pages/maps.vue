<script setup>
const MAPS_URL = [
	{
		name: "Customs",
		id: "customs",
		url: "https://eft-ammo.b-cdn.net/assets/maps-small/customs-3d.webp",
	},
	{
		name: "Ground Zero",
		id: "ground-zero",
		url: "https://eft-ammo.b-cdn.net/assets/maps-small/ground-zero-3d.webp",
	},
];
</script>
<template>
	<div>
		<div class="flex flex-col items-center justify-center gap-9 mt-9">
			<div
				class="flex flex-col items-center gap-3"
				v-for="map in MAPS_URL"
				:key="map.name"
			>
				<h1>{{ map.name }}</h1>
				<BaseImage :url="map.url" :alt="map.name" />
			</div>
		</div>
	</div>
</template>
