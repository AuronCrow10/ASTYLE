import { Box } from "../MUI/MuiBox";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import "../../styles/scss/certifiedHistory.scss";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
	const navigate = useNavigate();

	const redirect = (url:string) => {
		window.location.href = url;
	}
	return (
		<Box
			sx={{
				background: "transparent",
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
										(window.location.href =
											"mailto:support@example.com")
									}
									sx={{ color: "#fff" }}
								>
									<TelegramIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									onClick={() =>
										window.open(
											"https://facebook.com",
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
											"https://instagram.com",
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
										href="mailto:support1@example.com"
										style={{
											color: "#fff",
											textDecoration: "none",
										}}
									>
										support1@example.com
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
										href="mailto:support2@example.com"
										style={{
											color: "#fff",
											textDecoration: "none",
										}}
									>
										support2@example.com
									</a>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container spacing={2} sx={{ marginTop: "16px" }}>
					<Grid item md={4} xs={12}>
						<a
							className="footer_url"
							style={{ color: "#fff" }}
							onClick={() => navigate("terms-condition")}
							target="_blank"
						>
							Terms of use
						</a>
					</Grid>
					<Grid item md={4} xs={12}>
						<a
							className="footer_url"
							style={{ color: "#fff" }}
							onClick={() => navigate("disclaimer")}
							target="_blank"
						>
							Disclaimer
						</a>
					</Grid>
					<Grid item md={4} xs={12}>
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
	);
};
