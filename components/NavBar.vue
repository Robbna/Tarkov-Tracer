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
	{
		path: "/ammo",
		text: "Ammo",
		icon: "fa-gun",
	},
];
</script>
<template>
	<nav class="navbar flex gap-2 items-center justify-center px-2">
		<router-link
			v-for="(link, index) in ROUTER_LINKS"
			:key="index"
			:to="link.path"
		>
			<span>
				<i :class="`fa-solid ${link.icon}`" />
				{{ link.text }}
			</span>
		</router-link>
	</nav>
</template>

<style scoped>
.navbar {
	position: sticky;
	top: 0;
	font-size: 1.8rem;
}

a {
	color: #f1f1f1;
	text-decoration: none;
	background-color: rgba(0, 0, 0, 0.26);
	backdrop-filter: blur(6px);
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	overflow: hidden;
	padding: 3px 1.4rem;
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

a:hover {
	font-weight: bolder;
}
</style>
