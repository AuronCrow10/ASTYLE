import React from "react";
import { Box } from "../MUI/MuiBox";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ExampleCard = () => {
	const { t } = useTranslation();

	return (
		<Box
			sx={{
				background: "transparent",
				padding: window.innerWidth > 600 ? "12vh 0" : "8vh 16px",
			}}
		>
			<Typography
				variant="h3"
				align="center"
				id="trader"
				sx={{
					fontFamily: "Work Sans !important",
					fontWeight: "600",
					fontSize: window.innerWidth < 600 ? "32px" : "50px",
				}}
			>
				{t("video.title")}

			</Typography>
			<Typography
				mt={2}
				variant="h6"
				align="center"
				sx={{
					fontFamily: "Work Sans !important",
					fontWeight: "300",
					fontSize: window.innerWidth < 600 ? "16px" : "18px",
				}}
			>
				{t("video.subtitle")}
			</Typography>
			<video
				autoPlay
				loop
				muted
				controls
				poster="http://localhost:3000/bgvideo.png"
				className="background-video"
			>
				<source
					src="http://lowcalhost:3000/video.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={0}
			></Stack>
		</Box>
	);
};

export default ExampleCard;
