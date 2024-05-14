<script setup lang="ts">
const props = defineProps<{
	url: string;
	alt: string;
}>();
</script>
<template>
	<div class="image-wrapper">
		<img :src="props.url" :alt="props.alt" />
	</div>
</template>

<style scoped>
img {
	width: 100%;
	max-width: 1200px;
}
</style>
