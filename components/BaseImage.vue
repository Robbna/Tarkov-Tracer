<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watchEffect } from "vue";
import type { IMap } from "~/services/tarkov/types/IMap";

const props = defineProps<{
	mapData: IMap;
	zoomIn: number;
}>();

const emit = defineEmits<{
	(e: "@zoom-in" | "@zoom-out"): void;
}>();

const dragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const backgroundPosition = ref({ x: 50, y: 50 });

const isFocus = ref(false);
const isHover = ref(false);

const showMessage = computed(() => isHover.value && !isFocus.value);
const backgroundSize = computed(() => `${props.zoomIn}%`);

const startDragging = (e: MouseEvent | TouchEvent) => {
	if (props.zoomIn <= 1) {
		return;
	}

	dragging.value = true;
	if (e instanceof MouseEvent) {
		startX.value = e.pageX;
		startY.value = e.pageY;
	} else if (e instanceof TouchEvent) {
		startX.value = e.touches[0].pageX;
		startY.value = e.touches[0].pageY;
	}
};

const handleDrag = (e: MouseEvent | TouchEvent) => {
	if (!dragging.value) {
		return;
	}

	let pageX;
	let pageY;
	if (e instanceof MouseEvent) {
		pageX = e.pageX;
		pageY = e.pageY;
	} else if (e instanceof TouchEvent) {
		pageX = e.touches[0].pageX;
		pageY = e.touches[0].pageY;
	}

	const zoomer = e.currentTarget as HTMLElement;
	const deltaX = pageX! - startX.value;
	const deltaY = pageY! - startY.value;

	const adjustmentFactor = 136;

	const adjustedDeltaX = (deltaX / props.zoomIn) * adjustmentFactor;
	const adjustedDeltaY = (deltaY / props.zoomIn) * adjustmentFactor;

	const newX = backgroundPosition.value.x - (adjustedDeltaX / zoomer.offsetWidth) * 100;
	const newY = backgroundPosition.value.y - (adjustedDeltaY / zoomer.offsetHeight) * 100;

	backgroundPosition.value = {
		x: Math.max(0, Math.min(100, newX)),
		y: Math.max(0, Math.min(100, newY)),
	};

	zoomer.style.backgroundPosition = `${backgroundPosition.value.x}% ${backgroundPosition.value.y}%`;

	startX.value = pageX!;
	startY.value = pageY!;
};

const handleScroll = (e: WheelEvent) => {
	if (isFocus.value) {
		emit(e.deltaY > 0 ? "@zoom-out" : "@zoom-in");
	}
};

watchEffect(() => {
	if (isHover.value && isFocus.value) {
		useScroll().disableScroll();
	} else {
		useScroll().enableScroll();
	}
});

onMounted(() => {
	backgroundPosition.value = { x: 50, y: 50 };

	window.addEventListener("wheel", handleScroll);
});

onUnmounted(() => {
	window.removeEventListener("wheel", handleScroll);
});
</script>

<template>
	<div class="relative w-full">
		<figure
			:class="{
				zoom: true,
				blur: showMessage,
			}"
			:style="{
				backgroundImage: `url(${props.mapData.imageUrl})`,
				backgroundSize: backgroundSize,
				backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
				aspectRatio: `${props.mapData.aspectRatio.width}/${props.mapData.aspectRatio.height}`,
			}"
			@mouseup="() => (dragging = false)"
			@mousemove="
				(e) => {
					handleDrag(e);
					isHover = true;
				}
			"
			@mousedown="
				(e) => {
					startDragging(e);
					isFocus = true;
				}
			"
			@mouseleave="
				() => {
					dragging = false;
					isHover = false;
					isFocus = false;
				}
			"
			@touchstart="
				(e) => {
					startDragging(e);
					isFocus = true;
				}
			"
			@touchmove="
				(e) => {
					handleDrag(e);
					isHover = true;
				}
			"
			@touchend="
				() => {
					dragging = false;
					isHover = false;
					isFocus = false;
				}
			"
		/>
		<div
			v-show="showMessage"
			class="not-draggable-message w-full text-center"
			@mousemove="(e) => (isHover = true)"
			@mousedown="(e) => (isFocus = true)"
		>
			<h2>Click and scroll</h2>
		</div>
	</div>
</template>

<style scoped>
figure.zoom {
	width: 90vw;
	max-width: 1500px;
	height: 100%;
	overflow: hidden;
	cursor: grab;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	z-index: 5;

	&.blur {
		filter: blur(3px);
	}
}

figure.zoom:active {
	cursor: grabbing;
}

.not-draggable-message {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
}

.not-draggable-message h2 {
	font-size: 2rem;
	text-shadow: 0 0 15px var(--primary);
	text-shadow: 0 0 6px var(--bg-primary);
}
</style>
