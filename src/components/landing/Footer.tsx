import { Box } from "../MUI/MuiBox";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "../../styles/scss/certifiedHistory.scss";
import img3 from "../../assets/img3.png";
import { useTranslation } from "react-i18next";
import { useTranslationProvider } from "../../providers/TranslationProvider";
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate();
	let location = useLocation();

	return (
		<>
			<Box
				sx={{
					background: "transparent",

					padding: window.innerWidth > 600 ? "8vh 0" : "2vh 1vh",
				}}
			>
				<Container>
					<Grid container spacing={2}>
						<Grid md={4} xs={12}>
							<a
								className="footer_url"
								style={{ color: "#fff" }}
								onClick={() => navigate("terms-condition")}
								target="_blank"
							>
								Terms of use
							</a>
						</Grid>
						<Grid md={4} xs={12}>
							<a
								className="footer_url"
								style={{ color: "#fff" }}
								onClick={() => navigate("terms-condition")}
								target="_blank"
							>
								Disclaimer
							</a>
						</Grid>
						<Grid md={4} xs={12}>
							<a
								className="footer_url"
								style={{ color: "#fff" }}
								onClick={() => navigate("privacy-policy")}
								target="_blank"
							>
								Privacy Policy
							</a>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};
