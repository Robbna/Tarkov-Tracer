<script setup lang="ts">
import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";
import type { IItem } from "~/services/tarkov/types";
import { useItems } from "~/stores/items/Items";

interface IItemDisplayed {
	item: IItem;
	visible: boolean;
}

const storeItems = useItems();

const selectedItem = ref<IItem | null>(null);
const itemsDisplayed = ref<IItemDisplayed[]>([]);
const filteredItems = ref<IItem[]>([]);

const onSearch = (event: AutoCompleteCompleteEvent) => {
	if (storeItems.items === null) {
		return;
	}

	filteredItems.value = Array.from(
		new Set([
			...storeItems.items.filter((item) => item.shortName.toLowerCase().startsWith(event.query.trim().toLowerCase())),
			...storeItems.items.filter((item) => item.shortName.toLowerCase().includes(event.query.trim().toLowerCase())),
		]),
	);
};

const onSelectedItem = (item: AutoCompleteItemSelectEvent) => {
	itemsDisplayed.value.push({
		item: item.value,
		visible: true,
	});
};

const onCloseAllWindows = () => {
	itemsDisplayed.value.forEach((itemDisplayed) => {
		itemDisplayed.visible = false;
	});
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
				@complete="onSearch"
				@item-select="onSelectedItem"
			/>
			<button @click="onCloseAllWindows">Close all</button>
		</div>
		<Dialog
			v-model:visible="itemDisplayed.visible"
			v-for="(itemDisplayed, index) in itemsDisplayed"
			:key="index"
			draggable
		>
			<ItemCard :item="itemDisplayed.item" :on-close="() => (itemDisplayed.visible = false)" />
		</Dialog>
	</main>
</template>

<style scoped>
:deep(.p-autocomplete-input) {
	color: white;
	background-color: rgba(31, 31, 31, 0.3);
	width: 100%;
}
</style>
