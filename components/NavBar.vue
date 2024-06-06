<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { useMaps } from "~/stores/maps/Maps";

const storeMaps = useMaps();

const items = reactive<MenuItem[]>([
	{
		label: "Items",
		icon: "fa-vest",
		route: "/items",
	},
	{
		label: "Maps",
		icon: "fa-map",
		items: storeMaps.maps.map((map) => ({
			label: map.name,
			route: `/maps/${map.id}`,
		})),
	},
	{
		label: "Tiers",
		icon: "fa-ranking-star",
		route: "/tiers",
	},
	{
		label: "Tasks",
		icon: "fa-list-check",
		url: "https://tarkovtracker.io/tasks",
		target: "_blank",
	},
]);
</script>
<template>
	<nav class="navbar flex gap-2 justify-center mb-12">
		<Menubar class="w-full prime-menubar" :model="items">
			<template #item="{ item, props, hasSubmenu }">
				<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
					<a v-ripple :href="href" v-bind="props.action" @click="navigate">
						<i :class="`fa-solid ${item.icon}`" />
						<span class="ml-2">{{ item.label }}</span>
					</a>
				</router-link>
				<a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
					<i :class="`fa-solid ${item.icon}`" />
					<span class="ml-2">{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
				</a>
			</template>
		</Menubar>
		<!-- <router-link v-for="(link, index) in ROUTER_LINKS" :key="index" :to="link.path" class="link">
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
		</a> -->
	</nav>
</template>

<style scoped>
.navbar {
	position: sticky;
	top: 0;
	z-index: 100;
	font-size: 1.8rem;
}

.prime-menubar {
	border: none;
	border-radius: 0;
	background-color: rgba(0, 0, 0, 0.26);
	backdrop-filter: blur(6px);
}
</style>
