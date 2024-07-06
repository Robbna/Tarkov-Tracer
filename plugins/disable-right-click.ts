export default defineNuxtPlugin((nuxtApp) => {
	if (process.client) {
		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});
	}
});
