<script setup lang="ts">
const ROUTER_LINKS = [
	{
		path: "/items",
		text: "Items",
		icon: "fa-vest",
	},
	{
		path: "/maps",
		text: "Maps",
		icon: "fa-map",
	},
	// {
	// 	path: "/ammo",
	// 	text: "Ammo",
	// 	icon: "fa-gun",
	// },
	// {
	// 	path: "/tasks",
	// 	text: "Tasks",
	// 	icon: "fa-list-check",
	// },
];
</script>
<template>
	<nav class="navbar flex gap-2 items-center justify-center px-2">
		<router-link v-for="(link, index) in ROUTER_LINKS" :key="index" :to="link.path" class="link">
			<span>
				<i :class="`fa-solid ${link.icon}`" />
				{{ link.text }}
			</span>
		</router-link>
		<a href="https://tarkovtracker.io/tasks" target="_blank" class="link">
			<span>
				<i class="fa-solid fa-list-check" />
				Tasks
			</span>
		</a>
	</nav>
</template>

<style scoped>
.navbar {
	position: sticky;
	top: 0;
	z-index: 100;
	font-size: 1.8rem;
}

.link {
	color: #f1f1f1;
	text-decoration: none;
	background-color: rgba(0, 0, 0, 0.26);
	backdrop-filter: blur(6px);
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	overflow: hidden;
	padding: 3px 1.4rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-items: center;
	transition: all 0.1s;

	&:hover {
		background-color: rgb(231, 232, 235);
		color: rgb(42, 47, 63);
	}

	& span {
		display: block;
		/* transform: skew(-45deg); */
	}
}

.link:hover {
	font-weight: bolder;
}

.span {
	display: block;
	height: 100%;
}
</style>
