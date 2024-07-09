import { Box } from "../MUI/MuiBox";
import { Typography } from "@mui/material";

const CreditToBePaid = () => {
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
				<Typography variant="h4">Portfolio</Typography>
			</Box>
		</>
	);
};

export default CreditToBePaid;
