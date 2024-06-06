export interface IMap {
	name: string;
	id: string;
	imageUrl: string;
	maxZoom: number;
	raidDuration: number;
	wiki: string;
	aspectRatio: {
		width: number;
		height: number;
	};
}
