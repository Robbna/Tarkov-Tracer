export const APP_TITLE = "Tarkovpedia";

export const useHeadTitle = () => {
	/**
	 * Get the title based on the route.
	 * @param route Current route name
	 * @returns Title based on the route. e.g. "Home | Tarkovpedia"
	 */
	const getTitleBasedOnRoute = (route: string) => {
		return `${route} | ${APP_TITLE}`;
	};

	return {
		getTitleBasedOnRoute,
	};
};
