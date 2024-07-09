import { createContext, useContext } from "react";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { NetworkContextData } from "../types/providers/NetworkProvider";

const NetworkContext = createContext<NetworkContextData>(
	{} as NetworkContextData
);
export const NetworkProvider = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	// const baseUrl = "http://127.0.0.1:5001/A-Style-cb281/europe-west1/api/";
	const baseUrl = "https://europe-west1-A-Style-cb281.cloudfunctions.net/api/";
	const header: AxiosRequestConfig = { headers: {}, withCredentials: true };
	async function makePostCall<T = any, D = any>(
		url: string,
		body: any,
		tokenId?: string
	): Promise<AxiosResponse<T, D>> {
		if (url === undefined) {
			console.error("url param is undefined in makePost function");
		}
		if (header.headers == null) {
			return Promise.reject("the headers are undefined");
		}
		if (tokenId != null) header.headers["_token"] = tokenId;

		try {
			const result = await axios.post<T>(`${baseUrl}${url}`, body, {
				headers: header.headers,
			});
			return result;
		} catch (error) {
			const err = error as AxiosError<T, D>;

			return err.response as AxiosResponse<T, D>;
		}
	}

	async function makeGetCall<T = any>(
		path: string,
		tokenId?: string
	): Promise<AxiosResponse<T, any>> {
		if (path === undefined) {
			return Promise.reject(
				"path param is undefined in makeGet function"
			);
		}
		if (header.headers == null) {
			return Promise.reject("the headers are undefined");
		}
		if (tokenId != null) header.headers["_token"] = tokenId;

		try {
			const result = await axios.get<T>(
				`${baseUrl.concat(path)}`,
				header
			);
			return result;
		} catch (error) {
			const err = error as AxiosError<T>;

			return err.response as AxiosResponse<T>;
		}
	}

	const networkProviderData: NetworkContextData = {
		makePost: makePostCall,
		makeGet: makeGetCall,
	};

	return (
		<NetworkContext.Provider value={networkProviderData}>
			{children}
		</NetworkContext.Provider>
	);
};
export const useNetwork = () => useContext(NetworkContext);
