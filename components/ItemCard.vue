<script setup lang="ts">
// REFERENCE
// =================================================================
// https://pbs.twimg.com/media/Fldlm3HX0AEGhMn?format=jpg&name=large
// =================================================================

import type { IItem } from "~/services/tarkov/types";

const props = defineProps<{
	item: IItem;
}>();
</script>
<template>
	<div class="item-card flex flex-col justify-between">
		<!-- Header -->
		<header class="flex justify-between">
			<div class="flex gap-3 p-1">
				<i class="fa-solid fa-magnifying-glass"></i>
				<p>{{ props.item.name }}</p>
			</div>
			<i class="fa-solid fa-xmark flex x-mark items-center"></i>
		</header>

		<!-- Image -->
		<section class="image-section">
			<div class="weigth-wrapper flex gap-2 p-2">
				<i class="fa-solid fa-weight-hanging" />
				<p>{{ props.item.weight }} Kg</p>
			</div>
			<div class="price-wrapper flex items-center gap-2 p-2">
				<p>{{ props.item.basePrice }}</p>
				<i class="fa-solid fa-ruble-sign"></i>
			</div>
			<img :src="props.item.inspectImageLink" alt="item image" />
		</section>

		<!-- Footer -->
		<section class="p-3">
			<p>{{ props.item.description }}</p>
		</section>
	</div>
</template>

<style scoped>
.item-card {
	border: 1px solid rgb(91, 93, 91);

	width: 700px;
	background-color: rgb(25, 27, 26);

	color: white;
}

.x-mark {
	color: rgb(200, 196, 194);
	background: rgb(72, 8, 10);
	text-align: center;
	padding: 0px 10px;
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
