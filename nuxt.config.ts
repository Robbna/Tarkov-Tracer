// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	runtimeConfig: {
		public: {
			gtagId: "G-YTNP4RYFY1",
		},
	},
	plugins: [
		"~/plugins/gtag.client.js",
	],
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	css: ["~/assets/css/main.css"],
	// TAILWIND CSS
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
