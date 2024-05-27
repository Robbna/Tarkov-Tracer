<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { useItems } from "~/stores/items/Items";
import { useTraders } from "~/stores/traders/Traders";

useHead({
	title: "Tarkovpedia",
	link: [
		{
			rel: "stylesheet",
			href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
		},
	],
	script: [
		{
			src: "https://www.googletagmanager.com/gtag/js?id=G-YTNP4RYFY1",
		},
		{
			children: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YTNP4RYFY1');`,
		},
	],
});

const storeItems = useItems();
const storeTraders = useTraders();

onMounted(() => {
	Promise.all([storeItems.fetchItems(), storeTraders.fetchTraders()]);
});
</script>

<template>
	<SpeedInsights />
	<main class="h-screen flex flex-col justify-between">
		<NavBar />
		<NuxtPage />
		<FooterCopyright />
	</main>
</template>

<style scoped>
.message-wrapper {
	width: 100%;
	max-width: 49rem;
}
</style>
