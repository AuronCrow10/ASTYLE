import { Avatar, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import result1 from "../assets/sara.jpeg";
import result2 from "../assets/roby.jpeg";
import result3 from "../assets/pipspot.jpeg";
import result4 from "../assets/profitfarmer.jpeg";
import result5 from "../assets/equityflow.jpeg";
import result6 from "../assets/forexcraft.jpeg";
import result7 from "../assets/jao.jpeg";
import { blue, brown, green, orange } from "@mui/material/colors";
import { Box } from "./MUI/MuiBox";

export const Results = () => {
	function redirect(url: string) {
		window.location.href = url;
	}
	const navigate = useNavigate();

	return (
		<Marquee
			autoFill
			gradient
			gradientColor="#121721"
			gradientWidth={50}
			style={{
				margin: "5vh 0 0 0",
			}}
		>
			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: green[200] }}>SA</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							Sara98
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+8502 </span> /{" "}
							<span style={{ color: "red" }}> -3326 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result1}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>
			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: green[800] }}>RO</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							Roby1988
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+2830 </span> /{" "}
							<span style={{ color: "red" }}> -273 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result2}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>
			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: blue[200] }}>PS</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							PipsSpot
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+4348 </span> /{" "}
							<span style={{ color: "red" }}> -1738 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result3}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>
			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: green[100] }}>PF</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							ProfitFarmer
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+5300 </span> /{" "}
							<span style={{ color: "red" }}> -1300 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result4}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>

			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: brown[200] }}>EF</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							EquityFlow
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+3793 </span> /{" "}
							<span style={{ color: "red" }}> -1577 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result5}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>

			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: orange[200] }}>FC</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							ForexCraft
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+2964 </span> /{" "}
							<span style={{ color: "red" }}> -1135 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result6}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>

			<Box className="card cardm">
				<Stack direction="row" spacing={2}>
					<Avatar sx={{ bgcolor: blue[200] }}>JT</Avatar>
					<Stack>
						<Typography
							className="badge"
							sx={{
								fontWeight: "800",
								fontSize: "18px",
								fontFamily: "Work Sans !important",
							}}
						>
							Jao Trading
						</Typography>
						<div
							className="textCard"
							style={{
								fontFamily: "Work Sans !important",
								fontWeight: "600",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "green" }}>+2004 </span> /{" "}
							<span style={{ color: "red" }}> -156 </span>
						</div>
					</Stack>
				</Stack>
				<img
					src={result7}
					style={{
						width: "100%",
						margin: "10px 0 0 0",
					}}
				></img>
			</Box>
		</Marquee>
	);
};
