<script setup lang="ts">
const props = defineProps<{
	url: string;
	alt: string;
	zoomIn: number;
}>();

const zoom = (e: MouseEvent) => {
	const zoomer = e.currentTarget as HTMLElement;
	let offsetX, offsetY;

	if ("offsetX" in e) {
		offsetX = e.offsetX;
		offsetY = e.offsetY;
	} else {
		const touchEvent = e as unknown as TouchEvent;
		offsetX = touchEvent.touches[0].pageX;
		offsetY = touchEvent.touches[0].pageY;
	}

	const x = (offsetX / zoomer.offsetWidth) * 100;
	const y = (offsetY / zoomer.offsetHeight) * 100;
	zoomer.style.backgroundPosition = `${x}% ${y}%`;
};
</script>
<template>
	<div class="image-wrapper">
		<figure
			class="zoom"
			:style="{ backgroundImage: `url(${props.url})`, 'background-size': `${props.zoomIn}` }"
			@mousemove="zoom"
		>
			<img :src="props.url" :alt="props.alt" />
		</figure>
	</div>
</template>

<style scoped>
figure.zoom {
	position: relative;
	width: 90vw;
	max-width: 1500px;
	overflow: hidden;
	cursor: zoom-in;
	background-position: 50% 50%;
}

figure.zoom img {
	display: block;
	width: 100%;
	transition: opacity 0.5s;
}

figure.zoom img:hover {
	opacity: 0;
}
</style>
