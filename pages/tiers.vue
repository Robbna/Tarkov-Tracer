<script setup lang="ts">
import { useTier } from "~/composables/tier/useTier";

const { bestHeadsets, fetchBestHeader } = useTier();

onMounted(() => {
	fetchBestHeader();
});
</script>
<template>
	<main class="flex flex-col items-center justify-center gap-9">
		<h2 class="text-3xl font-bold">Best Headsets</h2>
		<section class="w-[80%] flex flex-col gap-3">
			<DataTable :value="bestHeadsets" removableSort scrollHeight="800px" stripedRows>
				<Column field="rank" sortable header="Rank" style="width: 25%" />
				<Column header="Image" style="width: 25%">
					<template #body="slotProps">
						<img
							v-if="slotProps.data.inspectImageLink"
							:src="slotProps.data.inspectImageLink"
							:alt="slotProps.data.name"
							width="100%"
						/>
					</template>
				</Column>
				<Column field="name" header="Name" style="width: 25%" />
				<Column field="walk" sortable header="Walk" style="width: 25%" />
				<Column field="running" sortable header="Running" style="width: 25%" />
			</DataTable>
		</section>
	</main>
</template>

<style scoped></style>
