import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag"; // Install this package: npm install react-country-flag
import "../styles/scss/languageSwitcher.scss";
import { useLocation } from "react-router-dom";
import { useTranslationProvider } from "../providers/TranslationProvider";

const languages = [
	{ source: "en", flag: "gb", value: "English" },
	{ source: "it", flag: "it", value: "Italian" },
];
const LanguageSwitcher: React.FC = () => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	let location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const lang = queryParams.get("lang");

	useEffect(() => {
		if (lang == null) return;
		handleChangeLanguage(lang);
	}, [lang]);

	const { language, changeLanguage } = useTranslationProvider();

	const handleChangeLanguage = (newLanguage: string) => {
		changeLanguage(newLanguage);
	};
	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

	// To close the dropdown when a language is selected and when you click outside of the component
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isDropdownOpen &&
				event.target instanceof Element &&
				!event.target.closest(".language-switcher")
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	const currentLanguage = languages.find((value) => {
		return value.source === language;
	})?.flag;
	console.log(currentLanguage);

	return (
		<div className="language-switcher">
			<button className="selected-language" onClick={toggleDropdown}>
				<ReactCountryFlag
					countryCode={
						currentLanguage == null ? "GB" : currentLanguage
					}
					svg
				/>
			</button>
			{isDropdownOpen && (
				<ul className="language-dropdown">
					{languages.map((lang) => (
						<li
							key={lang.value}
							onClick={() => handleChangeLanguage(lang.source)}
						>
							<ReactCountryFlag
								countryCode={lang.flag.toUpperCase()}
								svg
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LanguageSwitcher;
