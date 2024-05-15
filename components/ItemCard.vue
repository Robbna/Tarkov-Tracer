<script setup lang="ts">
// REFERENCE
// =================================================================
// https://pbs.twimg.com/media/Fldlm3HX0AEGhMn?format=jpg&name=large
// =================================================================

import type { IItem } from "~/services/tarkov/types";

const props = defineProps<{
	item: IItem;
	onClose: () => void;
}>();

const sortedVendorsByPrice = computed(() => {
	return props.item.sellFor.sort((a, b) => b.price - a.price);
});

const mostProfitableVendor = computed(() => {
	return sortedVendorsByPrice.value[0];
});

const formatter = new Intl.NumberFormat("ru-RU", {
	style: "currency",
	currency: "RUB",
	minimumFractionDigits: 0,
});
</script>
<template>
	<div class="item-card flex flex-col">
		<!-- Header -->
		<header class="flex justify-between">
			<div class="flex gap-3 p-1">
				<i class="fa-solid fa-magnifying-glass" />
				<p>{{ props.item.name }}</p>
			</div>
			<button class="x-mark close-button" @click="onClose">
				<i class="fa-solid fa-xmark flex x-mark-icon items-center" />
			</button>
		</header>

		<!-- Image -->
		<section class="image-section">
			<div class="weigth-wrapper flex gap-2 p-2">
				<i class="fa-solid fa-weight-hanging" />
				<p>{{ props.item.weight }} Kg</p>
			</div>
			<div class="price-wrapper flex items-center gap-2 p-2">
				<p>{{ sortedVendorsByPrice[0].vendor.name }} : {{ sortedVendorsByPrice[0].price }}</p>
				<i class="fa-solid fa-ruble-sign" />
			</div>
			<img :src="props.item.inspectImageLink" alt="item image" />
		</section>

		<!-- Footer -->
		<footer class="flex flex-col p-4 gap-3">
			<section class="flex flex-col">
				<p class="text-3xl">Description</p>
				<p>{{ props.item.description }}</p>
			</section>
			<section class="flex flex-col">
				<p class="text-3xl">Best prices</p>
				<div class="vendor-table m-2">
					<DataTable :value="sortedVendorsByPrice" columnResizeMode="expand" showGridlines>
						<Column field="vendor.name" header="Vendor" />
						<Column field="vendor.price" header="Price">
							<template #body="slotProps">
								<span class="vendor-price-cell">{{ formatter.format(slotProps.data.price) }}</span>
							</template>
						</Column>
					</DataTable>
				</div>
			</section>
		</footer>
	</div>
</template>

<style scoped>
::-webkit-scrollbar {
	width: 6px;
}

::-webkit-scrollbar-thumb {
	background: rgb(80, 79, 80);
}

.close-button {
	border: none;
	background: none;

	&:hover {
		cursor: pointer;
	}
}

.vendor-table {
	background-color: rgb(25, 27, 26);
	border: 1px solid rgb(91, 93, 91);

	& .vendor-price-cell {
		font-size: 1.3rem;
	}
}

header {
	position: sticky;
	top: 0;
	background-color: rgb(25, 27, 26);
	z-index: 99;
	border-bottom: 1px solid rgb(91, 93, 91);
}

.item-card {
	border: 1px solid rgb(91, 93, 91);

	max-width: 600px;
	min-width: 330px;

	min-height: 300px;
	max-height: 600px;

	background-color: rgb(25, 27, 26);

	color: white;

	resize: both;
	overflow: hidden;
	overflow-y: auto;
	text-overflow: ellipsis;
}

.x-mark {
	color: rgb(200, 196, 194);
	background: rgb(72, 8, 10);
	padding: 0 0.5rem;
}

.x-mark-icon {
	text-align: center;
}

.image-section {
	position: relative;

	& img {
		width: 100%;
	}

	& .weigth-wrapper {
		position: absolute;
		z-index: 2;
		right: 0;
		font-size: 0.8rem;
	}

	& .price-wrapper {
		position: absolute;
		z-index: 2;
		right: 0;
		bottom: 0;
		font-size: 1.8rem;
	}
}
</style>
