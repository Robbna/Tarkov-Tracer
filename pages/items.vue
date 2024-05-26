<script setup lang="ts">
// import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete";
// import type { IItem } from "~/services/tarkov/types/IItem";
import { useItems } from "~/stores/items/Items";
import { FilterMatchMode } from "primevue/api";
import { useTraders } from "~/stores/traders/Traders";

// interface IItemDisplayed {
// 	item: IItem;
// 	visible: boolean;
// }

const storeItems = useItems();
const storeTraders = useTraders();

// const selectedItem = ref<IItem | null>(null);
// const itemsDisplayed = ref<IItemDisplayed[]>([]);
// const filteredItems = ref<IItem[]>([]);

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	shortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	weight: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
});

// const onSearch = (event: AutoCompleteCompleteEvent) => {
// 	if (storeItems.items === null) {
// 		return;
// 	}

// 	filteredItems.value = Array.from(
// 		new Set([
// 			...storeItems.items.filter((item) => item.shortName.toLowerCase().startsWith(event.query.trim().toLowerCase())),
// 			...storeItems.items.filter((item) => item.shortName.toLowerCase().includes(event.query.trim().toLowerCase())),
// 			...storeItems.items.filter((item) => item.name.toLowerCase().includes(event.query.trim().toLowerCase())),
// 		]),
// 	);
// };

// const onSelectedItem = (item: AutoCompleteItemSelectEvent) => {
// 	itemsDisplayed.value.push({
// 		item: item.value,
// 		visible: true,
// 	});
// };

// const onCloseAllWindows = () => {
// 	itemsDisplayed.value.forEach((itemDisplayed) => {
// 		itemDisplayed.visible = false;
// 	});
// };
</script>

<template>
	<main class="flex flex-col items-center justify-center gap-9 mt-9">
		<section class="w-[80%] flex flex-col gap-3">
			<DataTable
				:value="storeItems.items"
				scrollable
				removableSort
				scrollHeight="800px"
				:virtualScrollerOptions="{ itemSize: 36 }"
				showGridlines
				:loading="storeItems.items === null"
				v-model:filters="filters"
				filterDisplay="row"
			>
				<template #empty> No items found. </template>
				<template #loading> Loading items data. Please wait. </template>
				<!-- IMAGE -->
				<Column header="Image">
					<template #body="slotProps">
						<img class="item-image" :src="`${slotProps.data.image8xLink}`" :alt="slotProps.data.image" />
					</template>
				</Column>
				<!-- NAME -->
				<Column field="name" header="Name">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by Name"
						/>
					</template>
				</Column>
				<!-- SHORTNAME -->
				<Column field="shortName" header="Short name">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by short name"
						/>
					</template>
				</Column>
				<!-- WEIGHT -->
				<Column field="weight" sortable header="Weight">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="number"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by weight"
						/>
					</template>
				</Column>
				<!-- TRADERS -->
				<Column field="basePrice" sortable header="Traders prices (buy). Highest to lowest">
					<template #body="slotProps">
						<div class="flex gap-2">
							<div class="trader-wrapper" v-for="trader in slotProps.data.sellFor" :key="trader.vendor.normalizedName">
								<img
									class="item-image"
									:src="`${
										storeTraders.traders?.find((t) => t.normalizedName === trader.vendor.normalizedName)?.image4xLink
									}`"
								/>
								<div class="trader-price flex gap-2">
									<span class=""> {{ trader.price }}</span>
									<span>
										{{
											storeTraders.traders?.find((t) => t.normalizedName === trader.vendor.normalizedName)?.currency
												.shortName
										}}</span
									>
								</div>
							</div>
						</div>
					</template>
				</Column>
			</DataTable>
		</section>
	</main>
</template>

<style scoped>
.item-image {
	width: 120px;
	height: 120px;
	object-fit: contain;
}

.trader-image {
	width: 50px;
	height: 50px;
	object-fit: contain;
}

.trader-wrapper {
	position: relative;
}

.trader-price {
	position: absolute;
	bottom: 0;
	right: 0;
	color: white;
	background: rgb(0, 0, 0);
	background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
	width: 100%;
	height: 30px;

	display: flex;
	justify-content: start;
	align-items: end;
	padding: 5px;
}
</style>
