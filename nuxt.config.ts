// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device", "nuxt-gtag"],
	css: ["~/assets/css/main.css"],
	// TAILWIND CSS
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	// GOOGLE ANALYTICS
	gtag: {
		id: "G-YTNP4RYFY1",
	},
});
