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
			...storeItems.items.filter((item) => item.name.toLowerCase().includes(event.query.trim().toLowerCase())),
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
		<div class="flex flex-col w-96 gap-1">
			<h1 class="text-3xl text-center">Search item</h1>
			<AutoComplete
				v-model="selectedItem"
				optionLabel="shortName"
				placeholder="AKS-74U, Kappa, etc..."
				:suggestions="filteredItems"
				:virtualScrollerOptions="{ itemSize: 140 }"
				@complete="onSearch"
				@item-select="onSelectedItem"
			>
				<template #option="slotProps">
					<div class="grid grid-cols-[140px_auto] items-center text-wrap">
						<img draggable="false" :alt="slotProps.option.name" :src="slotProps.option.image8xLink" />
						<div class="flex flex-col gap-[6px]">
							<p>{{ slotProps.option.name }}</p>
							<p class="text-sm">“{{ slotProps.option.shortName }}”</p>
							<p class="text-right text-2xl">{{ slotProps.option.sellFor[0].price }} <i class="fa-solid fa-ruble-sign" /></p>
						</div>
					</div>
				</template>
			</AutoComplete>
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
	border-radius: 0;
}

:deep(.p-autocomplete-items.p-virtualscroller-content) {
	background-color: rgba(31, 31, 31, 0.3);
}

button {
	border: none;
	padding: 3px;
	background-color: rgb(129, 131, 129);

	&:hover {
		cursor: pointer;
		background-color: rgb(91, 93, 91);
	}
}

img {
	width: 120px;
	height: 120px;
	object-fit: contain;
}
</style>
