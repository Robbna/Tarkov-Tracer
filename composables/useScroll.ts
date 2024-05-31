export const useScroll = () => {
	const disableScroll = () => {
		if (process.client) {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
			window.onscroll = function () {
				window.scrollTo(scrollLeft, scrollTop);
			};
		}
	};

	const enableScroll = () => {
		if (process.client) {
			window.onscroll = function () {};
		}
	};

	return {
		enableScroll,
		disableScroll,
	};
};
