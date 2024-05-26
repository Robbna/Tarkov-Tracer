import { TarkovService } from "~/services/tarkov/TarkovService";
import type { ITrader } from "~/services/tarkov/types/ITrader";

export const useTraders = defineStore("traders", () => {
	const traders = ref<ITrader[] | null>(null);

	const fetchTraders = async () => {
		await TarkovService.getAllTraders().then((response) => {
			traders.value = response.traders;
		});
	};

	return {
		traders,
		fetchTraders,
	};
});
