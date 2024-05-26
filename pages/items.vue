<script setup lang="ts">
import { useItems } from "~/stores/items/Items";
import { FilterMatchMode } from "primevue/api";
import { useTraders } from "~/stores/traders/Traders";

const storeItems = useItems();
const storeTraders = useTraders();

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	shortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	weight: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
});

const initFilters = () => {
	filters.value = {
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		shortName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		weight: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
	};
};

const clearFilter = () => {
	initFilters();
};

initFilters();
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
				:globalFilterFields="['name', 'shortName']"
			>
				<!-- HEADER -->
				<template #header>
					<div class="flex w-full justify-between">
						<Button type="button" label="Clear filters" outlined @click="clearFilter()" />
						<IconField iconPosition="left" class="flex justify-center items-center">
							<InputIcon class="top-auto">
								<i class="fa-solid fa-magnifying-glass" />
							</InputIcon>
							<InputText v-model="filters['global'].value" placeholder="Keyword search" />
						</IconField>
					</div>
				</template>
				<template #empty> No items found. </template>
				<template #loading> Loading items data. Please wait. </template>
				<!-- IMAGE -->
				<Column header="Image">
					<template #body="slotProps">
						<img class="item-image" :src="`${slotProps.data.image8xLink}`" :alt="slotProps.data.image" />
					</template>
				</Column>
				<!-- NAME + WIKI -->
				<Column field="name" header="Name" style="min-width: 12rem">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search"
						/>
					</template>
					<template #body="slotProps">
						<div class="flex flex-col gap-1">
							<span>{{ slotProps.data.name }}</span>
							<a class="item-name-anchor" :href="slotProps.data.wikiLink" target="_blank" rel="noopener noreferrer">
								(wiki)
							</a>
						</div>
					</template>
				</Column>
				<!-- SHORTNAME -->
				<Column field="shortName" header="Short name" style="min-width: 12rem">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search"
						/>
					</template>
				</Column>
				<!-- WEIGHT -->
				<Column field="weight" sortable header="Weight" style="min-width: 12rem">
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="number"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search"
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

.item-name-anchor {
	text-decoration: none;
	color: #9fa8da;
}
</style>
