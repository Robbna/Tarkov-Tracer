import { TarkovService } from "~/services/tarkov/TarkovService";
import type { IItem } from "~/services/tarkov/types/IItem";

export const useItems = defineStore("items", () => {
	const items = ref<IItem[] | null>(null);

	const fetchItems = async () => {
		await TarkovService.getAllItems().then((response) => {
			items.value = response.items.map((item: IItem) => {
				item.sellFor = item.sellFor.sort((a, b) => b.priceRUB - a.priceRUB);
				return item;
			});
		});
	};

	return {
		items,
		fetchItems,
	};
});
