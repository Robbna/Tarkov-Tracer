export default defineNuxtConfig({
	// NUXT
	devtools: {
		enabled: true,
	},
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	alias: {
		"@": "/<srcDir>",
	},
	plugins: ["~/plugins/disable-right-click.ts"],
	// INDEX.HTML & JS
	app: {
		head: {
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{
					hid: "description",
					name: "description",
					content:
						"Explore Escape From Tarkov with our detailed guide. Find maps, search for items, and check out the best gear tiers.",
				},
				{ name: "keywords", content: "Escape From Tarkov, guide, maps, items, tiers, best helmets, best armors" },
				{ name: "author", content: "Devsiko" },
				{ name: "robots", content: "index, follow" },
				{ name: "theme-color", content: "#0e0e0e" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
