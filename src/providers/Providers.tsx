import { ReactNode } from "react";
import { NetworkProvider } from "./NetworkProvider";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "./SnackbarProvider";
import { TranslationProvider } from "./TranslationProvider";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#000",
		},
		secondary: {
			main: "#ffcd00",
		},
		background: {
			default: "#000",
		},
		text: {
			primary: "#FFF",
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#232839",
					fontFamily: "Work Sans",

					//borderRadius: 20,
				},
			},
		},
	},
});

export const Provider = ({ children }: { children: JSX.Element }) => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<TranslationProvider>
				<SnackbarProvider>
						<NetworkProvider>
											{children}
						</NetworkProvider>
				</SnackbarProvider>
			</TranslationProvider>
		</ThemeProvider>
	);
};
