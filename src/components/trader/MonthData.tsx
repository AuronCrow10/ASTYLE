import { Box } from "../MUI/MuiBox";
import { Typography } from "@mui/material";
import { MonthData as MonthDataType } from "../../types/Trader/Trader";

const MonthData = ({ data }: { data: MonthDataType }) => {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return (
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
				backgroundColor: "#131721",
			}}
		>
			<Typography variant="h6">
				{labels[(data.monthId.split("_")[1] as unknown as number) - 1]}{" "}
				{data.monthId.split("_")[0]}
			</Typography>
			<Typography variant="body1">
				Elapsed Time: {data.elapsedTime}
			</Typography>
			<Typography variant="body1">
				Rate :{" "}
				{Math.floor(
					(data.elapsedTime / 1000 / 60 / 60) *
						data.hourlyRate *
						100000
				) / 100000}
				€
			</Typography>

			<Typography variant="body1">Followers: {data.followers}</Typography>
			<Typography variant="body1">
				To Be Paid: {data.paid ? "Paid" : "Not Paid"}
			</Typography>
		</Box>
	);
};

export default MonthData;
