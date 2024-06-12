<script setup lang="ts">
import { fabric } from "fabric";

const props = defineProps<{
	imageUrl: string;
	minZoom: number;
	maxZoom: number;
	aspectRatio: [number, number];
}>();

const htmlCanvas = ref<HTMLCanvasElement | null>(null);
let canvas: fabric.Canvas;
let img: fabric.Image;
let isDragging = false;
let lastPosX: number;
let lastPosY: number;
let isDrawing = false;
let mode: "pan" | "draw" = "pan";
const lineWidth = ref<string>("5"); // Default line width

const maxZoom = computed(() => props.maxZoom);
const minZoom = computed(() => props.minZoom);

const toggleDrawMode = () => {
	mode = mode === "pan" ? "draw" : "pan";
	canvas.isDrawingMode = mode === "draw";
	canvas.selection = false;
};

const clearCanvas = () => {
	canvas.getObjects().forEach((obj) => {
		if (obj !== img) {
			canvas.remove(obj);
		}
	});
	canvas.renderAll();
};

const onMouseWheel = (opt: fabric.IEvent<WheelEvent>) => {
	if (mode === "draw") return;
	const { e } = opt;
	zoomDelta(canvas, e.deltaY, e.offsetX, e.offsetY);
	e.preventDefault();
	e.stopPropagation();
};

const zoomDelta = (canvas: fabric.Canvas, delta: number, x: number, y: number) => {
	let zoom = canvas.getZoom();
	zoom *= 0.999 ** delta;
	zoom = Math.min(zoom, maxZoom.value);
	zoom = Math.max(zoom, minZoom.value);
	const point = new fabric.Point(x, y);
	canvas.zoomToPoint(point, zoom);
};

const center = () => {
	initZoom();
	const T = canvas.viewportTransform;
	if (T) {
		T[4] = (canvas.width - img.width * canvas.getZoom()) / 2;
		T[5] = (canvas.height - img.height * canvas.getZoom()) / 2;
		canvas.requestRenderAll();
	}
};

const getClientPosition = (e: MouseEvent | TouchEvent) => {
	const positionSource = "touches" in e ? e.touches[0] : e;
	const { clientX, clientY } = positionSource;
	return { clientX, clientY };
};

const onMouseDown = (opt: fabric.IEvent<MouseEvent>) => {
	const { e } = opt;
	if (mode === "draw") {
		console.log(lineWidth.value);
		isDrawing = true;
		const pointer = canvas.getPointer(e);
		const points = [pointer.x, pointer.y, pointer.x, pointer.y];
		const line = new fabric.Line(points, {
			strokeWidth: 4900, // Utiliza la variable lineWidth aquí
			fill: "red",
			stroke: "red",
			originX: "center",
			originY: "center",
			selectable: false,
			evented: false, // Disable events on the drawing objects
		});
		canvas.add(line);
		return;
	}
	isDragging = true;
	const { clientX, clientY } = getClientPosition(e);
	lastPosX = clientX;
	lastPosY = clientY;
	canvas.selection = false;
	canvas.discardActiveObject();
};

const onMouseMove = (opt: fabric.IEvent<MouseEvent>) => {
	if (mode === "draw") {
		if (!isDrawing) return;
		const pointer = canvas.getPointer(opt.e);
		const activeObject = canvas.getObjects().pop();
		if (activeObject && activeObject.type === "line") {
			const points = activeObject.get("points") as [number, number, number, number];
			points[2] = pointer.x;
			points[3] = pointer.y;
			activeObject.set({ points });
			canvas.renderAll();
		}
		return;
	}
	if (!isDragging) {
		return;
	}
	const { e } = opt;
	const T = canvas.viewportTransform as fabric.Point;
	const { clientX, clientY } = getClientPosition(e);
	T[4] += clientX - lastPosX;
	T[5] += clientY - lastPosY;
	canvas.requestRenderAll();
	lastPosX = clientX;
	lastPosY = clientY;
};

const onMouseUp = (opt: fabric.IEvent<MouseEvent>) => {
	if (mode === "draw") {
		isDrawing = false;
		return;
	}
	isDragging = false;
	canvas.selection = true;
};

const initZoom = () => {
	const widthRatio = canvas.width / img.width;
	const heightRatio = canvas.height / img.height;
	const zoom = Math.min(widthRatio, heightRatio);
	canvas.setZoom(zoom);
};

onMounted(() => {
	if (htmlCanvas.value) {
		canvas = new fabric.Canvas(htmlCanvas.value);
		canvas.on("mouse:wheel", onMouseWheel);
		canvas.on("mouse:down", onMouseDown);
		canvas.on("mouse:move", onMouseMove);
		canvas.on("mouse:up", onMouseUp);

		fabric.Image.fromURL(props.imageUrl, (_img) => {
			img = _img;
			img.selectable = false;
			img.evented = false;
			canvas.add(img);

			// Calculate maxWidth as 90% of the viewport width and set maxHeight
			const maxWidth = window.innerWidth * 0.9;
			const maxHeight = window.innerHeight * 0.7;

			const aspectRatio = img.width / img.height;

			if (aspectRatio >= 1) {
				// Landscape or square
				if (img.width > maxWidth) {
					htmlCanvas.value.width = maxWidth;
					htmlCanvas.value.height = maxWidth / aspectRatio;
				} else {
					htmlCanvas.value.width = img.width;
					htmlCanvas.value.height = img.height;
				}
			} else {
				// Portrait
				if (img.height > maxHeight) {
					htmlCanvas.value.height = maxHeight;
					htmlCanvas.value.width = maxHeight * aspectRatio;
				} else {
					htmlCanvas.value.width = img.width;
					htmlCanvas.value.height = img.height;
				}
			}

			// Ensure canvas dimensions do not exceed the maximum dimensions
			if (htmlCanvas.value.width > maxWidth) {
				const ratio = maxWidth / htmlCanvas.value.width;
				htmlCanvas.value.width = maxWidth;
				htmlCanvas.value.height *= ratio;
			}
			if (htmlCanvas.value.height > maxHeight) {
				const ratio = maxHeight / htmlCanvas.value.height;
				htmlCanvas.value.height = maxHeight;
				htmlCanvas.value.width *= ratio;
			}

			canvas.setWidth(htmlCanvas.value.width);
			canvas.setHeight(htmlCanvas.value.height);

			// initialize zoom
			initZoom();

			// initialize position
			const scaledImageWidth = img.width * zoom;
			const scaledImageHeight = img.height * zoom;
			const dx = (canvas.width - scaledImageWidth) / 2;
			const dy = (canvas.height - scaledImageHeight) / 2;
			const T = canvas.viewportTransform;
			if (T) {
				T[4] += dx;
				T[5] += dy;
			}

			canvas.requestRenderAll();
		});
	}
});
</script>

<template>
	<div class="flex items-end flex-col gap-3">
		<div class="flex gap-3">
			<!-- <button @click="toggleDrawMode">Toggle Draw Mode</button> -->
			<!-- <button @click="clearCanvas">Clear Canvas</button> -->
			<button @click="center">Center</button>
			<!-- <label style="margin-left: 10px">
			Line Width:
			<input type="range" v-model="lineWidth" min="1" max="100" step="0.1" />
			{{ lineWidth }}
		</label> -->
		</div>
		<canvas ref="htmlCanvas"></canvas>
	</div>
</template>

<style scoped>
button {
	width: 150px;
	font-size: 1rem;
}

canvas {
	/* border: 3px solid red; */
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(10px);
}
</style>
