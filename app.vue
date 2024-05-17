<script setup lang="ts">
import { routerKey } from "vue-router";
import { useItems } from "~/stores/items/Items";
const { isMobile } = useDevice();

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
const showSpinner = ref(false);

onMounted(async () => {
	if (isMobile) {
		return;
	}

	showSpinner.value = true;
	storeItems.fetchItems().then(() => {
		showSpinner.value = false;
	});
});
</script>

<template>
	<div id="overlay">
		<BaseSpinner :show="showSpinner" />
	</div>
	<main v-if="!isMobile" class="h-screen flex flex-col justify-between">
		<div>
			<NavBar />
			<div class="flex items-center justify-center py-6">
				<div class="message-wrapper px-9">
					<BaseMessage
						title="Attention! This is a Beta version of this website."
						description="This Beta version does not represent the final quality of the website. Thank you for your understanding and support."
						severity="warning"
					/>
				</div>
			</div>
			<NuxtPage />
		</div>
	</main>
	<main v-else class="h-screen flex flex-col justify-between items-center p-3">
		<div class="h-screen flex items-center p-3">
			<BaseMessage
				title="Attention! Not Available on Mobile"
				description="This Beta version of the website is only accessible on desktop devices. Thank you for your understanding and support."
				severity="warning"
			/>
		</div>
		<FooterCopyright />
	</main>
</template>

<style scoped>
.message-wrapper {
	width: 100%;
	max-width: 49rem;
}
</style>
