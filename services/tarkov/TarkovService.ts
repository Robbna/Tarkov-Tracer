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
		return await request<IGetItemsResponse>(
			"https://api.tarkov.dev/graphql",
			this.QUERY_ALL_ITEMS,
		);
	}
}
