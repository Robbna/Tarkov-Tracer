<script setup lang="ts">

const props = defineProps<{
	show: boolean;
}>();

</script>

<template>
	<div v-if="show" class="base-spinner">
		<span class="loader"></span>
	</div>
</template>


<style scoped>
.base-spinner {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.369);
	backdrop-filter: blur(3px);
}


.loader {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	display: inline-block;
	border-top: 3px solid #f1f1f1;
	border-right: 3px solid transparent;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>