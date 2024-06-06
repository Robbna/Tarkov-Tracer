import { TarkovService } from "~/services/tarkov/TarkovService";
import type { ITrader } from "~/services/tarkov/types/ITrader";

export const useTraders = defineStore("traders", () => {
	const traders = ref<ITrader[] | null>(null);
	const fetchTraders = () => {
		TarkovService.getAllTraders().then((response) => {
			traders.value = response.traders.map((trader) => {
				if (trader.normalizedName === "btr-driver") {
					trader.normalizedName = "flea-market";
					trader.image4xLink = "/images/flea.svg";
				}
				return trader;
			});
		});
	};

	return {
		traders,
		fetchTraders,
	};
});
