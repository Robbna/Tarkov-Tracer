import { TarkovService } from "~/services/tarkov/TarkovService";
import type { IItem } from "~/services/tarkov/types/IItem";

export const useItems = defineStore("items", () => {
	const items = ref<IItem[] | null>(null);
	const isLoading = ref(true);

	const fetchItems = () => {
		isLoading.value = true;
		TarkovService.getAllItems()
			.then((response) => {
				items.value = response.items.map((item: IItem) => {
					// item.sellFor = item.sellFor.filter((sell) => sell.vendor.name !== "Flea Market");
					// item.sellFor.map((sell) => {
					// 	if (sell.vendor.normalizedName === "fleamarket") {
					// 		sell.vendor.
					// 	}
					// });
					item.sellFor = item.sellFor.sort((a, b) => b.priceRUB - a.priceRUB);
					return item;
				});
			})
			.finally(() => {
				isLoading.value = false;
			});
	};

	return {
		items,
		fetchItems,
		isLoading,
	};
});
