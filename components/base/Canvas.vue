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
const mode = ref<"pan" | "draw">("pan");
const lineWidth = ref<string>("20"); // Default line width
let currentPath: fabric.Path | null = null;

const maxZoom = computed(() => props.maxZoom);
const minZoom = computed(() => props.minZoom);

// Toggle between pan and draw modes
const toggleDrawMode = () => {
	mode.value = mode.value === "pan" ? "draw" : "pan";
	canvas.isDrawingMode = mode.value === "draw";
	canvas.selection = false;
};

// Clear all objects except the background image
const clearCanvas = () => {
	canvas.getObjects().forEach((obj) => {
		if (obj !== img) {
			canvas.remove(obj);
		}
	});
	canvas.renderAll();
};

// Handle zoom on mouse wheel
const onMouseWheel = (opt: fabric.IEvent<WheelEvent>) => {
	if (mode.value === "draw") return;
	const { e } = opt;
	zoomDelta(e.deltaY, e.offsetX, e.offsetY);
	e.preventDefault();
	e.stopPropagation();
};

const zoomDelta = (delta: number, x: number, y: number) => {
	let zoom = canvas.getZoom();
	zoom *= 0.999 ** delta;
	zoom = Math.min(zoom, maxZoom.value);
	zoom = Math.max(zoom, minZoom.value);
	const point = new fabric.Point(x, y);
	canvas.zoomToPoint(point, zoom);
};

const updateLineWidths = () => {
	canvas.getObjects().forEach((obj) => {
		if (obj instanceof fabric.Path) {
			obj.set({ strokeWidth: parseInt(lineWidth.value, 10) });
		}
	});
	canvas.renderAll();
};

// Center the canvas
const centerCanvas = () => {
	initZoom();
	const transform = canvas.viewportTransform;
	if (transform) {
		transform[4] = (canvas.width - img.width * canvas.getZoom()) / 2;
		transform[5] = (canvas.height - img.height * canvas.getZoom()) / 2;
		canvas.requestRenderAll();
	}
};

const getClientPosition = (e: MouseEvent | TouchEvent) => {
	const positionSource = "touches" in e ? e.touches[0] : e;
	return { clientX: positionSource.clientX, clientY: positionSource.clientY };
};

// Event handlers for drawing
const onMouseDown = (opt: fabric.IEvent<MouseEvent>) => {
	const { e } = opt;
	if (mode.value === "draw") {
		isDrawing = true;
	} else {
		isDragging = true;
		const { clientX, clientY } = getClientPosition(e);
		lastPosX = clientX;
		lastPosY = clientY;
		canvas.selection = false;
		canvas.discardActiveObject();
	}
};

const onMouseMove = (opt: fabric.IEvent<MouseEvent>) => {
	if (mode.value === "draw" && isDrawing && currentPath) {
		// const pointer = canvas.getPointer(opt.e);
		// currentPath.path.push(["L", pointer.x, pointer.y]);
		// canvas.renderAll();
		// updateLineWidths();
	} else if (isDragging) {
		const { clientX, clientY } = getClientPosition(opt.e);
		const transform = canvas.viewportTransform as fabric.Point;
		transform[4] += clientX - lastPosX;
		transform[5] += clientY - lastPosY;
		canvas.requestRenderAll();
		lastPosX = clientX;
		lastPosY = clientY;
	}
};

const onMouseUp = () => {
	if (mode.value === "draw") {
		isDrawing = false;
		currentPath = null;
		updateLineWidths();
	} else {
		isDragging = false;
		canvas.selection = true;
	}
};

// Initialize canvas zoom to fit the image
const initZoom = (): number => {
	const widthRatio = canvas.width / img.width;
	const heightRatio = canvas.height / img.height;
	const zoom = Math.min(widthRatio, heightRatio);
	canvas.setZoom(zoom);
	return zoom;
};

// Initialize the canvas and load the image
const initializeCanvas = () => {
	canvas = new fabric.Canvas(htmlCanvas.value!);
	canvas.on("mouse:wheel", onMouseWheel);
	canvas.on("mouse:down", onMouseDown);
	canvas.on("mouse:move", onMouseMove);
	canvas.on("mouse:up", onMouseUp);

	fabric.Image.fromURL(props.imageUrl, (_img) => {
		img = _img;
		img.selectable = false;
		img.evented = false;
		canvas.add(img);

		const { width, height } = calculateCanvasSize(img);
		htmlCanvas.value!.width = width;
		htmlCanvas.value!.height = height;

		canvas.setWidth(width);
		canvas.setHeight(height);

		const zoom = initZoom();
		centerImage(zoom);

		canvas.requestRenderAll();
	});

	// Watch lineWidth and update currentPath strokeWidth in real-time
	watch(lineWidth, (newVal) => {
		// if (currentPath) {
		// currentPath.set({
		// 	strokeWidth: parseInt(newVal, 10) / canvas.getZoom(),
		// });
		// updateLineWidths();
		// canvas.renderAll();
		// }
	});
};

const calculateCanvasSize = (img: fabric.Image) => {
	const maxWidth = window.innerWidth * 0.9;
	const maxHeight = window.innerHeight * 0.7;
	const aspectRatio = img.width / img.height;

	let width = img.width;
	let height = img.height;

	if (aspectRatio >= 1) {
		// Landscape or square
		if (img.width > maxWidth) {
			width = maxWidth;
			height = maxWidth / aspectRatio;
		}
	} else {
		// Portrait
		if (img.height > maxHeight) {
			height = maxHeight;
			width = maxHeight * aspectRatio;
		}
	}

	if (width > maxWidth) {
		const ratio = maxWidth / width;
		width = maxWidth;
		height *= ratio;
	}
	if (height > maxHeight) {
		const ratio = maxHeight / height;
		height = maxHeight;
		width *= ratio;
	}

	return { width, height };
};

const centerImage = (zoom: number) => {
	const scaledImageWidth = img.width * zoom;
	const scaledImageHeight = img.height * zoom;
	const dx = (canvas.width - scaledImageWidth) / 2;
	const dy = (canvas.height - scaledImageHeight) / 2;
	const transform = canvas.viewportTransform;
	if (transform) {
		transform[4] += dx;
		transform[5] += dy;
	}
};

onMounted(() => {
	if (htmlCanvas.value) {
		initializeCanvas();
	}
});
</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="flex justify-between">
			<button @click="clearCanvas">Clear Canvas</button>
			<div class="flex flex-col items-center">
				<button @click="toggleDrawMode" class="flex flex-col items-center">
					<span
						>Current mode:
						<strong class="mode-type">{{ mode === "draw" ? "DRAW" : "MOVE" }}</strong>
					</span>
					<small>{{ mode === "draw" ? "Click to move" : "Click to draw" }}</small>
				</button>
			</div>
		</div>
		<canvas ref="htmlCanvas"></canvas>
		<button @click="centerCanvas">Center</button>
	</div>
</template>

<style scoped>
button {
	font-size: 1rem;
	background-color: rgb(43, 45, 46);
	border: none;
	padding: 0.5rem;

	&:hover {
		background-color: rgb(21, 52, 63);
		cursor: pointer;
	}
}

.mode-type {
	font-weight: bolder;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

canvas {
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(10px);
}
</style>
