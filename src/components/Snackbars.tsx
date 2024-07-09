import {
	Snackbar,
	Alert,
	AlertTitle,
	CircularProgress,
	Typography,
} from "@mui/material";
import { useSnackbar } from "../providers/SnackbarProvider";
import "../styles/Snackbar.css";
export const Snackbars = () => {
	const {
		snackbarTitle,
		snackbarMessage,
		snackbarSeverity,
		snackbarOpen,
		closeSnackbar,
		isLoading,
	} = useSnackbar();

	return (
		<>
			<Snackbar
				open={isLoading}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<div className="snackbar-loading">
					<Typography
						variant="h4"
						fontSize="16px !important"
						fontWeight={400}
					>
						Caricamento
					</Typography>
					<CircularProgress size={40} color="secondary" />
				</div>
			</Snackbar>
			<Snackbar
				open={snackbarOpen}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				autoHideDuration={5000}
				onClose={() =>
					snackbarSeverity === "success" ? closeSnackbar() : null
				}
			>
				<Alert
					onClose={() => closeSnackbar()}
					variant="filled"
					severity={snackbarSeverity}
					sx={{
						width: "100%",
						whiteSpace: "pre-wrap",
						maxWidth: "60vw",
					}}
				>
					<AlertTitle>
						<b>{snackbarTitle}</b>
					</AlertTitle>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};
