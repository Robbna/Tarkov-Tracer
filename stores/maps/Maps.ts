import type { IMap } from "~/services/tarkov/types/IMap";

const MAPS_LIST: IMap[] = [
	{
		name: "Customs",
		id: "customs",
		imageUrl: "https://tarkov.dev/maps/customs-3d.jpg",
		maxZoom: 540,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Customs",
		raidDuration: 40,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Ground Zero",
		id: "ground-zero",
		imageUrl: "https://tarkov.dev/maps/ground-zero-3d.jpg",
		wiki: "https://escapefromtarkov.fandom.com/wiki/Ground_Zero",
		raidDuration: 35,
		maxZoom: 540,
		aspectRatio: {
			width: 166,
			height: 135,
		},
	},
	{
		name: "Interchange",
		id: "interchange",
		imageUrl: "https://i.redd.it/cc75d84cu9m41.jpg",
		maxZoom: 1240,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Interchange",
		raidDuration: 40,
		aspectRatio: {
			width: 8000,
			height: 4327,
		},
	},
	{
		name: "Lighthouse",
		id: "lighthouse",
		imageUrl: "https://tarkov.dev/maps/lighthouse-3d.jpg",
		maxZoom: 740,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Lighthouse",
		raidDuration: 40,
		aspectRatio: {
			width: 59,
			height: 54,
		},
	},
	{
		name: "Shoreline",
		id: "shoreline",
		imageUrl: "https://tarkov.dev/maps/shoreline-3d.jpg",
		maxZoom: 840,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Shoreline",
		raidDuration: 45,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Woods",
		id: "woods",
		imageUrl: "https://tarkov.dev/maps/woods-3d.jpg",
		maxZoom: 840,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Woods",
		raidDuration: 40,
		aspectRatio: {
			width: 480,
			height: 323,
		},
	},
	{
		name: "Factory",
		id: "factory",
		imageUrl: "https://tarkov.dev/maps/factory-3d.jpg",
		maxZoom: 540,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Factory",
		raidDuration: 20,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Reserve",
		id: "reserve",
		imageUrl: "https://tarkov.dev/maps/reserve-3d.jpg",
		maxZoom: 540,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Reserve",
		raidDuration: 40,
		aspectRatio: {
			width: 16,
			height: 9,
		},
	},
	{
		name: "Labs",
		id: "the-labs",
		imageUrl: "https://tarkov.dev/maps/labs-2d.jpg",
		maxZoom: 540,
		wiki: "https://escapefromtarkov.fandom.com/wiki/The_Lab",
		raidDuration: 35,
		aspectRatio: {
			width: 191,
			height: 99,
		},
	},
	{
		name: "Streets of Tarkov",
		id: "streets-of-tarkov",
		imageUrl: "https://tarkov.dev/maps/streets-3d.jpg",
		maxZoom: 1040,
		wiki: "https://escapefromtarkov.fandom.com/wiki/Streets_of_Tarkov",
		raidDuration: 50,
		aspectRatio: {
			width: 7605,
			height: 4841,
		},
	},
];
export const useMaps = defineStore("maps", () => {
	const maps = ref<IMap[]>(MAPS_LIST);

	const fetchMaps = () => {
		maps.value = [...MAPS_LIST].sort((a, b) => a.name.localeCompare(b.name));
	};

	return {
		maps,
		fetchMaps,
	};
});
