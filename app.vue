<script setup lang="ts">
import { useItems } from "~/stores/items/Items";

useHead({
	title: "Tarkov Tracer",
	link: [
		{
			rel: "stylesheet",
			href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
		},
	],
});

const storeItems = useItems();

const showSpinner = ref(true);

onMounted(() => {
	storeItems.fetchItems().then(() => {
		showSpinner.value = false;
	});
});
</script>

<template>
	<div id="overlay">
		<BaseSpinner :show="showSpinner" />
	</div>
	<main class="flex flex-col justify-between h-100vh">
		<div>
			<NavBar />
			<div class="flex items-center justify-center py-6">
				<div class="message-wrapper px-9">
					<BaseMessage
						title="Attention! This is a Beta version of this website."
						description="This Beta version does not represent the final quality of the product. Thank you for your understanding and support."
						severity="warning"
					/>
				</div>
			</div>
			<NuxtPage />
		</div>
		<FooterCopyright>
			<h1>hola</h1>
		</FooterCopyright>
	</main>
</template>

<style scoped>
.message-wrapper {
	width: 100%;
	max-width: 49rem;
}
</style>
