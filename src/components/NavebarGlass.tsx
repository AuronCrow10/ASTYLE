import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import {
	Container,
	Slide,
	Typography,
	useScrollTrigger,
	useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Box } from "./MUI/MuiBox";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import React, { useEffect } from 'react';

function HideOnScroll(props: any) {
	const { children } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function NavebarGlass() {
	useEffect(() => {

		// Registering the 'begin' event and logging it to the console when triggered.
		Events.scrollEvent.register('begin', (to: any, element: any) => {
			console.log('begin', to, element);
		});

		// Registering the 'end' event and logging it to the console when triggered.
		Events.scrollEvent.register('end', (to: any, element: any) => {
			console.log('end', to, element);
		});

		// Updating scrollSpy when the component mounts.
		scrollSpy.update();

		// Returning a cleanup function to remove the registered events when the component unmounts.
		return () => {
			Events.scrollEvent.remove('begin');
			Events.scrollEvent.remove('end');
		};
	}, []);

	// Function to handle the activation of a link.
	const handleSetActive = (to: any) => {
		console.log(to);
	};
	const navigate = useNavigate();
	const theme = useTheme();
	const { t } = useTranslation();
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	function redirect(url: string) {
		window.location.href = url;
	}

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const links = [
		{ label: "A-STYLE", path: "/", element: null },
		{ label: "Whitepaper", path: "/whitepaper.pdf", element: null },
		{
			label: "Roadmap", path: "/", element: <Link
				activeClass="active"
				to="roadmap"
				spy={true}
				className="navitem"
				smooth={true}
				offset={50}
				duration={500}
				onSetActive={handleSetActive}
			>
				Roadmap
			</Link>
		},
		{ label: "Presale", path: "/presale", element: null },
	];

	const renderMenuLinks = (
		<>
			<List sx={{ backgroundColor: "black" }}>
				<ListItem>
					<div
						style={{
							marginTop: "-12px",
							marginRight: "48px",
							display: "flex",
							justifyItems: "center",
							alignItems: "center",
							gap: "12px",
						}}
					>
						<img
							src="/Alogo.svg"
							loading="lazy"
							width="40px"
							height="50px"
						></img>
						<Typography variant="h5" sx={{ color: "white" }}>
							A-STYLE
						</Typography>
					</div>
				</ListItem>
				{links.map((link, index) => {
					return (
						<>
							{link.element != null ? (
								<ListItem key={index} sx={{ color: "white !important" }}>
									{link.element}
								</ListItem>
							) : (
								<ListItem
									key={link.label}
									sx={{
										color: "white !important",
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
											color: "white",
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
					backgroundColor: "black",
				}}
			></Container>
		</>
	);

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="fixed"
					sx={{
						flexGrow: 1,
						zIndex: theme.zIndex.modal + 2,
						boxShadow: "none",
						right: { xs: "16px", md: "0px" },
						top: "0",
						background: { xs: "transparent", md: "black" },
						padding: { xs: 0, md: "16px" },
					}}
				>
					<Toolbar
						sx={{
							padding: 0,
							width: "100%",
							borderRadius: { sm: "unset", md: "8px" },
							backgroundColor: { md: "black" },
						}}
					>
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								justifyContent: "center",
								alignItems: "center",
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
												className="navitem"
												sx={{
													fontFamily: "Work Sans !important",
													fontWeight: "600",
													color: "#fff",
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
							>
								<LanguageSwitcher />
							</Container>
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
										"transparent",
								}}
							>
								{isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Drawer
				anchor="right"
				open={isDrawerOpen}
				onClose={toggleDrawer}
				sx={{
					zIndex: theme.zIndex.modal + 1,
				}}
			>
				{renderMenuLinks}
			</Drawer>
		</>
	);
}
