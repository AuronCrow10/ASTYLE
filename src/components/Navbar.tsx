import { Box } from "./MUI/MuiBox";
import { Button, Grid, Stack, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChangeLanguage } from "./changeLanguage";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
	const [bgColorNav, setbgColorNav] = useState("#ffcd00");

	function redirect(url: string) {
		window.location.href = url;
	}
	const navigate = useNavigate();
	const { t } = useTranslation();
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 10 && window.innerWidth > 600) {
				setbgColorNav("#ffcd00");
			} else {
				setbgColorNav("#ffcd00");
			}
		});
	}, []);

	return (
		<Box
			id="navbar"
			sx={{
				backgroundColor: bgColorNav,
				transitionDuration: "0.5s",
				padding: "24px 0",
				position: window.innerWidth > 600 ? "fixed" : "absolute",
				top: "0",
				width: "100%",
				zIndex: "999",
			}}
		>
			<Grid container>
				<Grid md={1}></Grid>
				<Grid md={6} xs={8}>
					<img
						src={logo}
						style={{
							width: window.innerWidth > 600 ? "120px" : "120px",
							margin:
								window.innerWidth > 600 ? "auto" : "auto 20px",
						}}
					></img>
				</Grid>
				<Grid md={4}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							marginTop: "4px",
							display: window.innerWidth < 700 ? "none" : "auto",
						}}
					>
						<Typography
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "500",
								padding: "4px 30px",
								fontSize: "16px",
							}}
						>
							Become a Trader
						</Typography>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								fontFamily: "Work Sans !important",
								textTransform: "none",
								margin: "24px 0 0 0",
								fontWeight: "500",
								padding: "4px 40px",
								borderRadius: "100px",
								fontSize: "16px",
							}}
							onClick={() => {
								redirect("/home");
							}}
						>
							{t("header.downloadNow")}
						</Button>
						<ChangeLanguage />
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};
