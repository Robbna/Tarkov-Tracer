import { request, gql } from "graphql-request";
import type { IGetItemsResponse } from "./types";

export class TarkovService {
	static QUERY_ALL_ITEMS = gql`
		{
			items {
				id
				name
				shortName
				normalizedName
				description
				basePrice
				weight
				height
				image8xLink
				inspectImageLink
				avg24hPrice
				link
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
}
