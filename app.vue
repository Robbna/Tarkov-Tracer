<script setup lang="ts">
import { useItems } from "~/stores/items/Items";
import { useTraders } from "~/stores/traders/Traders";
import { useMaps } from "~/stores/maps/Maps";

useHead({
	title: "Tarkovpedia",
	link: [
		{
			rel: "stylesheet",
			href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
		},
	],
});

const storeItems = useItems();
const storeTraders = useTraders();
const storeMaps = useMaps();

onMounted(() => {
	storeItems.fetchItems();
	storeTraders.fetchTraders();
	storeMaps.fetchMaps();
});
</script>

<template>
	<ScrollTop />
	<main class="flex flex-col justify-between">
		<NavBar />
		<NuxtPage />
		<FooterCopyright />
	</main>
</template>

<style scoped></style>
