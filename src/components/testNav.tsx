import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { Container, Link, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Box } from "./MUI/MuiBox";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
	const navigate = useNavigate();
	const theme = useTheme();
	const { t } = useTranslation();
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const links = [
		{ label: "A-STYLE", path: "/discover", element: null },
		{ label: "Whitepaper", path: "/story", element: null },
		{ label: "Roadmap", path: "/roadmap", element: null },
		{ label: "PRESALE", path: "/presale", element: null },
	];

	const renderMenuLinks = (
		<>
			<List>
				<ListItem>
					<img
						src="/Alogo.png"
						loading="lazy"
						style={{ marginTop: "-12px", marginRight: "48px" }}
						width="40px"
						height="50px"
					></img>
				</ListItem>
				{links.map((link, index) => {
					return (
						<>
							{link.element != null ? (
								<ListItem key={index}>{link.element}</ListItem>
							) : (
								<ListItem
									key={link.label}
									sx={{
										color: "#000000",
									}}
									onClick={() => {
										navigate(link.path);
										toggleDrawer();
									}}
								>
									<ListItemText
										primary={link.label}
										sx={{
											fontFamily: "Work Sans !important",
											fontWeight: "500",
											fontSize: "16px",
											color: "#000",
										}}
									/>
								</ListItem>
							)}
						</>
					);
				})}
			</List>
			<Container
				sx={{
					flex: 1,
					display: "flex",
					justifyContent: "flex-end",
					flexDirection: "column",
					paddingBottom: "16px",
				}}
			></Container>
		</>
	);

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					flexGrow: 1,
					zIndex: theme.zIndex.modal + 2,
					boxShadow: "none",
					background: { xs: "transparent", md: "transparent" },
					right: { xs: "16px", md: "0px" },
					top: "0",
				}}
			>
				<Toolbar
					sx={{
						padding: 0,
						width: "100%",
						background:
							window.innerWidth > 600 ? "#ffcd00" : "transparent",
						boxShadow:
							window.innerWidth > 600
								? "0px -1px 20px 8px #00000052"
								: "",
					}}
				>
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
							alignItems: "center",
							background: "#ffcd00",
							width: "100%",
							padding: "16px",
							borderRadius: "8px",
							gap: "16px",
						}}
					>
						{links.map((link) => {
							return (
								<>
									{link.element != null ? (
										link.element
									) : (
										<Link
											key={link.label}
											color="inherit"
											underline="hover"
											sx={{
												fontFamily:
													"Work Sans !important",
												fontWeight: "600",
												color: "#000",
												marginLeft: 4,
												fontSize: "16px",
												textTransform: "uppercase",
												cursor: "pointer",
											}}
											onClick={() => {
												navigate(link.path);
											}}
										>
											{link.label}
										</Link>
									)}
								</>
							);
						})}
						<Container
							sx={{
								width: "fit-content",
								margin: 0,
							}}
						></Container>
						<LanguageSwitcher />
					</Box>
					<Box
						sx={{
							ml: "auto",
							display: { xs: "block", md: "none" },
							zIndex: theme.zIndex.modal + 2,
						}}
					>
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							aria-label="menu"
							onClick={toggleDrawer}
							sx={{
								marginLeft: "auto",
								background:
									"linear-gradient(9deg, rgba(27,19,0,1) 0%, rgba(199,140,0,1) 42%, rgba(254,181,9,1) 87%)",
							}}
						>
							{isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="right"
				open={isDrawerOpen}
				onClose={toggleDrawer}
				sx={{ zIndex: theme.zIndex.modal + 1 }} // Ensure drawer is on top
			>
				{renderMenuLinks}
			</Drawer>
		</>
	);
}
