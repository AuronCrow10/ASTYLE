import React, { useEffect, useState } from "react";
import { Box } from "../MUI/MuiBox";
import { Stack, Typography, Avatar, Rating } from "@mui/material"; // Import necessary MUI components
import { green } from "@mui/material/colors";

interface ReviewCardProps {
	feedbackimg: string;
	feedback: string;
	author: string;
	rating: number;
	avatarName: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
	feedbackimg,
	feedback,
	author,
	rating,
	avatarName,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	useEffect(() => {
		console.log(isExpanded);
	}, [isExpanded]);
	return (
		<Box
			className="card cardmm"
			sx={{
				transition: "all 1s ease-out",
				maxHeight: isExpanded ? "unset" : "400px",
				overflow: isExpanded ? "unset" : "hidden",
			}}
		>
			<Stack spacing={2}>
				<img
					src={feedbackimg}
					style={{
						width: "100%",
						borderRadius: "12px",
						boxShadow: "0px 6px 14px -4px #000",
					}}
				/>
				<Typography
					mt={2}
					variant="h6"
					align="left"
					sx={{
						fontFamily: "Work Sans !important",
						fontWeight: "300",
						fontSize: window.innerWidth < 600 ? "14px" : "16px",

						cursor: "pointer",
					}}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? feedback : `${feedback.slice(0, 50)}...`}
				</Typography>
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: green[200] }} src="../1.jpeg">
						{avatarName}
					</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							{author}
						</Typography>
						<Rating
							name="half-rating"
							defaultValue={rating}
							readOnly
							sx={{
								fontSize: "16px",
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ReviewCard;
