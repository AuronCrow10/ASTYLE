import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "./MUI/MuiBox";
import { Grid } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { t } from "i18next";

export default function Step() {
	return (
		<>
			<Grid
				container
				spacing={0}
				sx={{
					minHeight: "30vh",
					padding: { xs: "0 20px", md: "0 50px" },
				}}
			>
				<Grid
					md={6}
					sx={{
						backgroundColor: "#ffce04",
						borderRadius: {
							xs: "16px 16px 0 0",
							md: "16px 0 0 16px",
						},
					}}
				>
					<Box
						sx={{
							padding: { xs: "5vh 20px", md: "10vh 10vh" },
						}}
					>
						<Typography
							variant="h2"
							align="left"
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								color: "#000",
								fontSize:
									window.innerWidth < 600 ? "32px" : "28px",
							}}
						>
							{t("step1.title")}
						</Typography>
						<Typography
							mt={2}
							variant="h6"
							align="left"
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "300",
								color: "#000",
								fontSize:
									window.innerWidth < 600 ? "16px" : "16px",
							}}
						>
							<ul style={{ padding: "0 20px" }}>

								<li>{t("step1.text.1")}</li>
								<li>{t("step1.text.2")}</li>
								<li>{t("step1.text.3")}</li>

							</ul>
						</Typography>
					</Box>
				</Grid>
				<Grid
					md={6}
					sx={{
						background: "#171717cf",
						borderRadius: {
							xs: "0 0 16px 16px",
							md: "0 16px 16px 0",
						},
					}}
				>
					<Box
						sx={{
							padding: { xs: "5vh 20px", md: "10vh 10vh" },
						}}
					>
						<Typography
							variant="h2"
							align="left"
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								color: "#fff",
								fontSize:
									window.innerWidth < 600 ? "32px" : "28px",
							}}
						>
							{t("step2.title")}

						</Typography>
						<Typography
							mt={2}
							variant="h6"
							align="left"
							sx={{
								fontFamily: "Work Sans !important",
								fontWeight: "300",
								color: "#fff",
								fontSize:
									window.innerWidth < 600 ? "16px" : "16px",
							}}
						>
							<ul style={{ padding: "0 20px" }}>

								<li>{t("step2.text.1")}</li>
								<li>{t("step2.text.2")}</li>
								<li>{t("step2.text.3")}</li>

							</ul>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
