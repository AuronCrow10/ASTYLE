import { Box } from "../MUI/MuiBox";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../../styles/scss/certifiedHistory.scss";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate();

	const redirect = (url: string) => {
		window.location.href = url;
	}
	return (
		<Box
			sx={{
				background: "#111",
				padding: window.innerWidth > 600 ? "8vh 0" : "2vh 1vh",
			}}
		>
			<Container>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						md={6}
						sx={{
							display: "flex",
							flexDirection: "column",
							alingItems: { xs: "center", md: "flex-start" },
						}}
					>
						<Typography
							variant="h6"
							sx={{
								color: "#fff",
								textAlign: { xs: "center", md: "unset" },
								fontSize: "24px",
								fontWeight: "bold",
							}}
						>
							Social
						</Typography>
						<Grid
							container
							spacing={2}
							sx={{
								marginTop: "1vh",
								justifyContent: {
									xs: "center",
									md: "flex-start",
								},
							}}
						>
							<Grid item>
								<IconButton
									onClick={() =>
										window.open(
											"https://t.me/astyle_official",
											"_blank")}

									sx={{ color: "#fff" }}
								>
									<TelegramIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									onClick={() =>
										window.open(
											"https://www.facebook.com/AStyleFashion",
											"_blank"
										)
									}
									sx={{ color: "#fff" }}
								>
									<FacebookIcon />
								</IconButton>
							</Grid>

							<Grid item>
								<IconButton
									onClick={() =>
										window.open(
											"https://x.com/ASTYLE_official",
											"_blank"
										)
									}
									sx={{ color: "#fff" }}
								>
									<TwitterIcon />
								</IconButton>
							</Grid>

							<Grid item>
								<IconButton
									onClick={() =>
										window.open(
											"https://www.instagram.com/astyle__official",
											"_blank"
										)
									}
									sx={{ color: "#fff" }}
								>
									<InstagramIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						md={3}
						sx={{
							display: "flex",
							flexDirection: "column",
							alingItems: { xs: "center", md: "flex-start" },
						}}
					>
						<Typography
							variant="h6"
							sx={{
								color: "#fff",
								textAlign: { xs: "center", md: "unset" },
								fontSize: "24px",
								fontWeight: "bold",

							}}
						>
							Contact
						</Typography>
						<Grid
							container
							spacing={2}
							flexDirection="column"
							sx={{
								marginTop: "1vh",
								justifyContent: {
									xs: "center",
									md: "flex-start",
								},
							}}
						>
							<Grid item>
								<Typography
									variant="body1"
									sx={{
										textAlign: {
											xs: "center",
											md: "unset",
										},
									}}
								>
									<a
										href="mailto:info@a-style.it"
										style={{
											color: "#fff",
											textDecoration: "none",
										}}
									>
										info@a-style.it
									</a>
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									variant="body1"
									sx={{
										textAlign: {
											xs: "center",
											md: "unset",
										},
									}}
								>
									<a
										href="mailto:product@a-style.it"
										style={{
											color: "#fff",
											textDecoration: "none",
										}}
									>
										product@a-style.it
									</a>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						md={3}
						sx={{
							display: "flex",
							flexDirection: "column",
							alingItems: { xs: "center", md: "flex-start" },
						}}
					>
						<Typography
							variant="h6"
							sx={{
								color: "#fff",
								fontSize: "24px",
								fontWeight: "bold",
								textAlign: { xs: "center", md: "unset" },

							}}
						>
							Policy
						</Typography>
						<Grid
							container
							spacing={2}
							flexDirection="column"
							sx={{
								marginTop: "1vh",
								justifyContent: {
									xs: "center",
									md: "flex-start",
								},
							}}
						>
							<Grid item>
								<Typography
									variant="body1"
									sx={{
										textAlign: {
											xs: "center",
											md: "unset",
										},
									}}
								>
									<a
										style={{ color: "#fff" }}
										onClick={() => navigate("terms-condition")}
										target="_blank"
									>
										Terms of use
									</a>
								</Typography>
							</Grid>
{
	/* 
							<Grid item>
								<Typography
									variant="body1"
									sx={{
										textAlign: {
											xs: "center",
											md: "unset",
										},
									}}
								>
									<a
										style={{ color: "#fff" }}
										onClick={() => navigate("disclaimer")}
										target="_blank"
									>
										Disclaimer
									</a>

								</Typography>
							</Grid>
*/
}

							<Grid item>
								<Typography
									variant="body1"
									sx={{
										textAlign: {
											xs: "center",
											md: "unset",
										},
									}}
								>
									<a
										style={{ color: "#fff" }}
										onClick={() => navigate("privacy-policy")}
										target="_blank"
									>
										Privacy Policy
									</a>



								</Typography>
							</Grid>


						</Grid>
					</Grid>

				</Grid>


			</Container>
		</Box>
	);
};
