import { TarkovService } from "~/services/tarkov/TarkovService";
import type { IHeadset } from "~/services/tarkov/types/IHeadset";

export const useTier = () => {
	const bestHeadsets = ref<IHeadset[] | null>(null);

	const fetchBestHeader = () => {
		TarkovService.getBestHeadsets().then((response) => {
			bestHeadsets.value = response.headsets;
		});
	};

	return {
		bestHeadsets,
		fetchBestHeader,
	};
};
