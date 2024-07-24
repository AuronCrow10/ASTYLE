import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslationProvider } from "../providers/TranslationProvider";
import IT from "country-flag-icons/react/3x2/IT";
import GB from "country-flag-icons/react/3x2/GB";
import ES from "country-flag-icons/react/3x2/ES";
import $ from "jquery";
import "../styles/scss/navbar.scss";
import { useLocation } from "react-router-dom";
export const ChangeLanguage = () => {
	let location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const lang = queryParams.get("lang");

	useEffect(() => {
		if (lang == null) return;
		handleChangeLanguage(lang);
	}, [lang]);

	const { language, changeLanguage } = useTranslationProvider();
	const handleChangeLanguage = (newLanguage: string) => {
		$(`.language-icon`).removeClass("active-language");
		changeLanguage(newLanguage);
		$(`.${newLanguage}`).addClass("active-language");
	};
	useEffect(() => {
		if (language == null) return;
		$(`.language-icon`).removeClass("active-language");
		$(`.${language}`).addClass("active-language");
	}, [language]);
	return (
		<>
			<Grid container className="change-language-buttons" gap={2}>
				<Grid item xs={3} id="it" className="language-icon it">
					<a
						className="flag-container"
						onClick={() => {
							handleChangeLanguage("it");
						}}
					>
						<IT title="Itlay" className="flag" />
					</a>
				</Grid>
				<Grid item xs={3} id="en" className="language-icon en">
					<a
						className="flag-container"
						style={{ marginLeft: "16px" }}
						onClick={() => {
							handleChangeLanguage("en");
						}}
					>
						<GB title="England" className="flag" />
					</a>
				</Grid>
				<Grid item xs={3} id="es" className="language-icon es">
					<a
						className="flag-container"
						style={{ marginLeft: "16px" }}
						onClick={() => {
							handleChangeLanguage("es");
						}}
					>
						<ES title="Spanish" className="flag" />
					</a>
				</Grid>

			</Grid>
		</>
	);
};
