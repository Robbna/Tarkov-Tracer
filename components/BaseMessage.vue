<script setup lang="ts">
const props = defineProps<{
	title: string;
	description: string;
	severity: "info" | "warning" | "error";
}>();
</script>
<template>
	<div :class="['message-wrapper', props.severity, 'flex items-center justify-center gap-3 p-3']">
		<i class="warning-icon fa-solid fa-triangle-exclamation fa-2xl" />
		<div>
			<h1 class="text-sm">{{ title }}</h1>
			<p class="text-sm">{{ description }}</p>
		</div>
	</div>
</template>

<style scoped>
.message-wrapper {
	color: #1f1f1f;
	border-radius: 0.5rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

	& h1 {
		font-size: 1.7rem;
	}

	&.info {
		color: #f1f1f1;
		background-color: rgb(89, 174, 85);
	}

	&.warning {
		background-color: rgb(253, 233, 69);
	}

	&.error {
		color: #f1f1f1;
		background-color: rgb(235, 66, 49);
	}
}
</style>
