import { Box } from "../MUI/MuiBox";
import { Button, Grid, Typography, Container, Card } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "../../styles/scss/certifiedHistory.scss";
import img3 from "../../assets/img3.png";
import { useTranslation } from "react-i18next";
import { useTranslationProvider } from "../../providers/TranslationProvider";

export const TokenSection = () => {
	const { t } = useTranslation();
	const { language } = useTranslationProvider();
	const elementRef = useRef(null);
	function redirect(url: string) {
		window.location.href = url;
	}

	return (
		<>
			<Box
				sx={{
					background: "transparent",
					padding: window.innerWidth > 600 ? "16vh 0" : "16vh 1vh",
				}}
			>
				<Container>
					<Box className="card">
						<Grid container spacing={0}>
							<Grid
								md={6}
								xs={12}
								sx={{
									padding: "20px",
								}}
							>
								dadasd
							</Grid>
							<Grid
								md={6}
								xs={12}
								sx={{
									padding: "20px",
								}}
							>
								dadasd
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
};
