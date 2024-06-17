<script setup lang="ts">
// @ts-nocheck
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
const spacePressed = ref(false);
const mode = ref<"pan" | "draw">("pan");
const lineWidth = ref<string>("20"); // Default line width
const colorHEX = ref<string>("ffffff");
let currentPath: fabric.Path | null = null;

const maxZoom = computed(() => props.maxZoom);
const minZoom = computed(() => props.minZoom);

// Toggle between pan and draw modes
// const toggleDrawMode = () => {
// 	mode.value = mode.value === "pan" ? "draw" : "pan";
// 	canvas.isDrawingMode = mode.value === "draw";
// 	canvas.selection = false;
// };

const clamp = (number, min, max) => {
	return Math.max(min, Math.min(number, max));
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

// const updateLineWidths = () => {
// 	canvas.getObjects().forEach((obj) => {
// 		if (obj instanceof fabric.Path) {
// 			obj.set({ strokeWidth: parseInt(lineWidth.value, 10) });
// 		}
// 	});
// 	canvas.renderAll();
// };

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
	if (mode.value !== "draw") {
		isDragging = true;
		const { clientX, clientY } = getClientPosition(e);
		lastPosX = clientX;
		lastPosY = clientY;
		canvas.selection = false;
		canvas.discardActiveObject();
	}
};

const onMouseMove = (opt: fabric.IEvent<MouseEvent>) => {
	if (isDragging && spacePressed.value) {
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

// Handle spacebar keydown and keyup
const onKeyDown = (e: KeyboardEvent) => {
	if (e.code === "Space") {
		spacePressed.value = true;
		canvas.isDrawingMode = false;
	}
};

const onKeyUp = (e: KeyboardEvent) => {
	if (e.code === "Space") {
		spacePressed.value = false;
		// canvas.isDrawingMode = mode.value === "draw";
		canvas.isDrawingMode = true;
	}
};

// Initialize the canvas and load the image
const initializeCanvas = () => {
	canvas = new fabric.Canvas(htmlCanvas.value!);
	canvas.isDrawingMode = true;
	// canvas.freeDrawingBrush.color = "#6466f1";
	// canvas.freeDrawingBrush.width = parseInt(lineWidth.value, 10);
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

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	// Watch lineWidth and update currentPath strokeWidth in real-time
	watchEffect(() => {
		canvas.freeDrawingBrush.width = parseInt(lineWidth.value, 10);
		canvas.freeDrawingBrush.color = `#${colorHEX.value}`;
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
	const maxWidth = window.innerWidth * 0.7;
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
	<div class="flex relative gap-4">
		<div class="flex flex-col gap-2 justify-between">
			<div class="flex flex-col w-full gap-2 items-center justify-center">
				<h1 class="text-xl">Press <span :class="['space', { pressed: spacePressed }]">SPACE</span> to move!</h1>
				<ColorPicker v-model="colorHEX" inputId="cp-hex" inline format="hex" />
				<p>
					Line width: <span class="line-size-label">{{ lineWidth }}px</span>
				</p>
				<div class="flex flex-col items-center gap-7 w-full py-3">
					<input class="w-full" type="range" v-model="lineWidth" placeholder="Line width" min="10" max="100" />
					<span
						class="line-size-preview"
						:style="{
							width: `${clamp(parseInt(lineWidth, 10) / 2, 1, 100)}px`,
							height: `${clamp(parseInt(lineWidth, 10) / 2, 1, 100)}px`,
							backgroundColor: `#${colorHEX}`,
						}"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-3">
				<button class="flex items-center justify-center gap-3" @click="centerCanvas">
					<i class="fa-solid fa-compass text-blue-300"></i>
					<span>Center</span>
				</button>
				<button @click="clearCanvas" class="bg-red-6 flex items-center justify-center gap-3">
					<i class="fa-solid fa-trash-can text-red-600"></i>
					<span>Clear</span>
				</button>
			</div>
		</div>
		<canvas ref="htmlCanvas" />
	</div>
</template>

<style scoped>
button {
	font-size: 1.3rem;
	/* background-color: rgb(78, 79, 80); */
	border: none;
	padding: 0.49rem;

	&:hover {
		background-color: rgb(21, 52, 63);
		cursor: pointer;
	}
}

.space {
	color: rgb(250, 133, 133);
	text-shadow: 0 0 5px red;
	font-size: 1.5rem;

	&.pressed {
		color: rgb(119, 196, 125);
		text-shadow: 0 0 5px green;
	}
}

.button-center {
}

.line-size-preview {
	border-radius: 50%;
}

.line-size-label {
	font-size: 1.4rem;
}

.mode-type {
	font-weight: bolder;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

canvas {
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(10px);
}

input[type="range"] {
	height: 2px;
	appearance: none;
	background: #f1f1f1;
}

input[type="range"]::-webkit-slider-runnable-track {
	width: 100%;
	cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
	height: 30px;
	width: 10px;
	background: var(--primary);
	box-shadow: 0 0 3px var(--bg-primary);
	cursor: pointer;
	appearance: none;
}
</style>
