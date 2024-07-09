import { Box } from "../MUI/MuiBox";
import { Typography } from "@mui/material";
import { TraderType } from "../../types/Trader/Trader";

const TraderInfo = ({ trader }: { trader: TraderType }) => {
	return (
		<>
			<Box
				flex="1"
				minWidth="200px"
				maxWidth="400px"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: "16px",
					borderRadius: "8px",
					backgroundColor: "#ffcd00",
				}}
			>
				<Typography variant="h4">{trader.username}</Typography>
				<Typography variant="body1">
					{trader.followers} followers
				</Typography>
			</Box>
		</>
	);
};

export default TraderInfo;
