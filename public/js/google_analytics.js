console.log("⌛ Loading google analytics");

try {
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "G-YTNP4RYFY1");
	console.log("✅ Google analytics loaded");
} catch (error) {
	console.error("❌ Error loading google analytics");
	console.log(error);
}
