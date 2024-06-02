export interface IItem {
	id: string;
	name: string;
	shortName: string;
	normalizedName: string;
	description: null | string;
	basePrice: number;
	weight: number;
	height: number;
	image8xLink: string;
	inspectImageLink: string;
	avg24hPrice: null | number;
	link: string;
	wikiLink: string;
	sellFor: {
		price: number;
		currency: string;
		priceRUB: number;
		vendor: {
			name: string;
			normalizedName: string;
		};
	}[];
}

export interface ISellFor {
	price: number;
	currency: string;
	priceRUB: number;
	vendor: IVendor;
}

export interface IVendor {
	name: string;
	normalizedName: string;
}
