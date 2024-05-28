// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxtjs/device"],
	css: ["~/assets/css/main.css"],
	app: {
		head: {
			script: [
				{
					innerHTML: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
					
						gtag('config', 'G-YTNP4RYFY1');
					`,
				},
				{
					src: "https://www.googletagmanager.com/gtag/js?id=G-YTNP4RYFY1",
					async: true,
				},
			],
		},
	},
	// TAILWIND CSS
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
