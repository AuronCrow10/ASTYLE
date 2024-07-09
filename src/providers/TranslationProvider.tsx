import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "../localazation/translation.json";
import { createContext, useContext, useState } from "react";
import { TranslationProviderType } from "../types/providers/TranslationProvider";

const TranslationContext = createContext<TranslationProviderType>(
	{} as TranslationProviderType
);
export const TranslationProvider = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	const [language, setLanguage] = useState(
		window.localStorage.getItem("language") || "en"
	);

	const changeLanguage = (lang: string): void => {
		setLanguage(lang);
		window.localStorage.setItem("language", lang);
	};

	i18n.use(initReactI18next).init({
		resources,
		lng: language,
		interpolation: {
			escapeValue: false,
		},
	});

	const translationProviderData: TranslationProviderType = {
		language,
		changeLanguage,
		i18n,
	};
	// const [userLanguage, setUserLanguage] = useState(null);

	// useEffect(() => {
	// 	const getUserLocation = () => {
	// 		console.log(navigator);
	// 		if (navigator.geolocation) {
	// 			navigator.geolocation.getCurrentPosition(
	// 				(position) => {
	// 					reverseGeocode(
	// 						position.coords.latitude,
	// 						position.coords.longitude
	// 					);
	// 				},
	// 				(error) => {
	// 					console.error(error);
	// 				}
	// 			);
	// 		} else {
	// 			console.error("Geolocation is not supported by this browser.");
	// 		}
	// 	};

	// 	const reverseGeocode = (latitude: any, longitude: any) => {
	// 		console.log(latitude, longitude);
	// 		fetch(
	// 			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
	// 		)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				const countryCode = data.address.country_code.toUpperCase();
	// 				detectLanguage(countryCode);
	// 			})
	// 			.catch((error) => {
	// 				console.error(
	// 					"Error fetching reverse geocoding data:",
	// 					error
	// 				);
	// 			});
	// 	};

	// 	const detectLanguage = (countryCode: string) => {
	// 		console.log(countryCode);
	// 		fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				const languages = data.languages;
	// 				const primaryLanguage = languages[0];
	// 				setUserLanguage(primaryLanguage);
	// 			})
	// 			.catch((error) => {
	// 				console.error("Error fetching language data:", error);
	// 			});
	// 	};

	// 	getUserLocation();
	// }, []);

	return (
		<TranslationContext.Provider value={translationProviderData}>
			{children}
		</TranslationContext.Provider>
	);
};
export const useTranslationProvider = () => useContext(TranslationContext);
