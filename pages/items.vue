<script setup lang="ts">
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import type { IItem } from "~/services/tarkov/types";
import { useItems } from "~/stores/items/Items";

const storeItems = useItems();

const selectedItem = ref<IItem | null>(null);
const filteredItems = ref();

const search = (event: AutoCompleteCompleteEvent) => {
	if (storeItems.items === null) {
		return;
	}

	filteredItems.value = Array.from(
		new Set([
			...storeItems.items.filter((item) =>
				item.shortName
					.toLowerCase()
					.startsWith(event.query.trim().toLowerCase()),
			),
			...storeItems.items.filter((item) =>
				item.shortName.toLowerCase().includes(event.query.trim().toLowerCase()),
			),
		]),
	);
};
</script>

<template>
	<main class="flex flex-col items-center justify-center gap-9 mt-9">
		<div class="flex flex-col w-64 gap-1">
			<h1 class="text-3xl text-center">Search item</h1>
			<AutoComplete
				v-model="selectedItem"
				optionLabel="shortName"
				placeholder="AKS-74U, Kappa, etc..."
				:suggestions="filteredItems"
				:virtualScrollerOptions="{ itemSize: 38 }"
				@complete="search"
			/>
		</div>
		<section v-if="selectedItem && typeof selectedItem === 'object'">
			<ItemCard :item="selectedItem" />
		</section>
	</main>
</template>

<style scoped>
:deep(.p-autocomplete-input) {
	color: white;
	background-color: rgba(31, 31, 31, 0.3);
	width: 100%;
}
</style>
