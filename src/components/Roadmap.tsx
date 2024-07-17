import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { Box } from "./MUI/MuiBox";
import { t } from "i18next";
import {
	Link,
	Button,
	Element,
	Events,
	animateScroll as scroll,
	scrollSpy,
} from "react-scroll";
import React, { useEffect } from "react";
import "../styles/scss/roadmap.scss";
export default function Roadmap() {
	return (
		<>
			<Element name="roadmap" className="element"></Element>
			<div style={{ position: "relative" }}>
				<Box
					sx={{
						background: "transparent",
						padding:
							window.innerWidth > 600 ? "12vh 0" : "8vh 16px",
					}}
				>
					<Typography
						variant="h3"
						align="center"
						id="trader"
						sx={{
							fontFamily: "Work Sans !important",
							fontWeight: "600",
							fontSize: window.innerWidth < 600 ? "32px" : "50px",
						}}
					>
						<div id="roadmap"></div>
						{t("roadmap.t1")}
						<span style={{ color: "#ffcd00" }}>Step</span>
					</Typography>
					<Typography
						mt={2}
						variant="h6"
						align="center"
						sx={{
							fontFamily: "Work Sans !important",
							fontWeight: "300",
							fontSize: window.innerWidth < 600 ? "16px" : "18px",
						}}
					>
						{t("roadmap.t2")}
					</Typography>

					<br></br>
					<br></br>

					<Timeline
						sx={{
							[`& .${timelineOppositeContentClasses.root}`]: {
								flex: { xs: 0.01, md: 0.5 },
							},
						}}
					>
						<TimelineItem>
							<TimelineOppositeContent color="textSecondary"></TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Typography variant="h6" component="span">
									<b>Presale</b>
								</Typography>
								<Typography>
									<ul>
										<li>{t("roadmap.t3.1")} </li>
										<li>
											{" "}
											<b>{t("roadmap.t3.2")}</b>:{" "}
											{t("roadmap.t3.3")}{" "}
										</li>
										<li>{t("roadmap.t3.4")}</li>
										<li>{t("roadmap.t3.5")}</li>
										<li>{t("roadmap.t3.6")}</li>
									</ul>
								</Typography>
							</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineOppositeContent color="textSecondary"></TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Typography variant="h6" component="span">
									<b>+4 {t("text.months")}</b>
								</Typography>
								<Typography>
									<ul>
										<li>{t("roadmap.t4.1")}</li>
										<li>{t("roadmap.t4.2")} </li>
										<li>{t("roadmap.t4.3")}</li>
										<li>{t("roadmap.t4.4")} </li>
										<li>{t("roadmap.t4.5")} </li>
										<li>{t("roadmap.t4.6")}</li>
									</ul>
								</Typography>
							</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineOppositeContent color="textSecondary"></TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Typography variant="h6" component="span">
									<b>+4 {t("text.months")}</b>
								</Typography>
								<Typography>
									<ul>
										<li>{t("roadmap.t5.1")} </li>
										<li>{t("roadmap.t5.2")}</li>
										<li>{t("roadmap.t5.3")}</li>
									</ul>
								</Typography>
							</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineOppositeContent color="textSecondary"></TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Typography variant="h6" component="span">
									<b>+4 {t("text.months")}</b>
								</Typography>
								<Typography>
									<ul>
										<li>{t("roadmap.t6")}</li>
									</ul>
								</Typography>
							</TimelineContent>
						</TimelineItem>
					</Timeline>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						transform: "translate(-50%,-50%)",
						left: "50%",
						top: "50%",
						zIndex: -12,
					}}
				>
					<div className="pulse"></div>
				</Box>
			</div>
		</>
	);
}
