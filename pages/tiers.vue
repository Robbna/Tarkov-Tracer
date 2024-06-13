<script setup lang="ts">
import HeadsetsTier from "~/assets/images/tiers/headsets.png";
import ArmorsTier from "~/assets/images/tiers/armors.png";
import HelmetsTier from "~/assets/images/tiers/helmets.png";

const TIERS = [
	{
		title: "Armors",
		imageUrl: ArmorsTier,
		infoBy: "Leviticus",
		basedOn: "https://www.youtube.com/watch?v=8XjqpVmM-ow",
	},
	{
		title: "Helmets",
		imageUrl: HelmetsTier,
		infoBy: "Airwingmarine ",
		basedOn: "https://www.youtube.com/watch?v=0h0mO7l4Jl8",
	},
	{
		title: "Headsets",
		imageUrl: HeadsetsTier,
		infoBy: "SheefGG",
		basedOn: "https://youtu.be/pJ93-65t_8I?t=513",
	},
];

useHead({
	title: useHeadTitle().getTitleBasedOnRoute("Tiers"),
	meta: [
		{
			hid: "description",
			name: "description",
			content: "Check out the best equipment tiers in Escape From Tarkov. Find the best helmets, armors, and more.",
		},
		{ name: "keywords", content: "Escape From Tarkov, best tiers, helmets, armors, equipment" },
	],
});
</script>
<template>
	<main class="flex flex-col justify-center items-center gap-9 p-12">
		<section v-for="(tier, index) in TIERS" :key="index" class="w-full">
			<article class="flex flex-col gap-4">
				<div>
					<h2 class="text-5xl">{{ tier.title }}</h2>
					<p>
						Tested by: <a :href="tier.basedOn" target="_blank" rel="noopener noreferrer">{{ tier.infoBy }}</a>
					</p>
				</div>
				<img :src="tier.imageUrl" />
			</article>
		</section>
	</main>
</template>

<style scoped>
img {
	width: 100%;
	min-width: 60px;
	max-width: 1200px;
	object-fit: contain;

	max-height: 900px;
}

span {
	font-weight: bold;
}
</style>
