// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	css: ["~/assets/css/main.css"],
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
