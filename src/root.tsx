import { Route, Routes } from "react-router";
import { Landing } from "./pages/landing";
import { Snackbars } from "./components/Snackbars";
import Loading from "./components/Loading";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Presale } from "./pages/Presale";
import "./styles/scss/index.scss";
const Root = () => {
	return (
		<>
			<Snackbars />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Landing />
						</>
					}
				/>

				<Route
					path="/presale"
					element={
						<>
							<Presale />
						</>
					}
				/>

				<Route
					path="/privacy-policy"
					element={
						<>
							<Privacy />
						</>
					}
				/>

				<Route
					path="/terms-condition"
					element={
						<>
							<Terms />
						</>
					}
				/>
				<Route
					path="/terms-of-use"
					element={
						<>
							<Terms />
						</>
					}
				/>
			</Routes>
		</>
	);
};

export default Root;
