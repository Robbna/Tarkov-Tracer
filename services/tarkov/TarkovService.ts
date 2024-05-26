import { request, gql } from "graphql-request";
import type { IGetItemsResponse } from "./types/IItem";
import type { IGetTradersResponse } from "./types/ITrader";

export class TarkovService {
	static QUERY_ALL_ITEMS = gql`
		{
			items {
				avg24hPrice
				basePrice
				description
				height
				id
				image8xLink
				inspectImageLink
				link
				name
				normalizedName
				shortName
				weight
				wikiLink
				sellFor {
					price
					currency
					priceRUB
					vendor {
						name
						normalizedName
					}
				}
			}
		}
	`;

	static QUERY_ALL_TRADERS = gql`
		query {
			traders {
				name
				normalizedName
				imageLink
				image4xLink
				currency {
					name
					normalizedName
					shortName
				}
			}
		}
	`;

	public static async getAllItems(): Promise<IGetItemsResponse> {
		const response = await request<IGetItemsResponse>("https://api.tarkov.dev/graphql", this.QUERY_ALL_ITEMS);

		// Remove "Flea Market" vendor from sellFor array
		response.items = response.items.map((item) => {
			return {
				...item,
				sellFor: item.sellFor.filter((sell) => sell.vendor.name !== "Flea Market"),
			};
		});

		return response;
	}

	public static async getAllTraders(): Promise<IGetTradersResponse> {
		return await request("https://api.tarkov.dev/graphql", this.QUERY_ALL_TRADERS);
	}
}
