export default defineNuxtConfig({
	// NUXT
	devtools: {
		enabled: true,
	},
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	alias: {
		"@": "/<srcDir>",
	},

	// INDEX.HTML & JS
	app: {
		head: {
			script: [
				{
					src: "/js/google_analytics.js",
				},
				{
					src: "https://www.googletagmanager.com/gtag/js?id=G-YTNP4RYFY1",
					defer: true,
				},
			],
		},
	},
	// CSS & TAILWIND
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
