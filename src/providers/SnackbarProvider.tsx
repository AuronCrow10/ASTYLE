import { createContext, useContext, useState } from "react";
import {
	SnackbarContextType,
	SeverityType,
} from "../types/providers/SnackbarProvider";

const SnackbarContext = createContext<SnackbarContextType>(
	{} as SnackbarContextType
);

export const SnackbarProvider = ({
	children,
}: {
	children: any;
}): JSX.Element => {
	const [snackbarTitle, setSnackbarTitle] = useState("");
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] =
		useState<SeverityType>("info");
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const openLoadingSnackbar = () => {
		setIsLoading(true);
	};
	const closeLoadingSnackbar = () => {
		setIsLoading(false);
	};

	const openSnackbar = (
		title: string,
		message: string,
		severity: SeverityType
	) => {
		setSnackbarTitle(title);
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const closeSnackbar = () => {
		setSnackbarOpen(false);
	};

	const snackbarValues = {
		snackbarTitle,
		snackbarMessage,
		snackbarSeverity,
		snackbarOpen,
		openSnackbar,
		closeSnackbar,
		openLoadingSnackbar,
		closeLoadingSnackbar,
		isLoading,
	};

	return (
		<SnackbarContext.Provider value={snackbarValues}>
			{children}
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => useContext(SnackbarContext);
