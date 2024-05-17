// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	css: ["~/assets/css/main.css"],
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	plugins: ["~/plugins/analytics.ts"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
