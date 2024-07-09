import { AxiosResponse } from "axios";

export type NetworkContextData = {
	makePost: <T = any>(
		url: string,
		body: any,
		tokenId?: string
	) => Promise<AxiosResponse<T, any>>;
	makeGet: <T = any>(
		path: string,
		tokenId?: string
	) => Promise<AxiosResponse<T, any>>;
};
