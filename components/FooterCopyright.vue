<script setup lang="ts">
const GITHUB_URL = "https://github.com/Robbna?tab=repositories";

const REPO_COMMIT_URL = "https://github.com/Robbna/TarkovTracer/commit/";

const LAST_COMMIT_ID = ref<string | null>(null);

onMounted(() => {
	fetch("https://api.github.com/repos/Robbna/tarkovtracer/commits")
		.then((response) => response.json())
		.then((data) => {
			LAST_COMMIT_ID.value = data[0].sha;
		});
});
</script>
<template>
	<footer class="flex flex-col gap-3 text-center pt-20 pb-6">
		<p class="current-date">
			Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights
			reserved.
		</p>
		<p>
			version :
			<a :href="`${REPO_COMMIT_URL}${LAST_COMMIT_ID}`">{{ LAST_COMMIT_ID?.slice(0, 7) }}</a>
		</p>
	</footer>
</template>

<style scoped>
.current-date {
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.3);
}

a {
	text-decoration: none;
	color: #9a8866;

	&:hover {
		text-decoration: underline;
	}
}
</style>
