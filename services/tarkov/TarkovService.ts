import { request, gql } from "graphql-request";
import type { IGetItemsResponse } from "./types/responses/IGetItemResponse";
import type { IGetTradersResponse } from "./types/responses/IGetTradersResponse";

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

	static QUERY_ALL_MAPS = gql`
		query {
			maps {
				id
				name
				normalizedName
				wiki
				raidDuration
				enemies
				bosses {
					boss {
						id
						name
						normalizedName
					}
				}
			}
		}
	`;

	public static async getAllItems(): Promise<IGetItemsResponse> {
		return await request("https://api.tarkov.dev/graphql", this.QUERY_ALL_ITEMS);
	}

	public static async getAllTraders(): Promise<IGetTradersResponse> {
		return await request("https://api.tarkov.dev/graphql", this.QUERY_ALL_TRADERS);
	}
}
