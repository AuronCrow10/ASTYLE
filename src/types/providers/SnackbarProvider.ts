export type SeverityType = "success" | "error" | "info" | "warning";

export type SnackbarContextType = {
	snackbarTitle: string;
	snackbarMessage: string;
	snackbarSeverity: SeverityType;
	snackbarOpen: boolean;
	openSnackbar: (
		title: string,
		message: string,
		severity: SeverityType
	) => void;
	closeSnackbar: () => void;
	openLoadingSnackbar: () => void;
	closeLoadingSnackbar: () => void;
	isLoading: boolean;
};
