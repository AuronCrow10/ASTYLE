import { i18n } from "i18next";

export type TranslationProviderType = {
	language: string;
	changeLanguage: (lang: any) => void;
	i18n: i18n;
};
