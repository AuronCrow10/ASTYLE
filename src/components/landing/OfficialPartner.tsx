import { Box } from "../MUI/MuiBox";
import { Stack, Typography } from "@mui/material";
import logoFp from "../../assets/logofp.png";
import { useTranslation } from "react-i18next";

export const OfficialPartner = () => {
	const { t } = useTranslation();
	return (
		<>
			<Box
				sx={{
					width: "100%",
					padding: "10px",
					textAlign: "center",
					backgroundColor: "#ffcd00",
				}}
			>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						sx={{
							color: "#fff",
							opacity: "80%",
							fontSize: window.innerWidth > 600 ? "26px" : "20px",
							fontWeight: "700",
							fontFamily: "Work Sans !important",
						}}
					></Typography>
				</Stack>
			</Box>
		</>
	);
};
